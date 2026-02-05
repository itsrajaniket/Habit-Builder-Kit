import { useState } from "react";

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
  "🥗",
  "🍎",
  "🚴",
  "🏊",
  "🚫",
  "🍷",
  "🚭",
  "🧠",
];

function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitName, setHabitName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥");

  if (!isOpen) return null;

  function handleAdd() {
    if (!habitName.trim()) return;
    onAdd(habitName, selectedEmoji);
    setHabitName("");
    setSelectedEmoji("🔥");
    onClose();
  }

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div
        className="modal-content"
        style={{ width: "500px", maxWidth: "95%" }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "25px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Create New Habit
        </h2>

        {/* Name Input */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "var(--text-secondary)",
            }}
          >
            HABIT NAME
          </label>
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Read 10 pages"
            autoFocus
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-app)",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
          />
        </div>

        {/* Emoji Grid */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "var(--text-secondary)",
            }}
          >
            SELECT ICON
          </label>
          <div
            style={{
              display: "grid",
              // FIX: Auto-fit columns (min 50px) prevents overflow
              gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
              gap: "10px",
              background: "var(--bg-app)",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              // FIX: Added max-height and scroll to keep emojis inside
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                style={{
                  fontSize: "24px",
                  padding: "8px",
                  background:
                    selectedEmoji === emoji ? "var(--primary)" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform:
                    selectedEmoji === emoji ? "scale(1.1)" : "scale(1)",
                  color: selectedEmoji === emoji ? "white" : "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  aspectRatio: "1 / 1", // Keeps buttons square
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div
          className="button-group"
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              background: "transparent",
              cursor: "pointer",
              fontWeight: "600",
              color: "var(--text-secondary)",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            style={{
              padding: "12px 30px",
              borderRadius: "8px",
              border: "none",
              background: "var(--primary)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            Create Habit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabitModal;
