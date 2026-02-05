import { useState, useEffect } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import ProgressChart from "../components/ProgressChart";
import MentalChart from "../components/MentalChart";
import MentalStateGrid from "../components/MentalStateGrid"; // <--- NEW IMPORT
import AddHabitModal from "../components/AddHabitModal";
import RemoveHabitModal from "../components/RemoveHabitModal";
import Analysis from "../components/Analysis";
import { calculateStreak } from "../utils/streaks";

const DEFAULT_HABITS = [
  { id: "1", name: "Wake up at 5:00", emoji: "⏰", completedDates: [] },
  { id: "2", name: "Gym / Exercise", emoji: "💪", completedDates: [] },
  { id: "3", name: "Reading / Learning", emoji: "📚", completedDates: [] },
  { id: "4", name: "Day Planning", emoji: "📝", completedDates: [] },
  { id: "5", name: "Budget Tracking", emoji: "💰", completedDates: [] },
  { id: "6", name: "Project Work", emoji: "🎯", completedDates: [] },
  { id: "7", name: "No Alcohol", emoji: "🚫", completedDates: [] },
  { id: "8", name: "Social Media Detox", emoji: "🌿", completedDates: [] },
  { id: "9", name: "Goal Journaling", emoji: "📓", completedDates: [] },
  { id: "10", name: "Cold Shower", emoji: "🚿", completedDates: [] },
  { id: "11", name: "Healthy Eating", emoji: "🥗", completedDates: [] },
  {
    id: "12",
    name: "Meditation / Mindfulness",
    emoji: "🧘",
    completedDates: [],
  },
  { id: "13", name: "Skill Development", emoji: "💻", completedDates: [] },
  { id: "14", name: "Networking", emoji: "🤝", completedDates: [] },
  { id: "15", name: "Sleep Discipline", emoji: "🌙", completedDates: [] },
  { id: "16", name: "Decluttering", emoji: "🧹", completedDates: [] },
  { id: "17", name: "Hydration", emoji: "💧", completedDates: [] },
];

function Dashboard({ currentUser, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);

  // --- DYNAMIC KEYS BASED ON USER ---
  // Matches the old app key exactly:
  const HABIT_KEY = `user_${currentUser}_habitTrackerData`;
  const MENTAL_KEY = `user_${currentUser}_mentalData`;

  // 1. Load Habits
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem(HABIT_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_HABITS;
  });

  // 2. Load Mental State
  const [mentalState, setMentalState] = useState(() => {
    const saved = localStorage.getItem(MENTAL_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // 3. Persistence Effects
  useEffect(() => {
    localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
  }, [habits, HABIT_KEY]);

  useEffect(() => {
    localStorage.setItem(MENTAL_KEY, JSON.stringify(mentalState));
  }, [mentalState, MENTAL_KEY]);

  // --- HANDLERS ---

  function addHabit(name, emoji = "🔥") {
    setHabits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        emoji,
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

  function updateMentalState(date, type, value) {
    setMentalState((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [type]: value,
      },
    }));
  }

  // Stats Calculations
  const totalHabits = habits.length;
  const completedHabits = habits.reduce(
    (sum, h) => sum + h.completedDates.length,
    0,
  );
  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => calculateStreak(h.completedDates)))
      : 0;
  const progressPercent =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / (totalHabits * 30)) * 100);

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light",
    );
  }

  return (
    <div className="container">
      <div className="header-top" style={{ justifyContent: "space-between" }}>
        <div style={{ fontSize: "14px", opacity: 0.7 }}>
          Welcome, <strong>{currentUser}</strong>
        </div>
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

      <div className="main-layout">
        <Calendar habits={habits} onToggleHabit={toggleHabitForDate} />

        <div className="analysis-section">
          <div className="analysis-title">Analysis</div>
          <Analysis
            habits={habits}
            daysInMonth={new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0,
            ).getDate()}
          />

          <ProgressChart habits={habits} />

          {/* NEW MENTAL GRID + CHART */}
          <MentalChart mentalState={mentalState} />
          <MentalStateGrid
            mentalState={mentalState}
            onUpdate={updateMentalState}
          />

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
