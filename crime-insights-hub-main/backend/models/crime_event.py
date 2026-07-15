from sqlalchemy import Column, Integer, Float, String, DateTime, JSON

from backend.database.session import Base


class CrimeEvent(Base):
    __tablename__ = 'crime_events'

    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    crime_type = Column(String, nullable=False)
    incident_count = Column(Integer, nullable=False, default=1)
    risk_level = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=True)
    extra_metadata = Column(JSON, nullable=True)
