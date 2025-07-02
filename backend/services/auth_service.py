from core.db_connection import get_db_conn

def get_user_by_email(email: str):
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT email, password FROM users WHERE email = %s", (email,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return None
    return {"email": row[0], "password": row[1]}
