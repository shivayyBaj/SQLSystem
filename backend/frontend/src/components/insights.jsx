export default function Insights({ data }) {
  if (!data) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Insights</h2>
      <p className="text-sm">{data}</p>
    </div>
  );
}