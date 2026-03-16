import { useState, useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import Missions from "./Missions";
import SpaceNews from "./SpaceNews";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("home");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    setLoggedIn(false);
    setPage("home");
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setPage("home");
  };

  const renderPage = () => {
    switch (page) {
      case "missions":
        return <Missions loggedIn={loggedIn} />;
      case "news":
        return <SpaceNews />;
      case "login":
        return <Login onLogin={handleLoginSuccess} />;
      default:
  return <Home setPage={setPage} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url('/space.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.65)"
        }}
      >
        <Navbar
          setPage={setPage}
          onLogout={handleLogout}
          currentPage={page}
          loggedIn={loggedIn}
        />

        <div style={{ flex: 1 }}>
          {renderPage()}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
