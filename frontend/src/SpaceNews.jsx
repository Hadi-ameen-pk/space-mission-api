import { useEffect, useState } from "react";
import axios from "axios";

function SpaceNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v4/articles/?limit=6")
      .then((res) => {
        setArticles(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load news.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <h2>Loading Space News... </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2 style={{ marginBottom: "30px" }}>Latest Space News</h2>

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            background: "#1e293b",
            padding: "20px",
            marginBottom: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h3>{article.title}</h3>

          <p style={{ fontSize: "13px", color: "#94a3b8" }}>
            {new Date(article.published_at).toLocaleDateString()}
          </p>

          {article.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}

          <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
            {article.summary.slice(0, 200)}...
          </p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "12px",
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Read Full Article →
          </a>
        </div>
      ))}
    </div>
  );
}

export default SpaceNews;
