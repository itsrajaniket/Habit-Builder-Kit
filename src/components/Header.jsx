import Stats from "./Stats";

function Header({
  totalHabits,
  completedHabits,
  progressPercent,
  bestStreak,
  onToggleTheme,
  viewMode, // NEW
  setViewMode, // NEW
}) {
  return (
    <div className="header">
      <div className="header-top">
        <h1>Habit Tracker Pro</h1>

        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            title="Toggle Dark Mode"
          >
            🌙
          </button>

          {/* Toggle Buttons Now Work */}
          <div className="calendar-view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === "month" ? "active" : ""}`}
              onClick={() => setViewMode("month")}
            >
              Month
            </button>
            <button
              className={`view-toggle-btn ${viewMode === "week" ? "active" : ""}`}
              onClick={() => setViewMode("week")}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <Stats
        totalHabits={totalHabits}
        completedHabits={completedHabits}
        progressPercent={progressPercent}
        bestStreak={bestStreak}
      />
    </div>
  );
}

export default Header;
