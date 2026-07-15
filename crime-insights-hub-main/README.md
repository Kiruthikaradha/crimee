# CrimeVision AI

CrimeVision AI is an enterprise-grade crime intelligence platform with a React frontend, Python FastAPI backend, explainable AI, forecasting, and deployment-ready infrastructure.

## Features
- Interactive dashboard with KPI cards and charts
- Explainable AI hotspot scoring with SHAP-style feature attribution
- Forecasting for tomorrow, next week, next month, and next year
- JWT authentication and role-based access
- Docker-ready backend and frontend configuration
- Swagger UI at /docs

## Run locally

### Backend
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.api.main:app --reload
```

### Frontend
```bash
npm install
npm run dev
```

## Environment variables
- DATABASE_URL
- JWT_SECRET_KEY
- JWT_ALGORITHM
- ACCESS_TOKEN_EXPIRE_MINUTES
- APP_ADMIN_USERNAME
- APP_ADMIN_PASSWORD

## Deployment targets
- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL
