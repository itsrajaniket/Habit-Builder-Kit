import React from "react";
import Analysis from "./Analysis";

function Sidebar({ habits, currentDate, onOpenAdd, onOpenRemove }) {
  return (
    <div className="analysis-section">
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
