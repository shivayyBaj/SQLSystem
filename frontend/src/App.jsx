import ChartView from "./components/Chartview";
import Insights from "./components/Insights";
import Suggestions from "./components/Suggestions";
import Chat from "./components/Chat";
import Upload from "./components/Upload";
export default function App() {
  return (
    <>
<div className="min-h-screen flex flex-col items-center bg-black text-yellow-400 p-5">        <h1 className="text-6xl">AI Data Analyst</h1>
        <div className="bg-red-500 p-10 text-yellow-400">TAILWIND WORKING</div>
        <h1 className="text-red-500">TEST</h1>
        <Upload />
        <Chat />
      </div>
    </>
  );
}
