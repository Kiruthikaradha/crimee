import logging

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.database.session import init_db
from backend.routes import auth, dashboard, crimes, heatmap, analytics, hotspots, reports, alerts, safe_route, ml, forecast
from backend.services.seed_data import seed_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('crimevision')

app = FastAPI(title='CrimeVision AI API', version='1.0.0', docs_url='/docs', redoc_url='/redoc')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(dashboard.router, prefix='', tags=['dashboard'])
app.include_router(crimes.router, prefix='', tags=['crimes'])
app.include_router(heatmap.router, prefix='', tags=['heatmap'])
app.include_router(analytics.router, prefix='', tags=['analytics'])
app.include_router(hotspots.router, prefix='', tags=['hotspots'])
app.include_router(reports.router, prefix='', tags=['reports'])
app.include_router(alerts.router, prefix='', tags=['alerts'])
app.include_router(safe_route.router, prefix='', tags=['safe-route'])
app.include_router(auth.router, prefix='/auth', tags=['auth'])
app.include_router(ml.router, prefix='/ml', tags=['ml'])
app.include_router(forecast.router, prefix='', tags=['forecast'])


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
    logger.warning('Validation error: %s', exc)
    return JSONResponse(status_code=422, content={'detail': exc.errors()})


@app.middleware('http')
async def logging_middleware(request: Request, call_next):
    logger.info('Request %s %s', request.method, request.url.path)
    response = await call_next(request)
    logger.info('Response %s %s', response.status_code, request.url.path)
    return response


@app.on_event('startup')
def startup_event() -> None:
    init_db()
    seed_database()
    logger.info('CrimeVision AI backend started')


@app.get('/')
def read_root() -> dict[str, str]:
    return {'message': 'CrimeVision AI API is running'}
