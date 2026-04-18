export default function Suggestions({ data }) {
  if (!data) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Suggestions</h2>
      <p className="text-sm">{data}</p>
    </div>
  );
}