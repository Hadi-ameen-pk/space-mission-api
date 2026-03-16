function Navbar({ setPage, onLogout, currentPage, loggedIn }) {
  const buttonStyle = (pageName) => ({
    marginRight: "12px",
    padding: "8px 16px",
    background: currentPage === pageName ? "#3b82f6" : "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#1e293b",
        borderBottom: "1px solid #334155",
      }}
    >
      {/* Left Navigation Buttons */}
      <div>
        <button
          style={buttonStyle("home")}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          style={buttonStyle("missions")}
          onClick={() => setPage("missions")}
        >
          Missions
        </button>

        <button
          style={buttonStyle("news")}
          onClick={() => setPage("news")}
        >
          Space News
        </button>
      </div>

      {/* Right Auth Button */}
      {loggedIn ? (
        <button
          onClick={onLogout}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
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
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Navbar;
