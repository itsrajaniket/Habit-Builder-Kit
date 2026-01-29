import { useState } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import ProgressChart from "../components/ProgressChart";
import MentalChart from "../components/MentalChart";
import AddHabitModal from "../components/AddHabitModal";
import RemoveHabitModal from "../components/RemoveHabitModal";

function Dashboard({ onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [habits, setHabits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const totalHabits = habits.length;
  const completedHabits = 0;
  const progressPercent = totalHabits ? 45 : 0;
  const bestStreak = 7;

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  }

  function addHabit(name) {
    setHabits([...habits, name]);
  }

  function removeHabit(index) {
    setHabits(habits.filter((_, i) => i !== index));
    setShowRemoveModal(false);
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <button className="btn-logout" onClick={onLogout}>
        Logout
      </button>

      <Header
        totalHabits={totalHabits}
        completedHabits={completedHabits}
        progressPercent={progressPercent}
        bestStreak={bestStreak}
        onToggleTheme={toggleTheme}
      />

      <Calendar />
      <ProgressChart />
      <MentalChart />

      {/* Floating Buttons */}
      <button className="add-habit-btn" onClick={() => setShowAddModal(true)}>
        +
      </button>

      <button
        className="remove-habit-btn"
        onClick={() => setShowRemoveModal(true)}
      >
        −
      </button>

      {/* Modals */}
      <AddHabitModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addHabit}
      />

      <RemoveHabitModal
        isOpen={showRemoveModal}
        habits={habits}
        onRemove={removeHabit}
        onClose={() => setShowRemoveModal(false)}
      />
    </div>
  );
}

export default Dashboard;
