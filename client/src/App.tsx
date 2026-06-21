import { useEffect, useState } from "react";
import api from "./api.ts";

function App() {
  const [message, setMessage] = useState("");

  // quick check that the frontend can talk to the backend
  useEffect(() => {
    api
      .get("/api/ping")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Could not reach the server."));
  }, []);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
