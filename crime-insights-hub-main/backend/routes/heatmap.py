from fastapi import APIRouter

from backend.services.data_service import get_heatmap_payload

router = APIRouter()


@router.get('/heatmap')
def get_heatmap() -> list[dict]:
    return get_heatmap_payload()
