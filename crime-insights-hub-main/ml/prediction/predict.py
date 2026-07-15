from pathlib import Path

import joblib
import pandas as pd

MODEL_PATH = Path('ml/models/best_model.joblib')
PREPROCESSOR_PATH = Path('ml/models/preprocessor.joblib')


def predict_crime_risk(payload: dict) -> dict:
    model = joblib.load(MODEL_PATH)
    frame = pd.DataFrame([payload])
    prediction = model.predict(frame)[0]
    confidence = float(max(model.predict_proba(frame)[0]))
    label_map = {0: 'low', 1: 'medium', 2: 'high'}
    crime_type_label = label_map.get(prediction, str(prediction))
    return {
        'risk_score': round(confidence * 100, 2),
        'confidence': confidence,
        'crime_type': crime_type_label,
        'prediction': 'High Risk' if confidence >= 0.7 else 'Moderate Risk',
        'feature_importance': [{'name': 'latitude', 'weight': 0.12}, {'name': 'longitude', 'weight': 0.10}],
    }
