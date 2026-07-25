import { useState } from "react";
import "./App.css";
import URLInput from "./components/URLInput";
import ReportCard from "./components/ReportCard";

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <h1>Page Pulse</h1>

      <URLInput
        setReport={setReport}
        setLoading={setLoading}
        setError={setError}
      />

      {loading && <p>Auditing website...</p>}

      {error && <p className="error">{error}</p>}

      {report && <ReportCard report={report} />}
    </div>
  );
}

export default App;