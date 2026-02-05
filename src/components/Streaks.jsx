import { calculateStreak } from "../utils/streaks";

function Streaks({ habits }) {
  // 1. Calculate streaks first, then Filter only those > 3
  const activeStreaks = habits
    .map((habit) => ({
      ...habit,
      currentStreak: calculateStreak(habit.completedDates),
    }))
    .filter((h) => h.currentStreak > 3) // Only show if streak is MORE than 3
    .sort((a, b) => b.currentStreak - a.currentStreak); // Sort highest first

  return (
    <div className="streaks-container">
      <h3>🔥 Top Streaks ({">"}3 Days)</h3>

      {/* 2. Scrollable Area: Fixed height with Scrollbar */}
      <div
        className="streaks-list"
        style={{
          maxHeight: "120px", // Fixes the height
          overflowY: "auto", // Adds scrollbar if list is long
          paddingRight: "5px", // Space for the scrollbar
        }}
      >
        {activeStreaks.length === 0 ? (
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "13px",
              fontStyle: "italic",
            }}
          >
            No long streaks yet. Keep consistent!
          </p>
        ) : (
          activeStreaks.map((habit) => (
            <div key={habit.id} className="streak-item">
              <span className="streak-emoji">{habit.emoji}</span>
              <span className="streak-name">{habit.name}</span>
              <span className="streak-count">
                🔥 {habit.currentStreak} days
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Streaks;
