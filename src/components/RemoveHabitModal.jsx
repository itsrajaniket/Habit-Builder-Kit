function RemoveHabitModal({ isOpen, habits, onRemove, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Remove Habit</div>

        <div className="habit-list">
          {habits.map((habit) => (
            <button
              key={habit.id}
              className="habit-remove-item"
              onClick={() => onRemove(habit.id)}
            >
              {habit.emoji} {habit.name}
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
