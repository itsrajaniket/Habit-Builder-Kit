import { calculateStreak } from "../utils/streaks";

function Streaks({ habits }) {
  // 1. Calculate and Sort (Highest streak first)
  const activeStreaks = habits
    .map((habit) => ({
      ...habit,
      currentStreak: calculateStreak(habit.completedDates),
    }))
    .filter((h) => h.currentStreak > 3) // Only show streaks > 3
    .sort((a, b) => b.currentStreak - a.currentStreak);

  return (
    <div className="streaks-container">
      <h3>🔥 Top Streaks</h3>

      <div
        className="streaks-list"
        style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}
      >
        {activeStreaks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "var(--text-secondary)",
              fontSize: "12px",
            }}
          >
            <div
              style={{ fontSize: "20px", marginBottom: "5px", opacity: 0.5 }}
            >
              💤
            </div>
            No streaks over 3 days yet.
            <br />
            Keep going!
          </div>
        ) : (
          activeStreaks.map((habit) => (
            <div key={habit.id} className="streak-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="streak-emoji">{habit.emoji}</span>
                <span className="streak-name">{habit.name}</span>
              </div>
              <span className="streak-count">{habit.currentStreak} Days</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Streaks;
