import { useState} from "react";
import Navbar from "./components/Navbar.jsx";
import ScanForm from "./components/ScanForm.jsx";
import ResultsSection from "./components/ResultsSection";

export default function App() {
  const [results, setResults] = useState([]);

  const handleScanComplete = (data) => {
    setResults(data);
  };


  return (
    <div className="bg-slate-50 text-slate-800 font-Inter min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-2 pt-20 pb-10 block">
        <section className="flex flex-col md:flex-row gap-3">
          <ScanForm onScanComplete={handleScanComplete} />
          <div className="w-3/7 rounded-2xl"></div>
        </section>
        <ResultsSection results={results} />
      </main>
      <footer className="border-t mt-10 py-4 text-center text-sm text-slate-500">
        © 2025 — Built for demonstration purposes only.
      </footer>
    </div>
  );
}
