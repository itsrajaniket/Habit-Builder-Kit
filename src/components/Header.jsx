import React from "react";
import Stats from "./Stats";

function Header({
  currentUser,
  totalHabits,
  completedHabits,
  progressPercent,
  bestStreak,
  onToggleTheme,
  onLogout,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="header-card">
      {/* TOP ROW: Title, User, Controls */}
      <div className="header-top-row">
        <div className="header-brand">
          <h1>Habit Tracker Pro</h1>
          {/* User Badge - Light Green with Wave Emoji */}
          <span className="user-badge">👋 {currentUser}</span>
        </div>

        <div className="header-controls">
          <button
            className="theme-btn"
            onClick={onToggleTheme}
            title="Toggle Theme"
          >
            🌙
          </button>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
            >
              Month
            </button>
            <button
              className={`toggle-btn ${viewMode === "week" ? "active" : ""}`}
              onClick={() => setViewMode("week")}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: The Horizontal Stats */}
      <div className="header-stats-row">
        <Stats
          totalHabits={totalHabits}
          completedHabits={completedHabits}
          progressPercent={progressPercent}
          bestStreak={bestStreak}
        />
      </div>
    </div>
  );
}

export default Header;
