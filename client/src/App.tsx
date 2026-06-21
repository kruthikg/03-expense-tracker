import { useState } from "react";
import type { User } from "./types.ts";
import Auth from "./Auth.tsx";
import Dashboard from "./Dashboard.tsx";

function App() {
  // remember the logged in user across page reloads
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  // not logged in -> show the login / signup page
  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;
