from pydantic import BaseModel
from typing import List

class SignalComponent(BaseModel):
    freq: float
    amp: float

class SignalOut(BaseModel):
    id: int
    duration: float
    sampling_rate: int
    components: List[SignalComponent]
