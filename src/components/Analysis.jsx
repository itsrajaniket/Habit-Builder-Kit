import React from "react";

function Analysis({ habits, currentDate }) {
  // Calculate days for the SELECTED month, not just "today"
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Helper: Filter completions to only count this specific month
  const getMonthCompletions = (habit) => {
    return habit.completedDates.filter((dateStr) => {
      const [y, m] = dateStr.split("-");
      return parseInt(y) === year && parseInt(m) === month + 1;
    }).length;
  };

  const sortedHabits = [...habits].sort(
    (a, b) => getMonthCompletions(b) - getMonthCompletions(a),
  );

  return (
    <div className="analysis-container">
      {sortedHabits.map((habit) => {
        const completed = getMonthCompletions(habit);
        const percent = Math.min(
          100,
          Math.round((completed / daysInMonth) * 100),
        );

        return (
          <div key={habit.id} className="analysis-item">
            <div className="analysis-label">Goal</div>
            <div className="analysis-value">{daysInMonth}</div>
            <div className="analysis-label" style={{ gridColumn: 1 }}>
              {habit.emoji} {completed}
            </div>
            <div className="analysis-bar" style={{ gridColumn: "2 / 4" }}>
              <div
                className="analysis-bar-fill"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Analysis;
