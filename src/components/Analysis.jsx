function Analysis({ habits, daysInMonth }) {
  // Sort habits by completion count (highest first)
  const sortedHabits = [...habits].sort(
    (a, b) => b.completedDates.length - a.completedDates.length,
  );

  return (
    <div className="analysis-container">
      {sortedHabits.map((habit) => {
        const completed = habit.completedDates.length;
        const percent = Math.min(
          100,
          Math.round((completed / daysInMonth) * 100),
        );

        return (
          <div key={habit.id} className="analysis-item">
            {/* Goal Label */}
            <div className="analysis-label">Goal</div>
            <div className="analysis-value">{daysInMonth}</div>

            {/* Actual Count */}
            <div className="analysis-label" style={{ gridColumn: 1 }}>
              {completed}
            </div>

            {/* Green Progress Bar */}
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
