from fastapi import FastAPI
from routes.auth_route import router as auth_router

app = FastAPI()

@app.get("/")
async def root():
    return{"message": "Backend up and running!"}

app.include_router(auth_router)