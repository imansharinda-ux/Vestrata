import numpy_financial as npf

from app.financial_engine.estimate import get_hazards
from app.financial_engine.insurance import build_policies, is_policy_included
from app.financial_engine.reference import HAZARD_TYPES, LOANS, js_round, to_number

CLOSING_COST_RATE = 0.03
SELLING_COST_RATE = 0.07
RENT_GROWTH_RATE = 0.03
RENTAL_UPKEEP_SHARE = 0.18
OWNER_UPKEEP_RATE = 0.01


def get_monthly_payment(loan_amount, rate, months):
    if loan_amount <= 0:
        return 0.0
    return float(npf.pmt(rate / 12, months, -loan_amount))


def get_loan_balance(loan_amount, rate, payment, paid_months):
    balance = float(npf.fv(rate / 12, paid_months, payment, -loan_amount))
    return balance if balance > 0 else 0.0


def get_risk_score(levels, is_rental, dscr, details, price, value_high, is_manual_rent, rent, estimated_rent):
    hazard_score = sum(level * level * HAZARD_TYPES[index]["weight"] for index, level in enumerate(levels))
    score = 18 + min(22, js_round(hazard_score * 0.75))

    if is_rental:
        if dscr < 1:
            score += 26
        elif dscr < 1.2:
            score += 12
    if details.type == "condo":
        score += 6
    if details.condition == "heavy":
        score += 10
    if price > value_high:
        score += 8
    if is_manual_rent and rent > estimated_rent * 1.15:
        score += 10

    return min(95, score)


def get_risk_label(risk):
    if risk < 35:
        return "Low"
    if risk < 60:
        return "Moderate"
    return "High"


def analyze_deal(details, estimate, deal, insurance, horizon):
    state = estimate["state"]
    property_type = estimate["type"]
    condition = estimate["condition"]
    loan = LOANS[deal.loan]
    is_rental = details.purpose == "rent"
    is_manual_rent = deal.rent_mode == "manual"

    price = to_number(deal.offer)
    if not is_rental:
        rent = 0.0
    elif is_manual_rent:
        rent = to_number(deal.manual_rent)
    else:
        rent = estimate["rent"]
    hoa = property_type["hoa"] if deal.hoa == "" else to_number(deal.hoa)

    loan_amount = price * (1 - deal.down_payment)
    months = loan["years"] * 12
    payment = get_monthly_payment(loan_amount, loan["rate"], months)

    hazard_info = get_hazards(state)
    policies = build_policies(
        price=price,
        state=state,
        levels=hazard_info["levels"],
        is_rental=is_rental,
        is_condo=details.type == "condo",
        insurance=insurance,
    )
    insurance_cost = sum(
        policy["cost"] for policy in policies if is_policy_included(policy, insurance.extras)
    )

    tax = price * state["taxRate"] / 12
    other_costs = rent * RENTAL_UPKEEP_SHARE if is_rental else price * OWNER_UPKEEP_RATE / 12
    own_cost = payment + tax + insurance_cost + other_costs + hoa
    net_income = rent - tax - insurance_cost - other_costs - hoa
    cash_flow = net_income - payment
    closing_cost = price * CLOSING_COST_RATE
    invested = max(1, price * deal.down_payment + closing_cost + condition["rehabCost"])
    cap_rate = net_income * 12 / price if price > 0 else 0
    cash_on_cash = cash_flow * 12 / invested
    dscr = net_income / payment if payment > 0 else 0

    risk = get_risk_score(
        levels=hazard_info["levels"],
        is_rental=is_rental,
        dscr=dscr,
        details=details,
        price=price,
        value_high=estimate["valueHigh"],
        is_manual_rent=is_manual_rent,
        rent=rent,
        estimated_rent=estimate["rent"],
    )

    def profit_after(years):
        cash_flow_total = 0.0
        if is_rental:
            for year in range(1, years + 1):
                cash_flow_total += net_income * 12 * (1 + RENT_GROWTH_RATE) ** (year - 1) - payment * 12
        future_value = price * (1 + state["growthRate"]) ** years
        paid_months = min(years * 12, months)
        balance = get_loan_balance(loan_amount, loan["rate"], payment, paid_months)

        appreciation = future_value - price
        paydown = loan_amount - balance
        selling_cost = future_value * SELLING_COST_RATE

        return {
            "cashFlowTotal": cash_flow_total,
            "appreciation": appreciation,
            "paydown": paydown,
            "sellingCost": selling_cost,
            "equity": future_value - balance,
            "total": cash_flow_total
            + appreciation
            + paydown
            - selling_cost
            - closing_cost
            - condition["rehabCost"],
        }

    return {
        "price": price,
        "rent": rent,
        "hoa": hoa,
        "loan": loan,
        "isRental": is_rental,
        "isManualRent": is_manual_rent,
        "payment": payment,
        "tax": tax,
        "insuranceCost": insurance_cost,
        "otherCosts": other_costs,
        "ownCost": own_cost,
        "cashFlow": cash_flow,
        "closingCost": closing_cost,
        "invested": invested,
        "capRate": cap_rate,
        "cashOnCash": cash_on_cash,
        "dscr": dscr,
        "risk": risk,
        "riskLabel": get_risk_label(risk),
        "policies": policies,
        "hazardInfo": hazard_info,
        "profit": profit_after(horizon),
        "profitIn5Years": profit_after(5),
    }
