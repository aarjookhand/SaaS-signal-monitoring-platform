from fastapi import APIRouter, Depends, HTTPException
from core.auth_core import get_current_user
from services.signal_service import fetch_all_signals, fetch_signal_by_id
from schemas.signal_schema import SignalOut, SignalData
from typing import List

router = APIRouter()

@router.get("/signals", response_model=List[SignalOut])
def list_signals(user: str = Depends(get_current_user)):
    return fetch_all_signals()

@router.get("/signals/{signal_id}", response_model=SignalData)
def get_signal_by_id(signal_id: int, user: str = Depends(get_current_user)):
    signal = fetch_signal_by_id(signal_id)
    if not signal:
        raise HTTPException(status_code=404, detail="Signal not found")
    return signal