import React from "react";

function MentalStateGrid({ mentalState, onUpdate, currentDate }) {
  // Use PASSED currentDate
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    dates.push({ dayNum: d, dateStr });
  }

  function handleCellClick(date, type) {
    const value = prompt(`Enter ${type} rating for ${date} (1-10):`);
    if (value === null) return;
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 10) {
      alert("Please enter a number between 1 and 10");
      return;
    }
    onUpdate(date, type.toLowerCase(), num);
  }

  return (
    <div
      className="calendar-section"
      style={{ marginTop: "0", padding: "20px" }}
    >
      <h3
        className="month-title"
        style={{ fontSize: "18px", marginBottom: "15px" }}
      >
        Mental State Log
      </h3>

      {/* REMOVED: overflowX: "auto" */}
      <div className="calendar-grid">
        <table
          className="calendar-table"
          style={{
            width: "100%",
            minWidth: "100%",
            tableLayout: "fixed", // <--- Forces columns to fit inside
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: "100px", // Fixed width for the Label column
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                }}
              >
                Type
              </th>
              {dates.map((item) => (
                <th
                  key={item.dateStr}
                  style={{
                    // REMOVED: minWidth: "30px"
                    fontSize: "10px",
                    textAlign: "center",
                    padding: "5px 0",
                    overflow: "hidden", // Ensures no spillover
                  }}
                >
                  {item.dayNum}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["Mood", "Motivation"].map((type) => (
              <tr key={type}>
                <td
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    paddingLeft: "10px",
                    color: "var(--text-primary)",
                  }}
                >
                  {type}
                </td>
                {dates.map((item) => {
                  const entry = mentalState[item.dateStr] || {};
                  const val = entry[type.toLowerCase()] || "-";
                  return (
                    <td
                      key={item.dateStr}
                      className="calendar-cell"
                      style={{
                        cursor: "pointer",
                        background:
                          val !== "-"
                            ? "rgba(16, 185, 129, 0.2)" // Light Green tint
                            : "transparent",
                        color: val !== "-" ? "#10b981" : "inherit",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
                        padding: "6px 0", // Tighter padding
                        borderLeft: "1px solid rgba(255,255,255,0.05)",
                      }}
                      onClick={() => handleCellClick(item.dateStr, type)}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MentalStateGrid;
