def suggest(df):
    s = []

    if "date" in df.columns:
        s.append("Do you want trend analysis?")

    if len(df.select_dtypes(include="number").columns) > 2:
        s.append("Do you want correlation analysis?")

    s.append("Detect anomalies?")
    s.append("Cluster this data?")

    return s