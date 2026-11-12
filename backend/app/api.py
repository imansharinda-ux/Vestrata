from fastapi import APIRouter

from app.ai.router import router as ai_router
from app.auth.router import router as auth_router
from app.financial_engine.router import router as analysis_router
from app.listings.router import router as listings_router
from app.rules_engine.router import router as rules_router

api_router = APIRouter(prefix="/api")


@api_router.get("/health", tags=["health"])
def health():
    return {"status": "ok"}


api_router.include_router(auth_router)
api_router.include_router(analysis_router)
api_router.include_router(listings_router)
api_router.include_router(rules_router)
api_router.include_router(ai_router)
