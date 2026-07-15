from fastapi import APIRouter, Depends, HTTPException, status

from backend.services.auth_service import LoginRequest, TokenResponse, authenticate_user, create_access_token, get_current_user

router = APIRouter()


@router.post('/login', response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    user = authenticate_user(payload.username, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    token = create_access_token(user['username'], user['role'])
    return TokenResponse(access_token=token, role=user['role'])


@router.get('/me')
def me(current_user=Depends(get_current_user)) -> dict[str, str]:
    return {'username': current_user.username, 'role': current_user.role}
