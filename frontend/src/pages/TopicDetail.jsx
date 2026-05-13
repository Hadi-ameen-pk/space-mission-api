import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  if (loading) return <div className="loading">Loading...</div>;

  if (!topic) return <div className="loading">Topic not found</div>;

  return (
    <div>
      <Navbar />

      <section className="detail-page">
        <p className="detail-badge">{topic.category}</p>

        <h1>{topic.title}</h1>

        <p className="detail-short">{topic.short_description}</p>

        <div className="meta-row">
          <span>Distance: {topic.distance}</span>
          <span>Order: {topic.order}</span>
        </div>

        {topic.video_url && (
          <div className="video-box">
            <iframe
              src={topic.video_url.replace("watch?v=", "embed/")}
              title={topic.title}
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="detail-card">
          <h3>About this Topic</h3>
          <p>{topic.description}</p>
        </div>

        <div className="detail-actions">
          <button className="complete-btn" onClick={markComplete}>
            Mark Complete
          </button>

          <button className="open-btn" onClick={goNext}>
            Next Topic
          </button>
        </div>
      </section>
    </div>
  );
}

export default TopicDetail;