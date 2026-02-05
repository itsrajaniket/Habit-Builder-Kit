import React from "react";

function CalendarGrid({ date, habits, onToggleHabit, viewMode }) {
  // 1. GENERATE DATES TO SHOW
  let datesToShow = [];

  if (viewMode === "week") {
    // --- WEEK VIEW ---
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Go to Sunday

    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      datesToShow.push(d);
    }
  } else {
    // --- MONTH VIEW ---
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      datesToShow.push(new Date(year, month, d));
    }
  }

  // Helper to format date key (YYYY-MM-DD)
  const getIsoDate = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Helper for bottom stats
  const getDayStats = (dateObj) => {
    const dateStr = getIsoDate(dateObj);
    let completedCount = 0;
    habits.forEach((habit) => {
      if (habit.completedDates.includes(dateStr)) completedCount++;
    });
    const total = habits.length;
    const progress =
      total === 0 ? 0 : Math.round((completedCount / total) * 100);
    return { completedCount, progress, notDone: total - completedCount };
  };

  // Helper for Header Label
  const getHeaderLabel = (dateObj) => {
    const dayNum = dateObj.getDate();
    if (viewMode === "week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", textTransform: "uppercase" }}>
            {days[dateObj.getDay()]}
          </span>
          <span style={{ fontSize: "14px" }}>{dayNum}</span>
        </div>
      );
    }
    return dayNum;
  };

  return (
    <div className="calendar-grid">
      <table
        className="calendar-table"
        style={{
          width: "100%",
          // FIX: Use 'fixed' layout for month view so columns split space evenly
          tableLayout: viewMode === "month" ? "fixed" : "auto",
        }}
      >
        <thead>
          <tr>
            {/* Habit Name Column: Fixed Width so it doesn't get squished */}
            <th
              style={{
                width: "220px",
                textAlign: "left",
                paddingLeft: "15px",
                zIndex: 10,
              }}
            >
              My Habits
            </th>

            {/* Date Columns */}
            {datesToShow.map((d) => (
              <th
                key={d.toString()}
                style={{
                  // FIX: Removed "35px" minWidth for month view.
                  // Week view keeps 60px to look spacious.
                  minWidth: viewMode === "week" ? "60px" : "auto",
                  padding: "5px 0",
                  textAlign: "center",
                }}
              >
                {getHeaderLabel(d)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* HABIT ROWS */}
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td
                className="habit-name"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {habit.emoji} {habit.name}
              </td>
              {datesToShow.map((d) => {
                const dateStr = getIsoDate(d);
                const isChecked = habit.completedDates.includes(dateStr);
                return (
                  <td
                    key={dateStr}
                    style={{ textAlign: "center", padding: "0" }}
                  >
                    {/* Centered Checkbox */}
                    <div
                      className={`checkbox ${isChecked ? "checked" : ""}`}
                      onClick={() => onToggleHabit(habit.id, dateStr)}
                      style={{ margin: "0 auto" }} // Forces center alignment
                    ></div>
                  </td>
                );
              })}
            </tr>
          ))}

          {/* SUMMARY ROWS */}
          <tr className="summary-row">
            <td style={{ paddingLeft: "15px" }}>Progress</td>
            {datesToShow.map((d) => (
              <td
                key={d.toString()}
                style={{ fontSize: "11px", textAlign: "center" }}
              >
                {getDayStats(d).progress}%
              </td>
            ))}
          </tr>
          <tr className="summary-row">
            <td style={{ paddingLeft: "15px" }}>Done</td>
            {datesToShow.map((d) => (
              <td key={d.toString()} style={{ textAlign: "center" }}>
                {getDayStats(d).completedCount}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalendarGrid;
