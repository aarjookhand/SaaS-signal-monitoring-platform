from fastapi import APIRouter, HTTPException
from schemas.auth_schema import LoginRequest, TokenResponse
from services.auth_service import get_user_by_email
from core.auth_core import verify_password, create_access_token

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    user = get_user_by_email(data.email)
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})
    return {"access_token": token}
