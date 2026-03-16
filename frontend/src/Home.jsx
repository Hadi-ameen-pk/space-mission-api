function Home({ setPage }) {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Space Explorer
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px", color: "#6d7886" }}>
        Explore space missions and the latest space news.
      </p>

      <div>
        <button
          onClick={() => setPage("missions")}
          style={{
            marginRight: "15px",
            padding: "10px 20px"
          }}
        >
          View Missions
        </button>

        <button
          onClick={() => setPage("news")}
          style={{
            padding: "10px 20px"
          }}
        >
          View Space News
        </button>
      </div>
    </div>
  );
}

export default Home;
