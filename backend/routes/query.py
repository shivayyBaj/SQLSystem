from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.llm_service import generate_sql
from db.database import run_query
from services.insights import generate_insights
from services.suggestions import suggest
from services.chart import pick_chart
from services.ml_models import add_anomaly, add_clusters
from services.memory import add_to_memory, get_memory

import json

def safe(val):
    try:
        return val if isinstance(val, str) else json.dumps(val)
    except:
        return str(val)
router = APIRouter()

def stream_output(data):
    for item in data:
        yield item + "\n"

@router.post("/ask")
def ask(question: str):

    history = get_memory()

    # get real column names
    df_sample = run_query("SELECT * FROM data LIMIT 1")
    schema = ", ".join(df_sample.columns)

    sql = generate_sql(question, schema, history)

    try:
        df = run_query(sql)
    except Exception as e:
        return {
            "error": "Invalid SQL generated",
            "sql": sql,
            "message": str(e)
        }

    # ML features
    df = add_anomaly(df)
    df = add_clusters(df)

    insights = generate_insights(df)
    suggestions = suggest(df)
    chart = pick_chart(df)

    add_to_memory(question, sql)
    print("SQL:", sql)    
    return {
    "sql": safe(sql),
    "chart": safe(chart),
    "insights": safe(insights),
    "suggestions": safe(suggestions),
    "data": df.head().to_dict(orient="records")
}