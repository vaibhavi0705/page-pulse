import { useState } from "react";
import api from "../services/api";

function URLInput({ setReport, setLoading, setError }) {
  const [url, setUrl] = useState("");

  const handleAudit = async () => {
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await api.post("/audit", {
        url,
      });

      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={handleAudit}>
        Audit
      </button>
    </div>
  );
}

export default URLInput;