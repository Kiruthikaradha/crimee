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

### Deploying the Backend to Render
1. Push this repository to GitHub or GitLab.
2. Sign in to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically parse the `render.yaml` file, creating:
   - A PostgreSQL database (`crimevision-db`)
   - A Web Service (`crimevision-backend`) running on Docker
6. Click **Apply** to deploy the services. The database will automatically initialize and seed itself on startup.

### Deploying the Frontend to Vercel
1. Set up a new project on Vercel and connect your repository.
2. Configure Vercel to build the project.
3. In Vercel, set the environment variable:
   - `VITE_API_BASE_URL`: Set this to your deployed Render service URL (e.g. `https://crimevision-backend.onrender.com`).
