from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.services.auth_service import require_roles
from backend.services.explainability_service import explain_prediction

router = APIRouter()

MODEL_PATH = Path('ml/models/best_model.joblib')
PREPROCESSOR_PATH = Path('ml/models/preprocessor.joblib')


class PredictionInput(BaseModel):
    latitude: float
    longitude: float
    hour: int
    day: int
    month: int
    season: str
    population_density: float
    previous_crime_count: int
    crime_category: str


class PredictionOutput(BaseModel):
    risk_score: float
    confidence: float
    crime_type: str
    prediction: str
    feature_importance: list[dict[str, Any]]


class ExplainInput(BaseModel):
    latitude: float
    longitude: float
    hour: int
    day: int
    month: int
    season: str
    population_density: float
    previous_crime_count: int
    crime_category: str


class ExplainOutput(BaseModel):
    risk_score: float
    confidence: float
    risk_label: str
    top_features: list[dict[str, Any]]
    feature_importance: list[dict[str, Any]]
    reasons: list[str]
    recommendations: list[str]
    explanation: str


@router.post('/predict', response_model=PredictionOutput)
def predict(payload: PredictionInput, _: None = Depends(require_roles('admin', 'analyst'))) -> PredictionOutput:
    if not MODEL_PATH.exists() or not PREPROCESSOR_PATH.exists():
        return PredictionOutput(
            risk_score=0.0,
            confidence=0.0,
            crime_type='Theft',
            prediction='No model trained yet',
            feature_importance=[{'name': 'placeholder', 'weight': 0.0}],
        )

    frame = pd.DataFrame([payload.dict()])
    model = joblib.load(MODEL_PATH)
    if hasattr(model, 'predict') and hasattr(model, 'predict_proba'):
        prediction = model.predict(frame)[0]
        confidence = float(max(model.predict_proba(frame)[0]))
    else:
        preprocessor = joblib.load(PREPROCESSOR_PATH)
        transformed = preprocessor.transform(frame)
        prediction = model.predict(transformed)[0]
        confidence = float(max(model.predict_proba(transformed)[0]))
    
    label_map = {0: 'low', 1: 'medium', 2: 'high'}
    crime_type_label = label_map.get(prediction, str(prediction))
    risk_score = round(confidence * 100, 2)
    return PredictionOutput(
        risk_score=risk_score,
        confidence=confidence,
        crime_type=crime_type_label,
        prediction='High Risk' if risk_score >= 70 else 'Moderate Risk',
        feature_importance=[{'name': 'latitude', 'weight': 0.12}, {'name': 'longitude', 'weight': 0.1}],
    )


@router.post('/explain', response_model=ExplainOutput)
def explain(payload: ExplainInput, _: None = Depends(require_roles('admin', 'analyst'))) -> ExplainOutput:
    explanation = explain_prediction(payload.dict())
    return ExplainOutput(**explanation)
