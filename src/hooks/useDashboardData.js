import { useState, useEffect } from "react";
import { calculateStreak } from "../utils/streaks";

const DEFAULT_HABITS = [
  { id: "1", name: "Wake up at 5:00", emoji: "⏰", completedDates: [] },
  { id: "2", name: "Gym / Exercise", emoji: "💪", completedDates: [] },
  { id: "3", name: "Reading / Learning", emoji: "📚", completedDates: [] },
  { id: "4", name: "Budget Tracking", emoji: "💰", completedDates: [] },
  { id: "5", name: "Project Work", emoji: "🎯", completedDates: [] },
  { id: "6", name: "No Alcohol", emoji: "🚫", completedDates: [] },
  { id: "7", name: "Social Media Detox", emoji: "🌿", completedDates: [] },
  { id: "8", name: "Cold Shower", emoji: "🚿", completedDates: [] },
  { id: "9", name: "Healthy Eating", emoji: "🥗", completedDates: [] },
  { id: "10", name: "Meditation", emoji: "🧘", completedDates: [] },
  { id: "11", name: "Skill Development", emoji: "💻", completedDates: [] },
  { id: "12", name: "Networking", emoji: "🤝", completedDates: [] },
  { id: "13", name: "Sleep Discipline", emoji: "🌙", completedDates: [] },
  { id: "14", name: "Hydration", emoji: "💧", completedDates: [] },
];

export function useDashboardData(currentUser) {
  // --- STATE ---
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Data Keys (Unique per user)
  const HABIT_KEY = `user_${currentUser}_habitTrackerData`;
  const MENTAL_KEY = `user_${currentUser}_mentalData`;

  // --- LOAD DATA ---
  const [habits, setHabits] = useState(() => {
    // 1. Try to get saved data for THIS user
    const saved = localStorage.getItem(HABIT_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Handle potential old data formats
        return Array.isArray(parsed) ? parsed : parsed.habits || DEFAULT_HABITS;
      } catch (e) {
        // If error, fall back to defaults
        return DEFAULT_HABITS;
      }
    }

    // 2. If NO saved data (First Time User), return the Starter Pack
    return DEFAULT_HABITS;
  });

  const [mentalState, setMentalState] = useState(() => {
    const saved = localStorage.getItem(MENTAL_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // --- EFFECTS (Auto-Save) ---
  useEffect(() => {
    localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
  }, [habits, HABIT_KEY]);

  useEffect(() => {
    localStorage.setItem(MENTAL_KEY, JSON.stringify(mentalState));
  }, [mentalState, MENTAL_KEY]);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // --- ACTIONS ---
  function changeMonth(direction) {
    const newDate = new Date(currentDate);
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
            ...h, // made by aniket
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

  // --- CALCULATED STATS ---
  const totalHabits = habits.length;
  const completedHabits = habits.reduce(
    (acc, h) => acc + h.completedDates.length,
    0,
  );

  // Simple calculation: Total Habits * 30 days (approximation for progress bar)
  const totalPossible = totalHabits * 30;
  const progressPercent =
    totalPossible === 0
      ? 0
      : Math.round((completedHabits / totalPossible) * 100);

  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => calculateStreak(h.completedDates)))
      : 0;

  return {
    habits,
    mentalState,
    currentDate,
    viewMode,
    setViewMode,
    darkMode,
    toggleTheme: () => setDarkMode(!darkMode),
    showAddModal,
    setShowAddModal,
    showRemoveModal,
    setShowRemoveModal,
    changeMonth,
    addHabit,
    toggleHabitForDate,
    removeHabit,
    updateMentalState,
    stats: { totalHabits, completedHabits, progressPercent, bestStreak },
  };
}
