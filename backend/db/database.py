import sqlite3

conn = sqlite3.connect("data.db", check_same_thread=False)

def save_to_db(df, table_name="data"):
    df.to_sql(table_name, conn, if_exists="replace", index=False)

def run_query(sql):
    cursor = conn.cursor()
    cursor.execute(sql)
    cols = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    
    import pandas as pd
    return pd.DataFrame(rows, columns=cols)