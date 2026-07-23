import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/learning/${id}/`)
      .then((res) => {
        setTopic(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const markComplete = async () => {
    try {
      await api.post(`/learning/complete/${id}/`);
      alert("Topic Completed");
      navigate("/dashboard");
    } catch {
      alert("Login required");
    }
  };

  const goNext = async () => {
    try {
      const res = await api.get(`/learning/next/${id}/`);

      if (res.data.id) {
        navigate(`/topics/${res.data.id}`);
      } else {
        alert("No more topics");
      }
    } catch {
      alert("Unable to load next topic");
    }
  };

  // Convert any YouTube URL into an embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      // youtube.com/watch?v=...
      if (parsed.hostname.includes("youtube.com")) {
        if (parsed.pathname === "/watch") {
          const id = parsed.searchParams.get("v");
          return `https://www.youtube.com/embed/${id}`;
        }

        // youtube.com/shorts/...
        if (parsed.pathname.startsWith("/shorts/")) {
          const id = parsed.pathname.split("/shorts/")[1];
          return `https://www.youtube.com/embed/${id}`;
        }

        // Already embed link
        if (parsed.pathname.startsWith("/embed/")) {
          return url;
        }
      }

      // youtu.be/...
      if (parsed.hostname === "youtu.be") {
        const id = parsed.pathname.substring(1);
        return `https://www.youtube.com/embed/${id}`;
      }

      return "";
    } catch (error) {
      console.log("Invalid YouTube URL:", error);
      return "";
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="loading">Loading...</div>
      </>
    );
  }

  if (!topic) {
    return (
      <>
        <Navbar />
        <div className="loading">Topic not found</div>
      </>
    );
  }

  const embedUrl = getEmbedUrl(topic.video_url);

  console.log("Original URL:", topic.video_url);
  console.log("Embed URL:", embedUrl);

  return (
    <>
      <Navbar />

      <div className="back-container">
          <Link to="/topics">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </Link>
        </div>

      <section className="detail-page">

        <p className="detail-badge">{topic.category}</p>

        <h1>{topic.title}</h1>

        <p className="detail-short">
          {topic.short_description}
        </p>

        <div className="meta-row">
          <span>Distance: {topic.distance}</span>
          <span>Order: {topic.order}</span>
        </div>

        {embedUrl && (
          <div className="video-box">

            <iframe
              width="100%"
              height="500"
              src={embedUrl}
              title={topic.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>
        )}

        <div className="detail-card">

          <h3>About this Topic</h3>

          <p>{topic.description}</p>

        </div>

        <div className="detail-actions">

          <button
            className="complete-btn"
            onClick={markComplete}
          >
            Mark Complete
          </button>

          <button
            className="open-btn"
            onClick={goNext}
          >
            Next Topic
          </button>

        </div>

      </section>
    </>
  );
}

export default TopicDetail;