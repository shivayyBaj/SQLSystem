from fastapi import FastAPI
from routes import upload, query

app = FastAPI(title="AI Data Analyst")

app.include_router(upload.router)
app.include_router(query.router)