function RemoveHabitModal({ isOpen, habits, onRemove, onClose }) {
  if (!isOpen) return null;

  return (
    // ADDED: style={{ display: "flex" }} to override CSS
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">Remove Habit</div>

        <div
          className="habit-list"
          style={{ maxHeight: "300px", overflowY: "auto" }}
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
                  padding: "10px",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span className="habit-item-name">
                  {habit.emoji} {habit.name}
                </span>
                <button
                  className="btn-remove"
                  onClick={() => onRemove(habit.id)}
                  style={{
                    background: "var(--color-danger)",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="button-group" style={{ marginTop: "20px" }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveHabitModal;
