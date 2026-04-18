from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from services.llm_service import generate_sql
from db.database import run_query
from services.insights import generate_insights
from services.suggestions import suggest
from services.chart import pick_chart
from services.ml_models import add_anomaly, add_clusters
from services.memory import add_to_memory, get_memory

router = APIRouter()

def stream_output(data):
    for item in data:
        yield item + "\n"

@router.post("/ask")
def ask(question: str):

    history = get_memory()

    sql = generate_sql(question, "data table", history)

    df = run_query(sql)

    # ML features
    df = add_anomaly(df)
    df = add_clusters(df)

    insights = generate_insights(df)
    suggestions = suggest(df)
    chart = pick_chart(df)

    add_to_memory(question, sql)

    response = [
        f"SQL: {sql}",
        f"Chart: {chart}",
        f"Insights: {insights}",
        f"Suggestions: {suggestions}"
    ]

    return StreamingResponse(stream_output(response), media_type="text/plain")