import { useState } from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";

function Dashboard({ onLogout }) {
  const [darkMode, setDarkMode] = useState(false);

  // Temporary static data (will be dynamic later)
  const totalHabits = 10;
  const completedHabits = 134;
  const progressPercent = 45;
  const bestStreak = 7;

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
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
    </div>
  );
}

export default Dashboard;
