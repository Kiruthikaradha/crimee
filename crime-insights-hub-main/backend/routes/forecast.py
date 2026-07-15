from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.services.auth_service import require_roles
from backend.services.forecast_service import forecast_crimes

router = APIRouter()


class ForecastRequest(BaseModel):
    horizon: str
    location: str


@router.post('/forecast')
def create_forecast(payload: ForecastRequest, user=Depends(require_roles('admin', 'analyst'))) -> dict[str, object]:
    return forecast_crimes(payload.location, payload.horizon)
