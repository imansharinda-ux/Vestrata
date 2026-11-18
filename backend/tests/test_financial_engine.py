import pytest

from app.financial_engine.calculator import analyze_deal, get_monthly_payment
from app.financial_engine.deal_warnings import get_warnings
from app.financial_engine.estimate import estimate_property
from app.financial_engine.schemas import Deal, Insurance, PropertyDetails


def austin_details(**changes):
    return PropertyDetails(**changes)


def austin_deal(**changes):
    values = {"asking": "275000", "offer": "267000"}
    values.update(changes)
    return Deal(**values)


def run(details=None, deal=None, insurance=None, horizon=5):
    details = details or austin_details()
    estimate = estimate_property(details)
    result = analyze_deal(details, estimate, deal or austin_deal(), insurance or Insurance(), horizon)
    return estimate, result


def test_estimate_for_austin_home():
    estimate = estimate_property(austin_details())
    assert estimate["value"] == 267000
    assert estimate["rent"] == 2200
    assert estimate["confidence"] == "High"
    assert len(estimate["comparables"]) == 3


def test_monthly_payment_matches_formula():
    assert get_monthly_payment(213600, 0.0728, 360) == pytest.approx(1461.47, abs=0.01)
    assert get_monthly_payment(0, 0.0728, 360) == 0


def test_rental_results_for_austin_home():
    _, result = run()
    assert round(result["cashFlow"]) == -183
    assert round(result["capRate"] * 100, 1) == 5.7
    assert round(result["cashOnCash"] * 100, 1) == -3.6
    assert round(result["dscr"], 2) == 0.88
    assert result["risk"] == 64
    assert result["riskLabel"] == "High"
    assert round(result["profit"]["total"]) == 18584


def test_live_in_home_has_no_rent():
    _, result = run(details=austin_details(purpose="live"))
    assert result["rent"] == 0
    assert result["isRental"] is False


def test_manual_rent_above_estimate_is_flagged():
    estimate, result = run(deal=austin_deal(rent_mode="manual", manual_rent="2600"))
    shorts = [warning["short"] for warning in get_warnings(estimate, result)]
    assert result["rent"] == 2600
    assert "Rent looks high" in shorts


def test_warnings_for_austin_home():
    estimate, result = run()
    shorts = [warning["short"] for warning in get_warnings(estimate, result)]
    assert shorts[0] == "TX rent rules"
    assert "Negative cash flow" in shorts
    assert "DSCR below 1.20" in shorts
    assert len(shorts) <= 4
