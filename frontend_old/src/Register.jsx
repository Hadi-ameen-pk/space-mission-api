import { useState } from "react";
import axios from "axios";

function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setMessage("");
    setError("");

    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          username,
          password,
        }
      );

      setMessage("✅ Account created successfully! Please login.");
      setUsername("");
      setPassword("");

      // Optional: auto redirect after 2 sec
      setTimeout(() => {
        setPage("login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed"
      );
    }
  };

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "30px",
          background: "rgba(0,0,0,0.7)",
          borderRadius: "10px",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        {error && (
          <p style={{ color: "#ef4444", fontSize: "14px" }}>
            {error}
          </p>
        )}

        {message && (
          <p style={{ color: "#22c55e", fontSize: "14px" }}>
            {message}
          </p>
        )}

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => setPage("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;