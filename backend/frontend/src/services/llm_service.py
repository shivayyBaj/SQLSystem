from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_sql(question, schema, history=""):
    prompt = f"""
You are a data analyst.

Conversation history:
{history}

Convert the question into SQL query.

Rules:
- Only return SQL
- No explanation
- Use table name: data

Schema:
{schema}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama3-70b-8192",  # fast + powerful
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.strip()