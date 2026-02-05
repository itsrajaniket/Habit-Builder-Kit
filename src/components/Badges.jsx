function Badges({ bestStreak }) {
  const badges = [
    { days: 3, label: "3 Days", icon: "🥉" },
    { days: 7, label: "7 Days", icon: "🥈" },
    { days: 14, label: "14 Days", icon: "🥇" },
    { days: 30, label: "30 Days", icon: "🏆" },
  ];

  return (
    <div className="badges-container">
      <h3>🏆 Achievements</h3>
      <div className="badges-grid">
        {badges.map((badge) => {
          const isEarned = bestStreak >= badge.days;
          return (
            <div
              key={badge.days}
              className={`badge ${isEarned ? "earned" : ""}`}
            >
              <div className="badge-icon">{isEarned ? badge.icon : "🔒"}</div>
              <div>{badge.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Badges;
