import numpy as np
import psycopg2
import random
import json
import os

DB_CONFIG = {
    'host': os.getenv("DB_HOST", "localhost"),
    'port': os.getenv("DB_PORT", 5432),
    'dbname': os.getenv("DB_NAME", "xpressure"),
    'user': os.getenv("DB_USER", "admin"),
    'password': os.getenv("DB_PASS", "password")
}

def generate_signal():
    duration = round(random.uniform(1, 100), 2)
    fs = 100
    t = np.linspace(0, duration, int(fs * duration), endpoint=False)

    n_components = random.randint(1, 3)
    primary_freq = random.uniform(10, 20)

    def other_freq():
        while True:
            f = random.uniform(1, 50)
            if f < 10 or f > 20:
                return f

    freqs = [primary_freq] + [other_freq() for _ in range(n_components - 1)]
    amps = [random.uniform(1, 10) for _ in range(n_components)]

    signal = sum(
        amp * np.sin(2 * np.pi * freq * t)
        for amp, freq in zip(amps, freqs)
    )

    components = [{"freq": round(f, 2), "amp": round(a, 2)} for f, a in zip(freqs, amps)]
    return duration, fs, components, signal.tolist()

def insert_signals(n=1000):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    for _ in range(n):
        duration, fs, components, samples = generate_signal()

        cur.execute("""
            INSERT INTO signals (duration, sampling_rate, components)
            VALUES (%s, %s, %s)
            RETURNING id
        """, (duration, fs, json.dumps(components)))
        signal_id = cur.fetchone()[0]

        cur.execute("""
            INSERT INTO samples (signal_id, values)
            VALUES (%s, %s)
        """, (signal_id, samples))

    conn.commit()
    cur.close()
    conn.close()
    print(f"{n} signals inserted.")
    print(f"Inserting signal {signal_id}: {len(samples)} samples, first few: {samples[:5]}")


if __name__ == "__main__":
    insert_signals(1000)
