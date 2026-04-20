from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_sql(question, schema, history=""):
    prompt = f"""
You are a data analyst.

Table name: data

Columns:
{schema}

IMPORTANT:
- ONLY use the columns listed above
- DO NOT invent column names like 'students' or 'status'
- "students passed" means rows where Pass = 1
- "students failed" means rows where Pass = 0

Return ONLY SQL query.

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a SQL generator"},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()