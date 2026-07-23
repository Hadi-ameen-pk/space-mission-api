import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import SpaceFacts from "../components/SpaceFacts";
import SpaceTimeline from "../components/SpaceTimeline";
import FeaturedVideo from "../components/FeaturedVideo";
import Footer from "../components/Footer";

function Home() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get("/learning/")
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />

      <section className="hero">
        <p className="hero-tag">Explore The Universe</p>

        <h1>Learn Space Science In A Modern Way</h1>

        <p>
          Discover black holes, planets, galaxies, missions and the secrets of
          the cosmos through simple visual learning.
        </p>

        <div className="hero-actions">
          <Link to="/topics">
            <button className="hero-btn">Start Learning</button>
          </Link>

          <Link to="/dashboard">
            <button className="hero-btn">My Progress</button>
          </Link>
        </div>
      </section>

      <section className="stats-section">

        <h2>Space Explorer in Numbers</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{topics.length}</h3>
            <p>Learning Topics</p>
          </div>

          <div className="stat-card">
            <h3>
              {topics.filter(topic => topic.video_url).length}
            </h3>
            <p>Educational Videos</p>
          </div>

          <div className="stat-card">
            <h3>100%</h3>
            <p>Responsive Design</p>
          </div>

          <div className="stat-card">
            <h3>
              {new Set(topics.map(topic => topic.category)).size}
            </h3>
            <p>Categories</p>
          </div>

        </div>

      </section>

      <SpaceFacts />

      <section className="stats-strip">
        <div className="stat-mini">
          <h3>{topics.length}+</h3>
          <p>Topics</p>
        </div>

        <div className="stat-mini">
          <h3>100%</h3>
          <p>Beginner Friendly</p>
        </div>

        <div className="stat-mini">
          <h3>Video</h3>
          <p>Learning</p>
        </div>

        <div className="stat-mini">
          <h3>Track</h3>
          <p>Progress</p>
        </div>
      </section>

      <section className="topics-section">
        <h2>Featured Topics</h2>

        <div className="topic-grid">
          {topics.map((topic) => (
            <div className="topic-card" key={topic.id}>
              <span className="topic-badge">{topic.category}</span>

              <h3>{topic.title}</h3>

              <p>{topic.short_description}</p>

              <div className="topic-meta">
                <span>{topic.distance}</span>
              </div>

              <Link to={`/topics/${topic.id}`}>
                <button className="open-btn">Explore Topic</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <h2>Why Space Explorer</h2>

        <div className="topic-grid">
          <div className="topic-card">
            <h3>Simple Learning</h3>
            <p>Complex space topics explained clearly for everyone.</p>
          </div>

          <div className="topic-card">
            <h3>Track Progress</h3>
            <p>Complete lessons and continue where you stopped.</p>
          </div>

          <div className="topic-card">
            <h3>Modern Experience</h3>
            <p>Beautiful dark UI built for focused learning.</p>
          </div>
        </div>
      </section>
      
      <SpaceTimeline />

      <FeaturedVideo />

      <Footer />
    </div>
  );
}

export default Home;