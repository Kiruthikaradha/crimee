from fastapi import APIRouter

from backend.services.data_service import get_alerts_payload

router = APIRouter()


@router.get('/alerts')
def get_alerts() -> list[dict]:
    return get_alerts_payload()
