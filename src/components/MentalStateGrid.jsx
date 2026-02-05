import React from "react";

function MentalStateGrid({ mentalState, onUpdate }) {
  // Generate last 7 days for the grid columns
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]); // YYYY-MM-DD
  }

  function handleCellClick(date, type) {
    // 1. Trigger Native Browser Prompt
    const value = prompt(`Enter ${type} rating for ${date} (1-10):`);

    // 2. Validate input
    if (value === null) return; // User cancelled
    const num = parseInt(value);

    if (isNaN(num) || num < 1 || num > 10) {
      alert("Please enter a number between 1 and 10");
      return;
    }

    // 3. Send data back to Dashboard
    onUpdate(date, type.toLowerCase(), num);
  }

  return (
    <div className="calendar-section" style={{ marginTop: "20px" }}>
      <h3
        className="month-title"
        style={{ fontSize: "18px", marginBottom: "10px" }}
      >
        Mental State Log
      </h3>
      <div className="calendar-grid">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Type</th>
              {dates.map((date) => (
                <th key={date} style={{ fontSize: "10px" }}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["Mood", "Motivation"].map((type) => (
              <tr key={type}>
                <td style={{ fontWeight: "bold", padding: "5px" }}>{type}</td>
                {dates.map((date) => {
                  // Get existing value if any
                  const entry = mentalState[date] || {};
                  const val = entry[type.toLowerCase()] || "-";

                  return (
                    <td
                      key={date}
                      className="calendar-cell"
                      style={{
                        cursor: "pointer",
                        background: val !== "-" ? "#e8f5e9" : "transparent",
                      }}
                      onClick={() => handleCellClick(date, type)}
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
