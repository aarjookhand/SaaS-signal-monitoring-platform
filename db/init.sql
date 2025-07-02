CREATE TABLE IF NOT EXISTS signals (
    id SERIAL PRIMARY KEY,
    duration FLOAT NOT NULL,
    sampling_rate INTEGER NOT NULL,
    components JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS samples (
    id SERIAL PRIMARY KEY,
    signal_id INTEGER REFERENCES signals(id) ON DELETE CASCADE,
    values FLOAT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (email, password)
VALUES ('admin@example.com', 'password123')
ON CONFLICT (email) DO NOTHING;
