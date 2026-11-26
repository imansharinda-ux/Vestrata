from app.financial_engine.reference import COVERAGE_LEVELS, DEDUCTIBLES


def build_policies(price, state, levels, is_rental, is_condo, insurance):
    coverage = COVERAGE_LEVELS[insurance.coverage]
    deductible = next(option for option in DEDUCTIBLES if option["amount"] == insurance.deductible)
    base_cost = price * state["insuranceRate"] / 12 * coverage["multiplier"] * deductible["factor"]

    base_name = "Homeowners policy (HO-3)"
    if is_condo:
        base_name = "Condo policy (HO-6)"
    elif is_rental:
        base_name = "Landlord policy (DP-3)"

    building_text = (
        "Inside walls, fixtures and upgrades; the building is covered by the HOA policy. "
        if is_condo
        else "The building, fire, wind and hail, theft, liability. "
    )
    claim_text = (
        "Lost rent while the home is being repaired."
        if is_rental
        else "Your belongings and living costs after a claim."
    )

    policies = [
        {
            "key": "base",
            "name": base_name,
            "cost": base_cost,
            "status": "Required",
            "required": True,
            "covers": building_text + claim_text,
            "excludes": "Floods, earthquakes, normal wear, and "
            + ("your tenant's belongings." if is_rental else "mold from long leaks."),
        }
    ]

    if levels[0] >= 2:
        policies.append(
            {
                "key": "flood",
                "name": "Flood insurance",
                "cost": price * (0.0035 if levels[0] == 3 else 0.0012) / 12,
                "status": "Required by lender" if levels[0] == 3 else "Recommended",
                "required": levels[0] == 3,
                "defaultOn": False,
                "covers": "Water damage from rising water, storm surge and overflowing rivers.",
            }
        )

    if levels[1] == 3:
        policies.append(
            {
                "key": "wind",
                "name": "Hurricane & windstorm cover",
                "cost": price * 0.0028 / 12,
                "status": "Recommended",
                "required": False,
                "defaultOn": True,
                "covers": "Wind damage from named storms. Watch the hurricane deductible, "
                "often 2% to 5% of the home value.",
            }
        )

    if levels[4] >= 2:
        policies.append(
            {
                "key": "quake",
                "name": "Earthquake cover",
                "cost": price * (0.0018 if levels[4] == 3 else 0.0008) / 12,
                "status": "Optional",
                "required": False,
                "defaultOn": False,
                "covers": "Shaking damage to the building and its contents.",
            }
        )

    if is_rental:
        policies.append(
            {
                "key": "umbrella",
                "name": "Umbrella liability",
                "cost": 25,
                "status": "Optional",
                "required": False,
                "defaultOn": False,
                "covers": "Extra protection if a tenant or guest sues you, above your main policy.",
            }
        )

    return policies


def is_policy_included(policy, extras):
    if policy["required"]:
        return True
    return extras.get(policy["key"], policy["defaultOn"])
