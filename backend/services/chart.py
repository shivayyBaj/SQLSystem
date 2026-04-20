def pick_chart(df):
    cols = df.columns

    if len(cols) == 2:
        return "bar"

    if "date" in cols:
        return "line"

    if len(cols) >= 3:
        return "scatter"

    return "table"