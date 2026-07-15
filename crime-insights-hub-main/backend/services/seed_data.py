from backend.database.session import SessionLocal, init_db
from backend.models.alert import Alert
from backend.models.crime_event import CrimeEvent
from backend.models.hotspot import Hotspot
from backend.models.report import Report


def seed_database() -> None:
    init_db()
    db = SessionLocal()
    try:
        if db.query(CrimeEvent).count() == 0:
            events = [
                CrimeEvent(city='Chennai', state='Tamil Nadu', latitude=13.0827, longitude=80.2707, crime_type='Burglary', incident_count=412, risk_level='critical'),
                CrimeEvent(city='Coimbatore', state='Tamil Nadu', latitude=11.0168, longitude=76.9558, crime_type='Theft', incident_count=388, risk_level='critical'),
                CrimeEvent(city='Madurai', state='Tamil Nadu', latitude=9.9252, longitude=78.1198, crime_type='Assault', incident_count=265, risk_level='high'),
                CrimeEvent(city='Trichy', state='Tamil Nadu', latitude=10.7905, longitude=78.7047, crime_type='Fraud', incident_count=231, risk_level='high'),
            ]
            db.add_all(events)

        if db.query(Hotspot).count() == 0:
            hotspots = [
                Hotspot(area='T. Nagar, Chennai', latitude=13.0418, longitude=80.2341, risk_score=92, confidence=88, trend='+38%', crime_type='Theft & Snatching', severity='critical', explanation=['High evening theft activity in shopping corridor'], features=[{'name': 'Historical Frequency', 'weight': 0.31}], recommendations=[{'text': 'Increase patrols', 'priority': 'critical'}]),
                Hotspot(area='Gandhipuram, Coimbatore', latitude=11.0202, longitude=76.9696, risk_score=88, confidence=85, trend='+24%', crime_type='Burglary & Theft', severity='high', explanation=['Crowded transit hotspot'], features=[{'name': 'Crowd Density', 'weight': 0.28}], recommendations=[{'text': 'Deploy plain-clothes team', 'priority': 'high'}]),
            ]
            db.add_all(hotspots)

        if db.query(Report).count() == 0:
            reports = [
                Report(report_id='R-2041', title='Q4 Chennai Metro Crime Overview', author='Analyst K. Rao', date='2025-12-08', pages=42, status='Finalized'),
                Report(report_id='R-2040', title='Hotspot Prediction — Coimbatore Zone 2', author='Officer S. Iyer', date='2025-12-01', pages=18, status='Reviewed'),
            ]
            db.add_all(reports)

        if db.query(Alert).count() == 0:
            alerts = [
                Alert(area='T. Nagar, Chennai', alert_type='Theft cluster detected', time_label='3 min ago', risk_level='high'),
                Alert(area='Gandhipuram, Coimbatore', alert_type='Predicted hotspot upgrade', time_label='18 min ago', risk_level='critical'),
            ]
            db.add_all(alerts)

        db.commit()
    finally:
        db.close()
