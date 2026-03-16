import { useEffect, useState } from "react";
import api from "./api";

function Missions({ loggedIn }) {
  const [missions, setMissions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    agency: "",
    launch_date: "",
    status: "",
    description: "",
    crew: ""
  });

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const response = await api.get("missions/");
      setMissions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedIn) return;

    try {
      if (editingId !== null) {
        await api.put(`missions/${editingId}/`, formData);
        setEditingId(null);
      } else {
        await api.post("missions/", formData);
      }

      setFormData({
        name: "",
        agency: "",
        launch_date: "",
        status: "",
        description: "",
        crew: ""
      });

      fetchMissions();
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleEdit = (mission) => {
    if (!loggedIn) return;
    setFormData(mission);
    setEditingId(mission.id);
  };

  const handleDelete = async (id) => {
    if (!loggedIn) return;

    try {
      await api.delete(`missions/${id}/`);
      fetchMissions();
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Missions</h2>

      {/* Form only visible if logged in */}
      {loggedIn && (
        <div
          style={{
            maxWidth: "900px",
            margin: "40px auto",
            padding: "30px",
            backgroundColor: "rgba(0,0,0,0.75)",
            borderRadius: "12px",
            backdropFilter: "blur(8px)"
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>
            {editingId ? "Update Mission" : "Create Mission"}
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px"
            }}
          >
            <div>
              <label>Mission Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Agency</label>
              <input
                name="agency"
                value={formData.agency}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Launch Date</label>
              <input
                type="date"
                name="launch_date"
                value={formData.launch_date}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label>Status</label>
              <input
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label>Crew</label>
              <input
                name="crew"
                value={formData.crew}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                gridColumn: "span 2",
                padding: "12px",
                backgroundColor: "#2563eb",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              {editingId ? "Update Mission" : "Add Mission"}
            </button>
          </form>
        </div>
      )}

      {/* Mission List visible to everyone */}
      <ul>
        {missions.map((mission) => (
          <li key={mission.id} style={{ marginBottom: "20px" }}>
            <strong>{mission.name}</strong>
            <div>Agency: {mission.agency}</div>
            <div>Launch Date: {mission.launch_date}</div>
            <div>Status: {mission.status}</div>
            <div>Crew: {mission.crew}</div>
            <div>{mission.description}</div>

            {loggedIn && (
              <>
                <button onClick={() => handleEdit(mission)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(mission.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Missions;
