import { useState } from "react";
import { askQuestion } from "../services/api";
import ChartView from "./ChartView";
import Insights from "./Insights";
import Suggestions from "./Suggestions";
import { motion } from "framer-motion";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await askQuestion(question);
    setResponse(res.data);
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
          className="bg-green-600 px-4 rounded"
        >
          Ask
        </button>
      </div>

      {response && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <pre className="text-sm">{response}</pre>

          <ChartView data={response} />
          <Insights data={response} />
          <Suggestions data={response} />
        </motion.div>
      )}
    </div>
  );
}