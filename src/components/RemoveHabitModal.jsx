import React from "react";

function RemoveHabitModal({ isOpen, habits, onRemove, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content" style={{ width: "350px" }}>
        <div className="modal-header" style={{ marginBottom: "15px" }}>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Manage Habits</h2>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              marginTop: "5px",
            }}
          >
            Click the cross to delete a habit permanently.
          </p>
        </div>

        <div
          className="habit-list"
          style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "5px" }}
        >
          {habits.length === 0 ? (
            <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
              No habits to remove.
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="habit-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "var(--bg-app)",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  border: "1px solid var(--border-color)",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {habit.emoji} {habit.name}
                </span>

                {/* The new Cross Button */}
                <button
                  onClick={() => onRemove(habit.id)}
                  title="Delete Habit"
                  style={{
                    background: "transparent",
                    color: "var(--text-secondary)",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "50%",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "var(--danger)";
                    e.currentTarget.style.background = "#fee2e2";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        <div
          className="button-group"
          style={{ marginTop: "20px", textAlign: "right" }}
        >
          <button
            className="btn"
            onClick={onClose}
            style={{
              padding: "8px 20px",
              background: "var(--bg-app)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Done
          </button>
        </div>
      </div>{" "}
      // make my aniket
    </div>
  );
}

export default RemoveHabitModal;
