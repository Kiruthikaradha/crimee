from fastapi import APIRouter

from backend.services.data_service import get_crimes_payload

router = APIRouter()


@router.get('/crimes')
def get_crimes() -> list[dict]:
    return get_crimes_payload()
