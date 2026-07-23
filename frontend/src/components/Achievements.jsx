function Achievements({ completed }) {

  const badges = [
    {
      title: "Space Beginner",
      icon: "🚀",
      unlocked: completed >= 1,
      desc: "Complete your first topic"
    },
    {
      title: "Black Hole Explorer",
      icon: "🌑",
      unlocked: completed >= 2,
      desc: "Complete two topics"
    },
    {
      title: "Space Learner",
      icon: "🛰️",
      unlocked: completed >= 3,
      desc: "Complete three topics"
    },
    {
      title: "Space Master",
      icon: "🌌",
      unlocked: completed >= 4,
      desc: "Complete all topics"
    }
  ];

  return (
    <section className="achievement-section">

      <h2>Achievements</h2>

      <div className="achievement-grid">

        {badges.map((badge, index) => (

          <div
            key={index}
            className={
              badge.unlocked
                ? "achievement-card unlocked"
                : "achievement-card locked"
            }
          >

            <h1>{badge.icon}</h1>

            <h3>{badge.title}</h3>

            <p>{badge.desc}</p>

            <span>
              {badge.unlocked ? "Unlocked" : "Locked"}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Achievements;