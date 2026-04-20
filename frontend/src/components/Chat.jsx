import { useState } from "react";
import { askQuestion } from "../../../backend/services/api";
import ChartView from "./Chartview";
import Insights from "./Insights";
import Suggestions from "./Suggestions";
import { motion } from "framer-motion";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleAsk = async () => {
  try {
    const res = await askQuestion(question);
    setResponse(res.data);
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <div className="flex gap-2 mb-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your data..."
          className="flex-1 p-2 rounded bg-gray-800"
        />

        <button
  onClick={handleAsk}
  disabled={!question}
  className="bg-green-600 px-4 rounded"
>
  Ask
</button>
      </div>

{response && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

    <h3>SQL</h3>
    <pre>
  {typeof response.sql === "string"
    ? response.sql
    : JSON.stringify(response.sql, null, 2)}
</pre>

    {response.data && response.data.length > 0 && (
      <ChartView data={response.data} type={response.chart} />
    )}

    <Insights data={response.insights} />
    <Suggestions data={response.suggestions} />

  </motion.div>
)}
    </div>
  );
}