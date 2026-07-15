from fastapi import APIRouter

from backend.services.data_service import get_dashboard_payload

router = APIRouter()


@router.get('/dashboard')
def get_dashboard() -> dict:
    return get_dashboard_payload()
