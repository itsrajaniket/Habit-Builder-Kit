import React from "react";

function Stats({ totalHabits, completedHabits, progressPercent, bestStreak }) {
  return (
    <div className="stats-horizontal">
      {/* 1. Number of Habits */}
      <div className="stat-item">
        <span className="stat-label">Number of Habits</span>
        <span className="stat-value">{totalHabits}</span>
      </div>

      {/* 2. Completed Habits */}
      <div className="stat-item">
        <span className="stat-label">Completed Habits</span>
        <span className="stat-value">{completedHabits}</span>
      </div>

      {/* 3. Visual Progress Bar */}
      <div className="stat-item progress-item">
        <span className="stat-label">Progress</span>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* 4. Percentage */}
      <div className="stat-item">
        <span className="stat-label">Progress in %</span>
        <span className="stat-value">{progressPercent}%</span>
      </div>

      {/* 5. Best Streak */}
      <div className="stat-item">
        <span className="stat-label">🔥 Best Streak</span>
        <span className="stat-value">{bestStreak} days</span>
      </div>
    </div>
  );
}

export default Stats;
