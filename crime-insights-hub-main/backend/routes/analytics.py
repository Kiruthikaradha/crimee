from fastapi import APIRouter

from backend.services.data_service import get_analytics_payload

router = APIRouter()


@router.get('/analytics')
def get_analytics() -> dict:
    return get_analytics_payload()
