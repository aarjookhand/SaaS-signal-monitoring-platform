from typing import List, Dict
from core.db_connection import get_db_conn

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
