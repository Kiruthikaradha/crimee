from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import (
    GradientBoostingClassifier,
    RandomForestClassifier,
)
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

DATA_PATH = Path('ml/dataset/crime_dataset.csv')
MODEL_DIR = Path('ml/models')
MODEL_DIR.mkdir(parents=True, exist_ok=True)


def build_dataset() -> pd.DataFrame:
    df = pd.DataFrame(
        [
            {'latitude': 13.0827, 'longitude': 80.2707, 'hour': 20, 'day': 3, 'month': 7, 'season': 'summer', 'population_density': 23000, 'previous_crime_count': 12, 'crime_category': 'Theft', 'label': 'high'},
            {'latitude': 11.0168, 'longitude': 76.9558, 'hour': 18, 'day': 6, 'month': 8, 'season': 'summer', 'population_density': 27000, 'previous_crime_count': 10, 'crime_category': 'Assault', 'label': 'high'},
            {'latitude': 9.9252, 'longitude': 78.1198, 'hour': 1, 'day': 5, 'month': 11, 'season': 'winter', 'population_density': 14000, 'previous_crime_count': 4, 'crime_category': 'Fraud', 'label': 'medium'},
            {'latitude': 10.7905, 'longitude': 78.7047, 'hour': 4, 'day': 2, 'month': 1, 'season': 'winter', 'population_density': 13000, 'previous_crime_count': 3, 'crime_category': 'Burglary', 'label': 'low'},
            {'latitude': 13.0418, 'longitude': 80.2341, 'hour': 22, 'day': 0, 'month': 12, 'season': 'winter', 'population_density': 18000, 'previous_crime_count': 8, 'crime_category': 'Theft', 'label': 'high'},
            {'latitude': 11.0202, 'longitude': 76.9696, 'hour': 22, 'day': 1, 'month': 6, 'season': 'summer', 'population_density': 11000, 'previous_crime_count': 2, 'crime_category': 'Vandalism', 'label': 'low'},
            {'latitude': 9.9390, 'longitude': 78.1350, 'hour': 16, 'day': 4, 'month': 4, 'season': 'spring', 'population_density': 9000, 'previous_crime_count': 2, 'crime_category': 'Theft', 'label': 'medium'},
            {'latitude': 11.6643, 'longitude': 78.1460, 'hour': 21, 'day': 6, 'month': 10, 'season': 'autumn', 'population_density': 12000, 'previous_crime_count': 7, 'crime_category': 'Assault', 'label': 'high'},
        ]
    )
    return df


def train_models() -> None:
    df = build_dataset()
    X = df.drop(columns=['label'])
    y = df['label'].map({'low': 0, 'medium': 1, 'high': 2})

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

    categorical_features = ['season', 'crime_category']
    numeric_features = ['latitude', 'longitude', 'hour', 'day', 'month', 'population_density', 'previous_crime_count']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())]), numeric_features),
            ('cat', Pipeline([('imputer', SimpleImputer(strategy='most_frequent')), ('onehot', OneHotEncoder(handle_unknown='ignore'))]), categorical_features),
        ]
    )

    models = {
        'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100),
        'XGBoost': XGBClassifier(eval_metric='logloss', random_state=42, n_estimators=50),
        'LightGBM': LGBMClassifier(random_state=42, n_estimators=50),
        'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    }

    results = []
    for name, model in models.items():
        pipeline = Pipeline([('preprocess', preprocessor), ('model', model)])
        param_grid = {
            'model__n_estimators': [50, 100],
        } if name == 'Random Forest' else {
            'model__n_estimators': [50, 100],
        } if name in {'XGBoost', 'LightGBM'} else {}
        grid = GridSearchCV(pipeline, param_grid=param_grid, cv=3, scoring='f1_macro', n_jobs=-1)
        grid.fit(X_train, y_train)
        prediction = grid.best_estimator_.predict(X_test)
        accuracy = accuracy_score(y_test, prediction)
        precision = precision_score(y_test, prediction, average='weighted', zero_division=0)
        recall = recall_score(y_test, prediction, average='weighted', zero_division=0)
        f1 = f1_score(y_test, prediction, average='weighted', zero_division=0)
        try:
            roc_auc = roc_auc_score(y_test, grid.best_estimator_.predict_proba(X_test), multi_class='ovr')
        except Exception:
            roc_auc = 0.0
        results.append({'model': name, 'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1, 'roc_auc': roc_auc})

    best = max(results, key=lambda item: (item['f1'], item['accuracy']))
    best_model = models[best['model']]
    pipeline = Pipeline([('preprocess', preprocessor), ('model', best_model)])
    pipeline.fit(X_train, y_train)
    joblib.dump(pipeline, MODEL_DIR / 'best_model.joblib')
    joblib.dump(preprocessor, MODEL_DIR / 'preprocessor.joblib')
    print(best)


if __name__ == '__main__':
    train_models()
