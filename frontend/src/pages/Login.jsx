import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/token/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem(
        "username",
        form.username
      );

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-box" onSubmit={loginUser}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;