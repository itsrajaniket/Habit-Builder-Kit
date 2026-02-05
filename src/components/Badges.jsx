function Badges({ bestStreak }) {
  const badges = [
    { days: 3, label: "🥉 3-Day Streak" },
    { days: 7, label: "🥈 7-Day Streak" },
    { days: 14, label: "🥇 14-Day Streak" },
  ];

  return (
    <div className="badges-container">
      {badges.map((badge) => (
        <div
          key={badge.days}
          className={`badge ${bestStreak >= badge.days ? "earned" : ""}`}
        >
          {badge.label}
        </div>
      ))}
    </div>
  );
}

export default Badges;
