import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { username, password }
      );

      localStorage.setItem("access", response.data.access);
      onLogin();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Space Portal Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: "#ef4444", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
