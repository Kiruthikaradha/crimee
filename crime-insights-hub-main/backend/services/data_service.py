from typing import Any

from backend.database.session import SessionLocal, init_db
from backend.models.alert import Alert
from backend.models.crime_event import CrimeEvent
from backend.models.hotspot import Hotspot
from backend.models.report import Report
from backend.services.seed_data import seed_database


def ensure_data_ready() -> None:
    init_db()
    seed_database()


def get_dashboard_payload() -> dict[str, Any]:
    ensure_data_ready()
    db = SessionLocal()
    try:
        crime_count = db.query(CrimeEvent).count()
        alerts_count = db.query(Alert).count()
        hotspots_count = db.query(Hotspot).count()
        reports_count = db.query(Report).count()
        return {
            'kpis': [
                {'label': 'Total Crimes Analyzed', 'value': crime_count, 'delta': '+4.2%', 'tone': 'up'},
                {'label': 'Crime Growth (YoY)', 'value': 7.8, 'suffix': '%', 'delta': '+1.4%', 'tone': 'up'},
                {'label': 'Resolution Rate', 'value': 62.4, 'suffix': '%', 'delta': '+3.1%', 'tone': 'up'},
                {'label': 'High-Risk Areas', 'value': 128, 'delta': '-6', 'tone': 'down'},
                {'label': 'Predicted Hotspots', 'value': hotspots_count, 'delta': '+9', 'tone': 'up'},
                {'label': 'Active Alerts', 'value': alerts_count, 'delta': '+2', 'tone': 'up'},
            ],
            'monthly_trend': [
                {'month': 'Jan', 'crimes': 18240, 'predicted': 17900},
                {'month': 'Feb', 'crimes': 17100, 'predicted': 17600},
                {'month': 'Mar', 'crimes': 19850, 'predicted': 19100},
                {'month': 'Apr', 'crimes': 21030, 'predicted': 20800},
                {'month': 'May', 'crimes': 22450, 'predicted': 22100},
                {'month': 'Jun', 'crimes': 24100, 'predicted': 23800},
                {'month': 'Jul', 'crimes': 25400, 'predicted': 25000},
                {'month': 'Aug', 'crimes': 24980, 'predicted': 25200},
                {'month': 'Sep', 'crimes': 23800, 'predicted': 24100},
                {'month': 'Oct', 'crimes': 22100, 'predicted': 22400},
                {'month': 'Nov', 'crimes': 20500, 'predicted': 20800},
                {'month': 'Dec', 'crimes': 21800, 'predicted': 21500},
            ],
            'crime_categories': [
                {'name': 'Theft', 'value': 34, 'color': '#8b5cf6'},
                {'name': 'Assault', 'value': 22, 'color': '#6366f1'},
                {'name': 'Burglary', 'value': 14, 'color': '#22d3ee'},
                {'name': 'Fraud', 'value': 12, 'color': '#f59e0b'},
                {'name': 'Vandalism', 'value': 10, 'color': '#ec4899'},
                {'name': 'Other', 'value': 8, 'color': '#94a3b8'},
            ],
            'statewise': [
                {'state': 'Chennai', 'crimes': 42100},
                {'state': 'Coimbatore', 'crimes': 38200},
                {'state': 'Madurai', 'crimes': 31400},
                {'state': 'Trichy', 'crimes': 29800},
                {'state': 'Salem', 'crimes': 27600},
                {'state': 'Tirunelveli', 'crimes': 24300},
                {'state': 'Vellore', 'crimes': 21500},
                {'state': 'Thoothukudi', 'crimes': 18700},
            ],
            'alerts': [
                {'id': item.id, 'area': item.area, 'type': item.alert_type, 'time': item.time_label, 'risk': item.risk_level}
                for item in db.query(Alert).all()
            ],
            'reports_count': reports_count,
        }
    finally:
        db.close()


def get_crimes_payload() -> list[dict[str, Any]]:
    ensure_data_ready()
    db = SessionLocal()
    try:
        items = db.query(CrimeEvent).all()
        return [
            {
                'id': item.id,
                'lat': item.latitude,
                'lng': item.longitude,
                'city': item.city,
                'state': item.state,
                'type': item.crime_type,
                'count': item.incident_count,
                'risk': item.risk_level,
            }
            for item in items
        ]
    finally:
        db.close()


def get_heatmap_payload() -> list[dict[str, Any]]:
    return get_crimes_payload()


def get_analytics_payload() -> dict[str, Any]:
    ensure_data_ready()
    return {
        'monthly_trend': [
            {'month': 'Jan', 'crimes': 18240, 'predicted': 17900},
            {'month': 'Feb', 'crimes': 17100, 'predicted': 17600},
            {'month': 'Mar', 'crimes': 19850, 'predicted': 19100},
            {'month': 'Apr', 'crimes': 21030, 'predicted': 20800},
            {'month': 'May', 'crimes': 22450, 'predicted': 22100},
            {'month': 'Jun', 'crimes': 24100, 'predicted': 23800},
            {'month': 'Jul', 'crimes': 25400, 'predicted': 25000},
            {'month': 'Aug', 'crimes': 24980, 'predicted': 25200},
            {'month': 'Sep', 'crimes': 23800, 'predicted': 24100},
            {'month': 'Oct', 'crimes': 22100, 'predicted': 22400},
            {'month': 'Nov', 'crimes': 20500, 'predicted': 20800},
            {'month': 'Dec', 'crimes': 21800, 'predicted': 21500},
        ],
        'yearly_trend': [
            {'year': '2019', 'crimes': 210000},
            {'year': '2020', 'crimes': 232000},
            {'year': '2021', 'crimes': 248000},
            {'year': '2022', 'crimes': 261000},
            {'year': '2023', 'crimes': 274000},
            {'year': '2024', 'crimes': 284000},
        ],
        'crime_categories': [
            {'name': 'Theft', 'value': 34, 'color': '#8b5cf6'},
            {'name': 'Assault', 'value': 22, 'color': '#6366f1'},
            {'name': 'Burglary', 'value': 14, 'color': '#22d3ee'},
            {'name': 'Fraud', 'value': 12, 'color': '#f59e0b'},
            {'name': 'Vandalism', 'value': 10, 'color': '#ec4899'},
            {'name': 'Other', 'value': 8, 'color': '#94a3b8'},
        ],
        'statewise': [
            {'state': 'Chennai', 'crimes': 42100},
            {'state': 'Coimbatore', 'crimes': 38200},
            {'state': 'Madurai', 'crimes': 31400},
            {'state': 'Trichy', 'crimes': 29800},
            {'state': 'Salem', 'crimes': 27600},
            {'state': 'Tirunelveli', 'crimes': 24300},
            {'state': 'Vellore', 'crimes': 21500},
            {'state': 'Thoothukudi', 'crimes': 18700},
        ],
    }


def get_hotspots_payload() -> list[dict[str, Any]]:
    ensure_data_ready()
    db = SessionLocal()
    try:
        items = db.query(Hotspot).all()
        return [
            {
                'id': str(item.id),
                'area': item.area,
                'lat': item.latitude,
                'lng': item.longitude,
                'risk': item.risk_score,
                'confidence': item.confidence,
                'trend': item.trend,
                'type': item.crime_type,
                'severity': item.severity,
                'explanation': item.explanation or [],
                'features': item.features or [],
                'recommendations': item.recommendations or [],
            }
            for item in items
        ]
    finally:
        db.close()


def get_reports_payload() -> list[dict[str, Any]]:
    ensure_data_ready()
    db = SessionLocal()
    try:
        items = db.query(Report).all()
        return [
            {
                'id': item.report_id,
                'title': item.title,
                'date': item.date,
                'author': item.author,
                'pages': item.pages,
                'status': item.status,
            }
            for item in items
        ]
    finally:
        db.close()


def get_alerts_payload() -> list[dict[str, Any]]:
    ensure_data_ready()
    db = SessionLocal()
    try:
        items = db.query(Alert).all()
        return [
            {
                'id': item.id,
                'area': item.area,
                'type': item.alert_type,
                'time': item.time_label,
                'risk': item.risk_level,
            }
            for item in items
        ]
    finally:
        db.close()
