MAX_WARNINGS = 4


def get_warnings(estimate, result):
    state = estimate["state"]
    hazard_info = result["hazardInfo"]
    warnings = []

    if result["isRental"]:
        warnings.append(
            {
                "short": state["code"] + " rent rules",
                "text": state.get("rentRule")
                or state["name"] + ": no statewide rent control. Check your city for local rules.",
                "tone": "info",
            }
        )
    else:
        warnings.append(
            {
                "short": "Buying to live in",
                "text": "No rental income is counted. These numbers show what it costs you "
                "to own and live in the home.",
                "tone": "info",
            }
        )

    high_names = hazard_info["highNames"]
    if high_names:
        warnings.append(
            {
                "short": "High " + " & ".join(high_names) + " risk",
                "text": "High "
                + " and ".join(high_names)
                + " risk here. See Insurance & risk for the cover you need, "
                "and get quotes before making an offer.",
                "tone": "danger",
            }
        )

    if result["isRental"] and result["cashFlow"] < 0:
        warnings.append(
            {
                "short": "Negative cash flow",
                "text": "Negative cash flow at these terms. Try a lower price or a bigger down payment.",
                "tone": "danger",
            }
        )

    if result["isRental"] and 0 < result["dscr"] < 1.2:
        warnings.append(
            {
                "short": "DSCR below 1.20",
                "text": "DSCR is below 1.20. Many DSCR lenders will not approve this loan.",
                "tone": "danger",
            }
        )

    if result["price"] > estimate["valueHigh"]:
        warnings.append(
            {
                "short": "Price above our range",
                "text": "Your price is above our estimated range. You may be overpaying.",
                "tone": "caution",
            }
        )

    if result["isRental"] and result["isManualRent"] and result["rent"] > estimate["rent"] * 1.15:
        warnings.append(
            {
                "short": "Rent looks high",
                "text": "Your rent is more than 15% above our estimate. Check similar homes.",
                "tone": "caution",
            }
        )

    return warnings[:MAX_WARNINGS]
