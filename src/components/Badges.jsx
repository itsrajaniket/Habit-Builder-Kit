function Badges({ bestStreak }) {
  const badges = [
    { days: 3, label: "🥉 3-Day Streak" },
    { days: 7, label: "🥈 7-Day Streak" },
    { days: 14, label: "🥇 14-Day Streak" },
    { days: 30, label: "🏆 30-Day Streak" }, // Added 30 for completeness
  ];

  return (
    <div className="badges-container">
      <h3>🏆 Achievements</h3>
      <div className="badges-grid">
        {" "}
        {/* Matches the grid layout if flex is used */}
        {badges.map((badge) => (
          <div
            key={badge.days}
            className={`badge ${bestStreak >= badge.days ? "earned" : ""}`}
          >
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Badges;
