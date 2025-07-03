from fastapi import APIRouter, Depends
from core.auth_core import get_current_user
from services.signal_service import fetch_all_signals
from schemas.signal_schema import SignalOut
from typing import List

router = APIRouter()

@router.get("/signals", response_model=List[SignalOut])
def list_signals(user: str = Depends(get_current_user)):
    return fetch_all_signals()
