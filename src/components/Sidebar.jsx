import React from "react";
import Analysis from "./Analysis";
import Streaks from "./Streaks"; // <--- IMPORTANT
import Badges from "./Badges"; // <--- IMPORTANT

function Sidebar({ habits, currentDate, onOpenAdd, onOpenRemove, bestStreak }) {
  return (
    <div className="analysis-section">
      {/* NEW: Streaks & Badges moved here */}
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

      <div className="action-buttons">
        <button className="add-habit-btn" onClick={onOpenAdd}>
          + Add Habit
        </button>
        <button className="remove-habit-btn" onClick={onOpenRemove}>
          − Remove
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
