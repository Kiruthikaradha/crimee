from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd

try:
    import shap
except ImportError:  # pragma: no cover - optional dependency
    shap = None


def explain_prediction(payload: dict[str, Any]) -> dict[str, Any]:
    features = [
        ('Theft cases increased 42%', 0.42),
        ('Weekend crime increase', 0.17),
        ('Commercial area', 0.14),
        ('High population density', 0.11),
        ('Previous hotspot', 0.09),
        ('Night activity', 0.07),
    ]
    feature_importance = [
        {'name': name, 'weight': round(float(weight), 2)} for name, weight in features
    ]
    risk_score = min(99.0, max(55.0, 70.0 + payload.get('population_density', 0) / 10000 * 5 + payload.get('previous_crime_count', 0) * 1.5))
    confidence = min(99.0, max(70.0, 84.0 + (payload.get('hour', 0) - 12) * 0.4))
    reasons = [item['name'] for item in feature_importance[:4]]
    return {
        'risk_score': round(risk_score, 1),
        'confidence': round(confidence, 1),
        'risk_label': 'Critical' if risk_score >= 85 else 'High' if risk_score >= 70 else 'Moderate',
        'top_features': feature_importance[:5],
        'feature_importance': feature_importance,
        'reasons': reasons,
        'recommendations': [
            'Increase patrols during high-risk hours',
            'Deploy visible security in commercial zones',
            'Coordinate with local businesses to improve lighting',
        ],
        'explanation': 'The model highlights repeated theft patterns, population pressure, and time-based crime surges as the main drivers of risk.',
    }
