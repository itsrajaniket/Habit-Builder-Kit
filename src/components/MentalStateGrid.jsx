import React from "react";

function MentalStateGrid({ mentalState, onUpdate, currentDate }) {
  // Use PASSED currentDate instead of new Date()
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
    <div className="calendar-section" style={{ marginTop: "0" }}>
      <h3
        className="month-title"
        style={{ fontSize: "18px", marginBottom: "10px" }}
      >
        Mental State Log
      </h3>
      <div className="calendar-grid" style={{ overflowX: "auto" }}>
        <table className="calendar-table" style={{ minWidth: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  minWidth: "100px",
                  position: "sticky",
                  left: 0,
                  background: "var(--color-surface)",
                  zIndex: 1,
                }}
              >
                Type
              </th>
              {dates.map((item) => (
                <th
                  key={item.dateStr}
                  style={{
                    minWidth: "30px",
                    fontSize: "10px",
                    textAlign: "center",
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
                    fontWeight: "bold",
                    padding: "5px",
                    position: "sticky",
                    left: 0,
                    background: "var(--color-surface)",
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
                            ? "var(--color-success-light)"
                            : "transparent",
                        textAlign: "center",
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
