import React from "react";

function CalendarGrid({ date = new Date(), habits, onToggleHabit, viewMode }) {
  // Safety check
  if (!date) return null;

  // 1. GENERATE DATES
  let datesToShow = [];
  const today = new Date();

  const isToday = (d) => {
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  if (viewMode === "week") {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      datesToShow.push(d);
    }
  } else {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      datesToShow.push(new Date(year, month, d));
    }
  }

  const getIsoDate = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getDayStats = (dateObj) => {
    const dateStr = getIsoDate(dateObj);
    let completedCount = 0;
    habits.forEach((habit) => {
      if (habit.completedDates.includes(dateStr)) completedCount++;
    });
    const total = habits.length;
    const progress =
      total === 0 ? 0 : Math.round((completedCount / total) * 100);
    return { completedCount, progress };
  };

  const getHeaderLabel = (dateObj) => {
    const dayNum = dateObj.getDate();
    if (viewMode === "week") {
      const days = ["S", "M", "T", "W", "T", "F", "S"];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", opacity: 0.7, fontWeight: "500" }}>
            {days[dateObj.getDay()]}
          </span>
          <span style={{ fontSize: "12px", fontWeight: "700" }}>{dayNum}</span>
        </div>
      );
    }
    return (
      <span style={{ fontSize: "11px", fontWeight: "600" }}>{dayNum}</span>
    );
  };

  return (
    <div className="calendar-grid">
      <table
        className="calendar-table"
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "separate",
          borderSpacing: "0",
        }}
      >
        <thead>
          <tr>
            {/* INCREASED WIDTH from 140px to 220px */}
            <th
              className="sticky-col header-col"
              style={{
                width: "220px",
                minWidth: "220px",
                padding: "10px 15px",
              }}
            >
              My Habits
            </th>

            {datesToShow.map((d) => {
              const active = isToday(d);
              return (
                <th
                  key={d.toString()}
                  className={active ? "today-col-header" : ""}
                  style={{
                    textAlign: "center",
                    padding: "5px 0",
                    color: active
                      ? "var(--accent-cyan)"
                      : "var(--text-secondary)",
                    overflow: "hidden",
                  }}
                >
                  {getHeaderLabel(d)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id} className="habit-row">
              {/* INCREASED WIDTH here too + Added Title Tooltip */}
              <td
                className="sticky-col habit-name-cell"
                title={habit.name} // Shows full name on hover
                style={{
                  width: "220px",
                  minWidth: "220px",
                  maxWidth: "220px",
                  padding: "8px 15px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span style={{ marginRight: "8px", fontSize: "16px" }}>
                  {habit.emoji}
                </span>
                <span
                  className="habit-text"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {habit.name}
                </span>
              </td>

              {datesToShow.map((d) => {
                const dateStr = getIsoDate(d);
                const isChecked = habit.completedDates.includes(dateStr);
                const active = isToday(d);

                return (
                  <td
                    key={dateStr}
                    className={active ? "today-col-cell" : ""}
                    style={{
                      textAlign: "center",
                      padding: "0",
                      height: "36px",
                    }}
                  >
                    <div
                      className={`checkbox ${isChecked ? "checked" : ""}`}
                      onClick={() => onToggleHabit(habit.id, dateStr)}
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "5px",
                        margin: "0 auto",
                      }}
                    ></div>
                  </td>
                );
              })}
            </tr>
          ))}

          {/* SUMMARY ROW */}
          <tr className="summary-row">
            <td
              className="sticky-col"
              style={{
                paddingLeft: "15px",
                fontSize: "11px",
                fontWeight: "bold",
                color: "var(--text-secondary)",
              }}
            >
              Daily %
            </td>
            {datesToShow.map((d) => (
              <td
                key={d.toString()}
                style={{ textAlign: "center", padding: "5px 0" }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "var(--text-secondary)",
                    fontWeight: "600",
                  }}
                >
                  {getDayStats(d).progress}%
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CalendarGrid;
