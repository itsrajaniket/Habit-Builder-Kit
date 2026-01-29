import Stats from "./Stats";

function Header({
  totalHabits,
  completedHabits,
  progressPercent,
  bestStreak,
  onToggleTheme,
}) {
  return (
    <div className="header">
      <div className="header-top">
        <h1>Habit Tracker Pro</h1>

        <div className="header-controls">
          {/* Dark Mode Toggle */}
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            title="Toggle Dark Mode"
          >
            🌙
          </button>

          {/* Calendar View Toggle (UI only for now) */}
          <div className="calendar-view-toggle">
            <button className="view-toggle-btn active">Month</button>
            <button className="view-toggle-btn">Week</button>
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
