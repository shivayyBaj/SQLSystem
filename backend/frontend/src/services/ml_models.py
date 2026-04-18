from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans

def add_anomaly(df):
    num = df.select_dtypes(include="number")
    model = IsolationForest(contamination=0.05)
    df["anomaly"] = model.fit_predict(num)
    return df

def add_clusters(df, k=3):
    num = df.select_dtypes(include="number")
    model = KMeans(n_clusters=k, n_init=10)
    df["cluster"] = model.fit_predict(num)
    return df