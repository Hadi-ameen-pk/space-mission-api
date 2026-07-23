import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">SPACE EXPLORER</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/news">News</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;