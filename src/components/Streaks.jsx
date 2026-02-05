import { calculateStreak } from "../utils/streaks";

function Streaks({ habits }) {
  return (
    <div className="streaks-container">
      {habits.map((habit) => {
        const streak = calculateStreak(habit.completedDates);

        return (
          <div key={habit.id} className="streak-item">
            <span className="streak-emoji">{habit.emoji}</span>
            <span className="streak-name">{habit.name}</span>
            <span className="streak-count">🔥 {streak} days</span>
          </div>
        );
      })}
    </div>
  );
}

export default Streaks;
