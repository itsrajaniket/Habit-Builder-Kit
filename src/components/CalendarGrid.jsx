import React from "react";

function CalendarGrid({ date, habits, onToggleHabit }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Helper: Match date format (YYYY-MM-DD)
  const getIsoDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // Helper: Calculate daily stats for bottom rows
  const getDayStats = (day) => {
    const dateStr = getIsoDate(day);
    let completedCount = 0;

    habits.forEach((habit) => {
      if (habit.completedDates.includes(dateStr)) {
        completedCount++;
      }
    });

    const total = habits.length;
    const progress =
      total === 0 ? 0 : Math.round((completedCount / total) * 100);

    return { completedCount, progress, notDone: total - completedCount };
  };

  return (
    <div className="calendar-grid">
      <table className="calendar-table">
        <thead>
          <tr>
            <th
              style={{
                minWidth: "150px",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              My Habits
            </th>
            {/* Day Numbers Header */}
            {daysArray.map((day) => (
              <th key={day} style={{ minWidth: "35px" }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 1. HABIT ROWS */}
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td className="habit-name">
                {habit.emoji} {habit.name}
              </td>
              {daysArray.map((day) => {
                const dateStr = getIsoDate(day);
                const isChecked = habit.completedDates.includes(dateStr);
                return (
                  <td key={day}>
                    <div
                      className={`checkbox ${isChecked ? "checked" : ""}`}
                      onClick={() => onToggleHabit(habit.id, dateStr)}
                    ></div>
                  </td>
                );
              })}
            </tr>
          ))}

          {/* 2. SUMMARY ROWS (Progress, Done, Not Done) */}
          <tr className="summary-row">
            <td>Progress</td>
            {daysArray.map((day) => (
              <td key={day}>{getDayStats(day).progress}%</td>
            ))}
          </tr>
          <tr className="summary-row">
            <td>Done</td>
            {daysArray.map((day) => (
              <td key={day}>{getDayStats(day).completedCount}</td>
            ))}
          </tr>
          <tr className="summary-row">
            <td>Not Done</td>
            {daysArray.map((day) => (
              <td key={day}>{getDayStats(day).notDone}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalendarGrid;
