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
    <div style={{ padding: "20px" }}>
      
      {/* Title */}
      <h2 style={{
        textAlign: "center",
        fontSize: "32px",
        marginBottom: "20px",
        color: "white"
      }}>
        Space Missions
      </h2>

      {/* Form */}
      {localStorage.getItem("isAdmin") === "true" && (
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
          <h2 style={{ marginBottom: "25px", color: "white" }}>
            {editingId ? "Update Mission" : "Create Mission"}
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px"
            }}
          >
            <div>
              <label style={{ color: "white" }}>Mission Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={{ color: "white" }}>Agency</label>
              <input name="agency" value={formData.agency} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={{ color: "white" }}>Launch Date</label>
              <input type="date" name="launch_date" value={formData.launch_date} onChange={handleChange} required style={inputStyle} />
            </div>

            <div>
              <label style={{ color: "white" }}>Status</label>
              <input name="status" value={formData.status} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ color: "white" }}>Crew</label>
              <input name="crew" value={formData.crew} onChange={handleChange} required style={inputStyle} />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ color: "white" }}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required style={inputStyle} />
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
                cursor: "pointer",
                color: "white"
              }}
            >
              {editingId ? "Update Mission" : "Add Mission"}
            </button>
          </form>
        </div>
      )}

      {/* Missions Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
          marginTop: "30px"
        }}
      >
        {missions.map((mission) => (
          <div
            key={mission.id}
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              padding: "20px",
              borderRadius: "16px",
              color: "white",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <strong style={{ fontSize: "20px", display: "block", marginBottom: "10px" }}>
              {mission.name}
            </strong>

            <div style={{ color: "#94a3b8" }}>Agency: {mission.agency}</div>
            <div style={{ color: "#94a3b8" }}>Launch: {mission.launch_date}</div>
            <div style={{ color: "#94a3b8" }}>Status: {mission.status}</div>
            <div style={{ color: "#94a3b8" }}>Crew: {mission.crew}</div>

            <div style={{ marginTop: "12px", lineHeight: "1.5", color: "#cbd5f5" }}>
              {mission.description}
            </div>

            {loggedIn && (
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(mission)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#3b82f6",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(mission.id)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: "#ef4444",
                    border: "none",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Missions;