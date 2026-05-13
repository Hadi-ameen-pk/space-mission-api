import { useState, useEffect } from "react";

function Navbar({ setPage, onLogout, currentPage, loggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttonStyle = (pageName) => ({
    padding: "8px 16px",
    background: currentPage === pageName ? "#3b82f6" : "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s"
  });

  const navButton = (label, pageName) => (
    <button
      style={buttonStyle(pageName)}
      onClick={() => {
        setPage(pageName);
        setMenuOpen(false);
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        padding: "10px 20px"
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "white", margin: 0 }}>Space Explorer</h2>

        {/* Hamburger (only mobile) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "22px",
              background: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px"
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {navButton("Home", "home")}
            {navButton("Missions", "missions")}
            {navButton("Space News", "news")}
          </div>

          <div>
            {loggedIn ? (
              <button
                onClick={onLogout}
                style={{
                  padding: "8px 16px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setPage("login")}
                style={{
                  padding: "8px 16px",
                  background: "#22c55e",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "15px"
          }}
        >
          {navButton("Home", "home")}
          {navButton("Missions", "missions")}
          {navButton("Space News", "news")}

          {loggedIn ? (
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              style={{
                padding: "8px",
                background: "#ef4444",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setPage("login");
                setMenuOpen(false);
              }}
              style={{
                padding: "8px",
                background: "#22c55e",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;