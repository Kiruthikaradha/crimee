from sqlalchemy import Column, Integer, Float, String, JSON
from backend.database.session import Base


class Hotspot(Base):
    __tablename__ = 'hotspots'

    id = Column(Integer, primary_key=True, index=True)
    area = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    risk_score = Column(Integer, nullable=False)
    confidence = Column(Integer, nullable=False)
    trend = Column(String, nullable=False)
    crime_type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    explanation = Column(JSON, nullable=True)
    features = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)
