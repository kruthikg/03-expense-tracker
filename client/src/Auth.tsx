import { useState } from "react";
import api from "./api.ts";
import type { User } from "./types.ts";

type Props = {
  onAuth: (user: User) => void;
};

function Auth({ onAuth }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await api.post(url, body);

      // save the token and user so we stay logged in
      localStorage.setItem("token", res.data.token);
      const user = { name: res.data.name, email: res.data.email };
      localStorage.setItem("user", JSON.stringify(user));

      onAuth(user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Expense Tracker</h1>
        <p className="subtitle">{isLogin ? "Welcome back!" : "Create an account"}</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
