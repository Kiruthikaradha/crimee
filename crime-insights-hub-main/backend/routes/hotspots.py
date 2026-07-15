from fastapi import APIRouter

from backend.services.data_service import get_hotspots_payload

router = APIRouter()


@router.get('/hotspots')
def get_hotspots() -> list[dict]:
    return get_hotspots_payload()
