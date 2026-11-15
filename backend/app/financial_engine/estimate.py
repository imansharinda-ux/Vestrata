from app.financial_engine.reference import (
    COMPARABLE_TEMPLATES,
    CONDITIONS,
    HAZARD_TYPES,
    PROPERTY_TYPES,
    RISK_LEVELS,
    find_state,
    js_round,
    round_to_thousand,
    to_number,
)


def get_rent_to_value_ratio(state):
    return max(0.0042, min(0.0095, 0.0106 - state["pricePerSqft"] * 0.0000132))


def get_age_adjustment(year):
    if year >= 2010:
        return 0.05
    if year >= 1990:
        return 0
    if year >= 1960:
        return -0.04
    return -0.08


def estimate_property(details):
    state = find_state(details.state_code)
    property_type = PROPERTY_TYPES[details.type]
    condition = CONDITIONS[details.condition]
    sqft = max(300, to_number(details.sqft))
    lot = max(0, to_number(details.lot))
    year = to_number(details.year, 1990)
    age_adjustment = get_age_adjustment(year)

    adjustment = (
        1
        + (details.beds - 3) * 0.025
        + (details.baths - 2) * 0.03
        + age_adjustment
        + (min(lot, 1) * 0.06 - 0.01)
        + property_type["valueAdjustment"]
        + condition["valueAdjustment"]
    )

    value = round_to_thousand(sqft * state["pricePerSqft"] * adjustment)
    rent = (
        js_round(
            value
            * get_rent_to_value_ratio(state)
            * (1 + (details.beds - 3) * 0.05)
            * property_type["rentFactor"]
            / 10
        )
        * 10
    )
    is_unusual = state["pricePerSqft"] > 400 or year < 1960 or sqft > 3500
    confidence = "Medium" if is_unusual else "High"

    comparables = [
        {
            "sqft": js_round(sqft * template["sizeFactor"] / 10) * 10,
            "beds": details.beds + template["extraBeds"],
            "baths": details.baths + template["extraBaths"],
            "distance": template["distance"],
            "status": template["status"],
            "image": template["image"],
            "price": round_to_thousand(
                sqft * template["sizeFactor"] * state["pricePerSqft"] * adjustment * template["priceFactor"]
            ),
        }
        for template in COMPARABLE_TEMPLATES
    ]
    comparables_median = sorted(home["price"] for home in comparables)[1]

    raw_factors = [
        ("House size", 38),
        ("Location", 26),
        ("Bedrooms", 12),
        ("Year built", 10 + js_round(abs(age_adjustment) * 60)),
        ("Bathrooms", 8),
        ("Condition", 4 + js_round(abs(condition["valueAdjustment"]) * 60)),
    ]
    factor_total = sum(weight for _, weight in raw_factors)
    factors = [{"label": label, "share": js_round(weight / factor_total * 100)} for label, weight in raw_factors]

    return {
        "state": state,
        "type": property_type,
        "condition": condition,
        "sqft": sqft,
        "value": value,
        "valueLow": value * 0.94,
        "valueHigh": value * 1.06,
        "rent": rent,
        "confidence": confidence,
        "comparables": comparables,
        "comparablesMedian": comparables_median,
        "factors": factors,
    }


def get_hazards(state):
    levels = list(state["hazards"])
    if state["floodZone"]:
        levels[0] = 3

    hazards = [
        {
            "name": hazard["name"],
            "icon": hazard["icon"],
            "weight": hazard["weight"],
            "level": levels[index],
            "levelLabel": RISK_LEVELS[levels[index]],
            "note": hazard["notes"][levels[index]],
        }
        for index, hazard in enumerate(HAZARD_TYPES)
    ]

    highest = max(levels)
    high_names = [hazard["name"].lower() for hazard in hazards if hazard["level"] == 3]

    overall = "Low overall"
    if highest == 3:
        overall = "High overall: " + ", ".join(high_names)
    elif highest == 2:
        overall = "Moderate overall"

    return {"levels": levels, "hazards": hazards, "highest": highest, "highNames": high_names, "overall": overall}
