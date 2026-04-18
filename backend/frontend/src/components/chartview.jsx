import {
  BarChart, Bar,
  LineChart, Line,
  ScatterChart, Scatter,
  XAxis, YAxis, Tooltip
} from "recharts";

export default function ChartView({ data }) {
  if (!data) return null;

  const chartType = data.includes("bar") ? "bar"
    : data.includes("line") ? "line"
    : data.includes("scatter") ? "scatter"
    : null;

  const sample = [
    { name: "A", value: 30 },
    { name: "B", value: 50 }
  ];

  if (chartType === "bar") {
    return (
      <BarChart width={300} height={200} data={sample}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    );
  }

  if (chartType === "line") {
    return (
      <LineChart width={300} height={200} data={sample}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" />
      </LineChart>
    );
  }

  if (chartType === "scatter") {
    return (
      <ScatterChart width={300} height={200}>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Tooltip />
        <Scatter data={sample} />
      </ScatterChart>
    );
  }

  return null;
}