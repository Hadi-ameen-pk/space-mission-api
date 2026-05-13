import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    api.get("/learning/dashboard-progress/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setData(res.data))
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

  return (
    <>
      <Navbar />

      <section className="dashboard">
        <h1>Welcome Back</h1>
        <p className="dash-sub">
          Continue your journey through space.
        </p>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>{data.progress_percent}%</h3>
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

        </div>

        {data.next_topic && (
          <div className="continue-box">
            <h2>Next Topic</h2>
            <p>{data.next_topic.title}</p>

            <Link to={`/topics/${data.next_topic.id}`}>
              <button className="hero-btn">
                Continue Learning
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;