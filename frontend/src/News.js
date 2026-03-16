import { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spaceflightnewsapi.net/v4/articles/")
      .then((res) => setArticles(res.data.results));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Space News</h2>

      {articles.map((a) => (
        <div key={a.id} style={{ marginBottom: "20px" }}>
          <h4>{a.title}</h4>
          <p>{a.summary}</p>
          <a href={a.url} target="_blank" rel="noreferrer">
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
}

export default News;
