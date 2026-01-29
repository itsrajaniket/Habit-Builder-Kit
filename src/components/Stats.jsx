function Stats({ totalHabits, completedHabits, progressPercent, bestStreak }) {
  return (
    <div className="stats-row">
      <div className="stat-item">
        <div className="stat-label">Number of Habits</div>
        <div className="stat-value">{totalHabits}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Completed Habits</div>
        <div className="stat-value">{completedHabits}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Progress</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-label">Progress in %</div>
        <div className="stat-value">{progressPercent}%</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">🔥 Best Streak</div>
        <div className="stat-value">{bestStreak} days</div>
      </div>
    </div>
  );
}

export default Stats;
