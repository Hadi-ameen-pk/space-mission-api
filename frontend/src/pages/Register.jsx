import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users/register/", form);

      alert("Account created successfully");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Registration failed"
      );
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-box" onSubmit={registerUser}>
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;