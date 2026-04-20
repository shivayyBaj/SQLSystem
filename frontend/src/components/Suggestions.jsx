export default function Suggestions({ data }) {
  if (!data) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Suggestions</h2>

      {Array.isArray(data) ? (
        <ul>
          {data.map((item, i) => (
            <li key={i}>👉 {item}</li>
          ))}
        </ul>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
}