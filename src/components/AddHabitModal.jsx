import { useState } from "react";

function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitName, setHabitName] = useState("");

  if (!isOpen) return null;

  function handleAdd() {
    if (!habitName.trim()) return;
    onAdd(habitName);
    setHabitName("");
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Add New Habit</div>

        <div className="habit-input">
          <label>Habit Name</label>
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Morning Exercise"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabitModal;
