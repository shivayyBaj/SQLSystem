from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans

def add_anomaly(df):
    num = df.select_dtypes(include="number")

    # 🔥 safety checks
    if num.empty or len(num) < 2:
        return df

    try:
        model = IsolationForest(contamination=0.05)
        df["anomaly"] = model.fit_predict(num)
    except:
        pass  # skip if anything fails

    return df

def add_clusters(df):
    num = df.select_dtypes(include=["number"])

    if len(num) < 2:
        return df  

    model = KMeans(n_clusters=3)
    df["cluster"] = model.fit_predict(num)

    return df