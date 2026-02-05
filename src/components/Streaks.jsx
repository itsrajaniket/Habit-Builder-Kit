import { calculateStreak } from "../utils/streaks";

function Streaks({ habits }) {
  return (
    <div className="streaks-container">
      <h3>🔥 Current Streaks</h3>
      <div className="streaks-list">
        {" "}
        {/* New inner wrapper for spacing */}
        {habits.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            No active streaks yet.
          </p>
        ) : (
          habits.map((habit) => {
            const streak = calculateStreak(habit.completedDates);
            return (
              <div key={habit.id} className="streak-item">
                <span className="streak-emoji">{habit.emoji}</span>
                <span className="streak-name">{habit.name}</span>
                <span className="streak-count">{streak} days</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Streaks;
