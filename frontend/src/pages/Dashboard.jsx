import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Achievements from "../components/Achievements";
import Footer from "../components/Footer";


function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    api
      .get("/learning/dashboard-progress/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="dashboard loading">
          Loading Dashboard...
        </div>
      </>
    );
  }

  // Calculate total topics if backend doesn't send it
  const totalTopics =
    data.total_topics ??
    (data.completed_topics + data.remaining_topics);

  // Calculate percentage
  const percentage =
    totalTopics === 0
      ? 0
      : Math.round((data.completed_topics / totalTopics) * 100);

  return (
    <>
      <Navbar />

      <section className="dashboard">
        <h1>Welcome Back </h1>

        <p className="dash-sub">
          Continue your journey through the universe.
        </p>

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{percentage}%</h3>
            <p>Progress</p>
          </div>

          <div className="stat-card">
            <h3>{data.completed_topics}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>{data.remaining_topics}</h3>
            <p>Remaining</p>
          </div>

          <div className="stat-card">
            <h3>{totalTopics}</h3>
            <p>Total Topics</p>
          </div>

        </div>

        {/* Progress Bar */}

        <div className="progress-card">

          <h2>Overall Progress</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <p>
            {data.completed_topics} of {totalTopics} Topics Completed
          </p>

        </div>

        <Achievements completed={data.completed_topics} />

        {percentage === 100 && (

          <div className="continue-box">

            <h2>🎉 Congratulations!</h2>

            <p>
              You completed all learning topics.
            </p>

            <Link to="/certificate">
              <button className="hero-btn">
                View Certificate
              </button>
            </Link>

          </div>

        )}

        {/* Next Topic */}

        {data.next_topic && (
          <div className="continue-box">

            <h2>Continue Learning</h2>

            <p>
              Your next lesson is:
            </p>

            <h3>{data.next_topic.title}</h3>

            <Link to={`/topics/${data.next_topic.id}`}>
              <button className="hero-btn">
                Continue Learning
              </button>
            </Link>

          </div>
        )}

      </section>

      <Footer />
      
    </>
  );
}

export default Dashboard;