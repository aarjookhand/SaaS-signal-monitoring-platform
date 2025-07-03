from fastapi import APIRouter, Depends, HTTPException
from core.auth_core import get_current_user
from services.signal_service import fetch_all_signals, fetch_signal_by_id, get_dominant_frequency
from schemas.signal_schema import SignalOut, SignalData, DominantInfo
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

@router.get("/signals/{signal_id}/analysis", response_model=DominantInfo)
def signal_dominant(signal_id: int, user: str = Depends(get_current_user)):
    info = get_dominant_frequency(signal_id)
    if not info:
        raise HTTPException(status_code=404, detail="No dominant frequency found in range")
    return info