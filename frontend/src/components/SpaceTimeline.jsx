function SpaceTimeline() {
  const events = [
    {
      year: "1957",
      title: "Sputnik 1",
      desc: "The world's first artificial satellite launched by the Soviet Union."
    },
    {
      year: "1969",
      title: "Apollo 11",
      desc: "Neil Armstrong became the first human to walk on the Moon."
    },
    {
      year: "1998",
      title: "International Space Station",
      desc: "Construction of the ISS began, bringing nations together in space."
    },
    {
      year: "2021",
      title: "James Webb Telescope",
      desc: "The most powerful space telescope ever launched."
    },
    {
      year: "2026",
      title: "Space Explorer",
      desc: "A modern platform created to help beginners learn space science."
    }
  ];

  return (
    <section className="timeline-section">
      <h2>Journey Through Space History</h2>

      <div className="timeline">
        {events.map((event, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-year">
              {event.year}
            </div>

            <div className="timeline-card">
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpaceTimeline;