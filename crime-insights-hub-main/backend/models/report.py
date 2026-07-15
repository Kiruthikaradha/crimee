from sqlalchemy import Column, Integer, String, DateTime
from backend.database.session import Base


class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    date = Column(String, nullable=False)
    pages = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
