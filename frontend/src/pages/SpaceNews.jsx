import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SpaceNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=9")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="news-page">
        <h1>Latest Space News</h1>

        <p>
          Stay updated with the latest discoveries, launches and missions.
        </p>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="news-grid">
            {news.map((article) => (
              <div className="news-card" key={article.id}>
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="news-image"
                />

                <span>{article.news_site}</span>

                <h3>{article.title}</h3>

                <p>
                  {article.summary.length > 140
                    ? article.summary.slice(0, 140) + "..."
                    : article.summary}
                </p>

                <p>
                  <strong>Published:</strong>{" "}
                  {new Date(article.published_at).toLocaleDateString()}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="open-btn">
                    Read More →
                  </button>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default SpaceNews;