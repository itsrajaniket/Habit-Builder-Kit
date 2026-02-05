import { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import ProgressChart from "../components/ProgressChart";
import MentalChart from "../components/MentalChart";
import MentalStateGrid from "../components/MentalStateGrid";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // 1. NEW STATE: View Mode ('month' or 'week')
  const [viewMode, setViewMode] = useState("month");

  const [currentDate, setCurrentDate] = useState(new Date());

  const HABIT_KEY = `user_${currentUser}_habitTrackerData`;
  const MENTAL_KEY = `user_${currentUser}_mentalData`;

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem(HABIT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : parsed.habits || DEFAULT_HABITS;
      } catch (e) {
        return DEFAULT_HABITS;
      }
    }
    return DEFAULT_HABITS;
  });

  const [mentalState, setMentalState] = useState(() => {
    const saved = localStorage.getItem(MENTAL_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
  }, [habits, HABIT_KEY]);

  useEffect(() => {
    localStorage.setItem(MENTAL_KEY, JSON.stringify(mentalState));
  }, [mentalState, MENTAL_KEY]);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function changeMonth(direction) {
    const newDate = new Date(currentDate);
    // If in week mode, jump by 7 days, else jump by 1 month
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  }

  function addHabit(name, emoji) {
    const newHabit = {
      id: Date.now().toString(),
      name,
      emoji,
      completedDates: [],
    };
    setHabits([...habits, newHabit]);
  }

  function toggleHabitForDate(habitId, dateStr) {
    setHabits(
      habits.map((h) => {
        if (h.id === habitId) {
          const exists = h.completedDates.includes(dateStr);
          return {
            ...h,
            completedDates: exists
              ? h.completedDates.filter((d) => d !== dateStr)
              : [...h.completedDates, dateStr],
          };
        }
        return h;
      }),
    );
  }

  function removeHabit(habitId) {
    if (confirm("Are you sure you want to remove this habit?")) {
      setHabits(habits.filter((h) => h.id !== habitId));
      setShowRemoveModal(false);
    }
  }

  function updateMentalState(date, type, value) {
    setMentalState((prev) => ({
      ...prev,
      [date]: { ...prev[date], [type]: value },
    }));
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  const totalHabits = habits.length;
  const completedHabits = habits.reduce(
    (acc, h) => acc + h.completedDates.length,
    0,
  );
  const totalPossible = totalHabits * 30;
  const progressPercent =
    totalPossible === 0
      ? 0
      : Math.round((completedHabits / totalPossible) * 100);

  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => calculateStreak(h.completedDates)))
      : 0;

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ opacity: 0.7 }}>
          User: <strong>{currentUser}</strong>
        </div>
        <button
          className="btn-remove"
          onClick={onLogout}
          style={{ padding: "5px 10px", fontSize: "12px" }}
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
        viewMode={viewMode} // <--- Pass Mode
        setViewMode={setViewMode} // <--- Pass Setter
      />

      <div className="main-layout">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: 0,
          }}
        >
          <Calendar
            habits={habits}
            onToggleHabit={toggleHabitForDate}
            currentDate={currentDate}
            onChangeMonth={changeMonth}
            bestStreak={bestStreak}
            viewMode={viewMode} // <--- Pass Mode to Calendar
          />

          <div
            style={{
              background: "var(--color-surface)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Daily Progress</h3>
            <div className="chart-container">
              <ProgressChart habits={habits} currentDate={currentDate} />
            </div>
          </div>

          <div
            style={{
              background: "var(--color-surface)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <MentalStateGrid
              mentalState={mentalState}
              onUpdate={updateMentalState}
              currentDate={currentDate}
            />
          </div>

          <div
            style={{
              background: "var(--color-surface)",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Mental State Trends</h3>
            <div className="chart-container">
              <MentalChart
                mentalState={mentalState}
                currentDate={currentDate}
              />
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <h3>Analysis</h3>
          <Analysis habits={habits} currentDate={currentDate} />

          {/* New CSS Classes applied here */}
          <div className="action-buttons">
            <button
              className="add-habit-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add Habit
            </button>
            <button
              className="remove-habit-btn"
              onClick={() => setShowRemoveModal(true)}
            >
              − Remove
            </button>
          </div>
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
