import {
  BarChart, Bar,
  LineChart, Line,
  ScatterChart, Scatter,
  XAxis, YAxis, Tooltip
} from "recharts";

export default function ChartView({ data, type }) {
  if (!data || data.length === 0) return null;

  const keys = Object.keys(data[0]);
  const xKey = keys[0];
  const yKey = keys[1];

  if (type === "bar") {
    return (
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} />
      </BarChart>
    );
  }

  if (type === "line") {
    return (
      <LineChart width={400} height={250} data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line dataKey={yKey} />
      </LineChart>
    );
  }

  if (type === "scatter") {
    return (
      <ScatterChart width={400} height={250}>
        <XAxis dataKey={xKey} />
        <YAxis dataKey={yKey} />
        <Tooltip />
        <Scatter data={data} />
      </ScatterChart>
    );
  }

  return null;
}