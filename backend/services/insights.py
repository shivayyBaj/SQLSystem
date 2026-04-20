def generate_insights(df):
    insights = []

    for col in df.select_dtypes(include="number"):
        insights.append(f"{col} avg: {df[col].mean():.2f}")
        insights.append(f"{col} max: {df[col].max()}")

    return insights