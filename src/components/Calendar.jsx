import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import Streaks from "./Streaks.jsx";
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

  // ✅ calculate best streak here
  const bestStreak = Math.max(...habits.map((h) => h.completedDates.length), 0);

  return (
    <div className="calendar-section">
      {/* 🔹 MONTH HEADER */}
      <div className="month-header">
        <h2 className="month-title">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <div className="month-nav">
          <button onClick={() => changeMonth(-1)}>← Prev</button>
          <button onClick={() => changeMonth(1)}>Next →</button>
        </div>
      </div>

      {/* ✅ BELOW MONTH HEADER (THIS IS WHAT YOU ASKED) */}
      <Streaks habits={habits} />
      <Badges bestStreak={bestStreak} />

      {/* 🔹 CALENDAR GRID */}
      <CalendarGrid
        date={currentDate}
        habits={habits}
        onToggleHabit={onToggleHabit}
      />
    </div>
  );
}

export default Calendar;
