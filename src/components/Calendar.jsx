import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import Streaks from "./Streaks";
import Badges from "./Badges";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({ habits, onToggleHabit }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  function changeMonth(direction) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  }

  // Calculate best streak for the badges
  const bestStreak =
    habits.length > 0
      ? Math.max(
          ...habits.map((h) => {
            // specific streak logic or just count length for now
            return h.completedDates?.length || 0;
          }),
        )
      : 0;

  return (
    <div className="calendar-section">
      {/* 1. Header with Month Name and Buttons */}
      <div className="month-header">
        <h2 className="month-title">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <div className="month-nav">
          <button onClick={() => changeMonth(-1)}>← Prev</button>
          <button onClick={() => changeMonth(1)}>Next →</button>
        </div>
      </div>

      {/* 2. The Stats Section */}
      <div className="streaks-badges-section">
        <Streaks habits={habits} />
        <Badges bestStreak={bestStreak} />
      </div>

      {/* 3. The Table Grid (This was likely missing or disconnected) */}
      <div className="calendar-grid-container" style={{ overflowX: "auto" }}>
        <CalendarGrid
          date={currentDate}
          habits={habits}
          onToggleHabit={onToggleHabit}
        />
      </div>
    </div>
  );
}

export default Calendar;
