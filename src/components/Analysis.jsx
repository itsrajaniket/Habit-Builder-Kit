import React from "react";

function Analysis({ habits, daysInMonth }) {
  // Sort habits by completion count (highest first)
  const sortedHabits = [...habits].sort(
    (a, b) => b.completedDates.length - a.completedDates.length,
  );

  return (
    <div className="analysis-container">
      {sortedHabits.map((habit) => {
        const completed = habit.completedDates.length;
        // Calculate percentage capped at 100%
        const percent = Math.min(
          100,
          Math.round((completed / daysInMonth) * 100),
        );

        return (
          <div key={habit.id} className="analysis-item">
            {/* Row 1: Goal Label and Goal Value */}
            <div className="analysis-label">Goal</div>
            <div className="analysis-value">{daysInMonth}</div>

            {/* Row 2: Actual Count (Left) */}
            <div className="analysis-label" style={{ gridColumn: 1 }}>
              {completed}
            </div>

            {/* Row 2: Green Progress Bar (Spans rest) */}
            <div className="analysis-bar" style={{ gridColumn: "2 / 4" }}>
              <div
                className="analysis-bar-fill"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
      {habits.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic", fontSize: "12px" }}>
          No habits added yet.
        </div>
      )}
    </div>
  );
}

export default Analysis;
