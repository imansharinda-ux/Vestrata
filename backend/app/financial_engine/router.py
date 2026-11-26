from fastapi import APIRouter

from app.financial_engine.calculator import analyze_deal
from app.financial_engine.estimate import estimate_property
from app.financial_engine.schemas import AnalysisRequest, PropertyDetails
from app.financial_engine.deal_warnings import get_warnings

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("/estimate")
def create_estimate(details: PropertyDetails):
    return estimate_property(details)


@router.post("/run")
def run_analysis(request: AnalysisRequest):
    estimate = estimate_property(request.details)
    result = analyze_deal(request.details, estimate, request.deal, request.insurance, request.horizon)
    return {"estimate": estimate, "result": result, "warnings": get_warnings(estimate, result)}
