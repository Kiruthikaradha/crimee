from sqlalchemy import Column, Integer, String
from backend.database.session import Base


class Alert(Base):
    __tablename__ = 'alerts'

    id = Column(Integer, primary_key=True, index=True)
    area = Column(String, nullable=False)
    alert_type = Column(String, nullable=False)
    time_label = Column(String, nullable=False)
    risk_level = Column(String, nullable=False)
