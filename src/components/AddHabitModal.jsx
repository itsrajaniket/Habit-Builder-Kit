import { useState } from "react";

// Matches the emojis from your original project style
const EMOJIS = [
  "🔥",
  "💧",
  "📚",
  "🏋️",
  "🧘",
  "😴",
  "🥦",
  "🗓️",
  "💻",
  "🎸",
  "🎨",
  "🧹",
  "💊",
  "💵",
  "⚙️",
  "🎓",
];

function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥"); // Default

  if (!isOpen) return null;

  function handleAdd() {
    if (!habitName.trim()) return;
    onAdd(habitName, selectedEmoji); // Pass the emoji too

    // Reset form
    setHabitName("");
    setSelectedEmoji("🔥");
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">Add New Habit</div>

        {/* Name Input */}
        <div className="habit-input">
          <label>Habit Name</label>
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Morning Exercise"
            autoFocus
          />
        </div>

        {/* Emoji Grid (Restored Feature) */}
        <div className="habit-input">
          <label>Choose Emoji</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                style={{
                  fontSize: "20px",
                  padding: "8px",
                  background:
                    selectedEmoji === emoji
                      ? "var(--color-success)"
                      : "var(--color-bg)",
                  border:
                    selectedEmoji === emoji
                      ? "2px solid white"
                      : "1px solid var(--color-border)",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: selectedEmoji === emoji ? "white" : "inherit",
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
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
