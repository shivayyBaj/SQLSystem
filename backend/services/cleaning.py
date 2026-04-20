import numpy as np

def clean_data(df):
    report = {}

    # Fill missing
    df = df.fillna(df.mean(numeric_only=True))

    # Remove duplicates
    df = df.drop_duplicates()

    # Outliers (Z-score)
    for col in df.select_dtypes(include=np.number):
        mean = df[col].mean()
        std = df[col].std()
        df = df[(df[col] >= mean - 3*std) & (df[col] <= mean + 3*std)]

    report["status"] = "cleaned"
    return df, report