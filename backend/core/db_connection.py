import os
import psycopg2

DB_CONFIG = {
    'host': os.getenv("DB_HOST", "localhost"),
    'port': int(os.getenv("DB_PORT", 5432)),
    'dbname': os.getenv("DB_NAME", "xpressure"),
    'user': os.getenv("DB_USER", "admin"),
    'password': os.getenv("DB_PASS", "password")
}

def get_db_conn():
    return psycopg2.connect(**DB_CONFIG)
