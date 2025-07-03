from typing import List, Dict
from core.db_connection import get_db_conn
import numpy as np

def fetch_all_signals() -> List[Dict]:
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, duration, sampling_rate, components FROM signals")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {
            "id": row[0],
            "duration": row[1],
            "sampling_rate": row[2],
            "components": row[3]
        }
        for row in rows
    ]


def fetch_signal_by_id(signal_id: int) -> dict | None:
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, values FROM samples WHERE signal_id = %s", (signal_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return None

    return {
        "id": row[0],
        "values": row[1]
    }


def fetch_signal_samples(signal_id: int) -> list[float] | None:
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT values FROM samples WHERE signal_id = %s", (signal_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row[0] if row else None


def get_dominant_frequency(signal_id: int) -> dict | None:
    samples = fetch_signal_samples(signal_id)
    if not samples:
        return None

    fs = 100  
    n = len(samples)

    signal = np.array(samples)
    fft_vals = np.fft.fft(signal)
    freqs = np.fft.fftfreq(n, d=1/fs)

    mask = (freqs >= 10) & (freqs <= 20)
    freqs = freqs[mask]
    magnitudes = np.abs(fft_vals[mask])

    if len(magnitudes) == 0:
        return None

    idx = np.argmax(magnitudes)

    return {
        "dominant_frequency": round(freqs[idx], 2),
        "amplitude": round(magnitudes[idx], 2)
    }