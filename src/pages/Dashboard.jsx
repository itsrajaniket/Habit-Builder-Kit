import { useState, useEffect } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import ProgressChart from "../components/ProgressChart";
import MentalChart from "../components/MentalChart";
import AddHabitModal from "../components/AddHabitModal";
import RemoveHabitModal from "../components/RemoveHabitModal";
import { calculateStreak } from "../utils/streaks";

function Dashboard({ onLogout }) {
  const [darkMode, setDarkMode] = useState(false);

  // 1. Load Data from LocalStorage
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habitData");
    return saved ? JSON.parse(saved) : [];
  });

  const [mentalState, setMentalState] = useState({}); // You can add persistence here later if needed

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // 2. Save Data whenever 'habits' changes
  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(habits));
  }, [habits]);

  function addHabit(name) {
    setHabits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        emoji: "🔥", // Default emoji
        completedDates: [],
      },
    ]);
  }

  function removeHabit(id) {
    if (confirm("Are you sure? This cannot be undone.")) {
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setShowRemoveModal(false);
    }
  }

  function toggleHabitForDate(habitId, dateStr) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(dateStr)
                ? habit.completedDates.filter((d) => d !== dateStr)
                : [...habit.completedDates, dateStr],
            }
          : habit,
      ),
    );
  }

  // Stats Calculations
  const totalHabits = habits.length;
  const completedHabits = habits.reduce(
    (sum, h) => sum + h.completedDates.length,
    0,
  );

  // Calculate best streak using your utility
  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => calculateStreak(h.completedDates)))
      : 0;

  const progressPercent =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / (totalHabits * 30)) * 100); // Rough estimate for monthly view

  function toggleTheme() {
    setDarkMode(!darkMode);
    // This toggles the data-theme attribute which your CSS looks for
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light",
    );
  }

  return (
    <div className="container">
      <div className="header-top">
        {/* Simple wrapper to position logout button if not in Header */}
        <button
          className="btn-logout"
          onClick={onLogout}
          style={{ marginBottom: "10px" }}
        >
          Logout
        </button>
      </div>

      <Header
        totalHabits={totalHabits}
        completedHabits={completedHabits}
        progressPercent={progressPercent}
        bestStreak={bestStreak}
        onToggleTheme={toggleTheme}
      />

      {/* Main Layout Grid */}
      <div className="main-layout">
        <Calendar habits={habits} onToggleHabit={toggleHabitForDate} />

        {/* Sidebar Analysis */}
        <div className="analysis-section">
          <ProgressChart habits={habits} />
          <MentalChart />

          {/* Floating Buttons */}
          <button
            className="add-habit-btn"
            onClick={() => setShowAddModal(true)}
          >
            +
          </button>
          <button
            className="remove-habit-btn"
            onClick={() => setShowRemoveModal(true)}
          >
            −
          </button>
        </div>
      </div>

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
