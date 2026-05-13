import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/learning/status/")
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <section className="topics-page">
        <h1>Explore Topics</h1>
        <p>Complete lessons to unlock new discoveries.</p>

        <div className="topic-grid">
          {topics.map((topic) => (
            <div className="topic-card" key={topic.id}>
              <h3>{topic.title}</h3>

              <p>{topic.short_description}</p>

              {topic.locked ? (
                <button className="locked-btn">
                  Locked
                </button>
              ) : (
                <Link to={`/topics/${topic.id}`}>
                  <button className="open-btn">
                    Open Topic
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Topics;