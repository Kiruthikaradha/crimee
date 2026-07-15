from fastapi import APIRouter

from backend.services.data_service import get_reports_payload

router = APIRouter()


@router.get('/reports')
def get_reports() -> list[dict]:
    return get_reports_payload()
