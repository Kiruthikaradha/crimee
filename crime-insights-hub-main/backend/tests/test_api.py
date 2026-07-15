from fastapi.testclient import TestClient

from backend.api.main import app

client = TestClient(app)


def test_dashboard_endpoint_returns_payload():
    response = client.get('/dashboard')
    assert response.status_code == 200
    payload = response.json()
    assert 'kpis' in payload
    assert 'monthly_trend' in payload
    assert 'crime_categories' in payload


def test_login_returns_token():
    response = client.post('/auth/login', json={'username': 'admin', 'password': 'admin123'})
    assert response.status_code == 200
    payload = response.json()
    assert 'access_token' in payload
    assert payload['token_type'] == 'bearer'


def test_explain_endpoint_requires_authentication():
    response = client.post('/ml/explain', json={
        'latitude': 19.114,
        'longitude': 72.867,
        'hour': 22,
        'day': 6,
        'month': 7,
        'season': 'summer',
        'population_density': 23000,
        'previous_crime_count': 12,
        'crime_category': 'Theft'
    })
    assert response.status_code == 401


def test_forecast_endpoint_requires_authentication():
    response = client.post('/forecast', json={'horizon': 'tomorrow', 'location': 'Mumbai'})
    assert response.status_code == 401


def test_predict_endpoint_requires_authentication():
    response = client.post('/ml/predict', json={
        'latitude': 19.114,
        'longitude': 72.867,
        'hour': 22,
        'day': 6,
        'month': 7,
        'season': 'summer',
        'population_density': 23000,
        'previous_crime_count': 12,
        'crime_category': 'Theft'
    })
    assert response.status_code == 401


def test_predict_endpoint_with_auth():
    login_resp = client.post('/auth/login', json={'username': 'admin', 'password': 'admin123'})
    token = login_resp.json()['access_token']
    
    response = client.post('/ml/predict', json={
        'latitude': 19.114,
        'longitude': 72.867,
        'hour': 22,
        'day': 6,
        'month': 7,
        'season': 'summer',
        'population_density': 23000,
        'previous_crime_count': 12,
        'crime_category': 'Theft'
    }, headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    payload = response.json()
    assert 'risk_score' in payload
    assert 'confidence' in payload
    assert 'crime_type' in payload
    assert payload['crime_type'] in ['low', 'medium', 'high']
