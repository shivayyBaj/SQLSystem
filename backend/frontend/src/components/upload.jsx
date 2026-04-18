import { useState } from "react";
import { uploadFile } from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const res = await uploadFile(file);
    alert("Uploaded & Cleaned!");
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl mb-6">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Upload CSV
      </button>
    </div>
  );
}