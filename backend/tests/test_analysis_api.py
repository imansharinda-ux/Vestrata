from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

DETAILS = {
    "purpose": "rent",
    "street": "1420 Maple Ave",
    "city": "Austin",
    "stateCode": "TX",
    "type": "sfr",
    "beds": 3,
    "baths": 2,
    "sqft": "1480",
    "lot": "0.18",
    "year": "1998",
    "condition": "ready",
}

DEAL = {
    "asking": "275000",
    "offer": "267000",
    "priceTouched": False,
    "loan": "f30",
    "downPayment": 0.2,
    "rentMode": "estimate",
    "manualRent": "2000",
    "hoa": "",
}


def test_estimate_endpoint():
    response = client.post("/api/analysis/estimate", json=DETAILS)
    assert response.status_code == 200
    body = response.json()
    assert body["value"] == 267000
    assert body["rent"] == 2200
    assert body["state"]["code"] == "TX"


def test_run_endpoint():
    payload = {
        "details": DETAILS,
        "deal": DEAL,
        "insurance": {"coverage": "standard", "deductible": 2500, "extras": {}},
        "horizon": 5,
    }
    response = client.post("/api/analysis/run", json=payload)
    assert response.status_code == 200
    body = response.json()
    assert round(body["result"]["cashFlow"]) == -183
    assert round(body["result"]["profit"]["total"]) == 18584
    assert body["warnings"][0]["short"] == "TX rent rules"


def test_run_endpoint_rejects_unknown_loan():
    payload = {"details": DETAILS, "deal": {**DEAL, "loan": "f40"}}
    response = client.post("/api/analysis/run", json=payload)
    assert response.status_code == 422
