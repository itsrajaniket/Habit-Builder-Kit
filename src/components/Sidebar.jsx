import React from "react";
import Analysis from "./Analysis";
import Streaks from "./Streaks";
import Badges from "./Badges";

function Sidebar({ habits, currentDate, onOpenAdd, onOpenRemove, bestStreak }) {
  // Shared style object to ensure identical size
  const buttonStyle = {
    width: "140px", // EXACT WIDTH for both
    height: "45px", // EXACT HEIGHT for both
    borderRadius: "50px", // Pill shape
    fontSize: "14px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  };

  return (
    <>
      {/* 1. Sidebar Content (Analysis, etc.) */}
      <div className="analysis-section">
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Streaks habits={habits} />
          <Badges bestStreak={bestStreak} />
        </div>

        <h3>
          Analysis ({currentDate.toLocaleString("default", { month: "long" })})
        </h3>
        <Analysis habits={habits} currentDate={currentDate} />
      </div>

      {/* 2. Floating Action Buttons (Fixed Bottom-Right) */}
      <div
        className="floating-actions"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          display: "flex",
          gap: "12px", // Space between buttons
          zIndex: 9999, // Ensure it's on top of everything
        }}
      >
        {/* Remove Button (Red) */}
        <button
          onClick={onOpenRemove}
          style={{
            ...buttonStyle,
            background: "#ef4444", // Red
            color: "white",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          − Remove
        </button>

        {/* Add Button (Blue) */}
        <button
          onClick={onOpenAdd}
          style={{
            ...buttonStyle,
            background: "#3b82f6", // Blue
            color: "white",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          + Add Habit
        </button>
      </div>
    </>
  );
}

export default Sidebar;
