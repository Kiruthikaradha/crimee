from typing import Any
from pydantic import BaseModel


class CrimeEventRead(BaseModel):
    id: int
    city: str
    state: str
    latitude: float
    longitude: float
    crime_type: str
    incident_count: int
    risk_level: str
    metadata: dict[str, Any] | None = None

    class Config:
        from_attributes = True
