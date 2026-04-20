from fastapi import APIRouter, UploadFile, File
import pandas as pd
from services.cleaning import clean_data
from db.database import save_to_db

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    df, report = clean_data(df)

    save_to_db(df)

    return {
        "message": "uploaded",
        "report": report,
        "preview": df.head().to_dict(orient="records")
    }