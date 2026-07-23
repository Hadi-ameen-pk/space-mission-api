import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Footer from "../components/Footer";


function Topics() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/learning/status/")
      .then((res) => setTopics(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="topics-page">
        <h1>Explore Topics</h1>
        <p>Complete lessons to unlock new discoveries.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        {filteredTopics.length === 0 && (
          <h3 className="no-results">
            No topics found.
          </h3>
        )}
        
        <div className="topic-grid">
          {filteredTopics.map((topic) => (
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
      <Footer />
    </>
    
  );
}

export default Topics;