export default function Insights({ data }) {
  if (!data) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Insights</h2>

      {Array.isArray(data) ? (
        <ul>
          {data.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
}