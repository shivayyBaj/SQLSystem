import { useState } from "react";
import { uploadFile } from "../../../backend/services/api";

export default function Upload() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const res = await uploadFile(file);

      setReport(res.data.report);
      setPreview(res.data.preview);
      setUploaded(true); 

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>

    {/* 🔥 BEFORE UPLOAD */}
    {!uploaded && (
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload CSV</button>

        {loading && <p>⏳ Processing your data...</p>}
      </div>
    )}

    {/* 🔥 AFTER UPLOAD */}
    {uploaded && (
      <>
        <h2>Cleaning Report</h2>
        <p><strong>Status:</strong> {report.status}</p>

        <h2>Data Preview</h2>

        <table border="1" style={{ margin: "auto", marginTop: "20px" }}>
          <thead>
            <tr>
              {Object.keys(preview[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => {
          setUploaded(false);
          setFile(null);
          setReport(null);
          setPreview(null);
        }}>
          Upload Another File
        </button>
      </>
    )}

  </div>
);
};
