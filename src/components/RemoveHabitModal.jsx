function RemoveHabitModal({ isOpen, habits, onRemove, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Remove Habit</div>

        <div className="habit-list">
          {habits.length === 0 && <p>No habits to remove.</p>}

          {habits.map((habit, index) => (
            <button
              key={index}
              className="habit-remove-item"
              onClick={() => onRemove(index)}
            >
              {habit}
            </button>
          ))}
        </div>

        <div className="button-group">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveHabitModal;
