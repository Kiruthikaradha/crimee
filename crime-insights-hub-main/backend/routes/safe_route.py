from fastapi import APIRouter

router = APIRouter()


@router.get('/safe-route')
def get_safe_route() -> dict:
    return {
        'routes': [
            {'kind': 'safest', 'label': 'Safest Route', 'time': '34 min', 'distance': '12.4 km', 'risk': 22, 'color': '#22c55e'},
            {'kind': 'fastest', 'label': 'Fastest Route', 'time': '26 min', 'distance': '10.8 km', 'risk': 58, 'color': '#f59e0b'},
            {'kind': 'avoid', 'label': 'High Risk Corridor', 'time': '29 min', 'distance': '11.6 km', 'risk': 84, 'color': '#ef4444'},
        ]
    }
