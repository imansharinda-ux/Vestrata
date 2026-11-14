import json
import math
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"

with open(DATA_DIR / "states.json", encoding="utf-8") as file:
    STATES = json.load(file)

with open(DATA_DIR / "options.json", encoding="utf-8") as file:
    OPTIONS = json.load(file)

PROPERTY_TYPES = OPTIONS["propertyTypes"]
CONDITIONS = OPTIONS["conditions"]
LOANS = OPTIONS["loans"]
COVERAGE_LEVELS = OPTIONS["coverageLevels"]
DEDUCTIBLES = OPTIONS["deductibles"]
RISK_LEVELS = OPTIONS["riskLevels"]
HAZARD_TYPES = OPTIONS["hazardTypes"]
COMPARABLE_TEMPLATES = OPTIONS["comparableTemplates"]

STATE_CODES = [state["code"] for state in STATES]


def find_state(code):
    return next((state for state in STATES if state["code"] == code), STATES[0])


def js_round(value):
    return math.floor(value + 0.5)


def round_to_thousand(amount):
    return js_round(amount / 1000) * 1000


def to_number(value, default=0.0):
    try:
        number = float(value)
    except (TypeError, ValueError):
        return default
    if math.isnan(number) or number == 0:
        return default
    return number
