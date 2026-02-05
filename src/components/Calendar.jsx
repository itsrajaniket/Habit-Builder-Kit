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

// Added 'bestStreak' to props
function Calendar({
  habits,
  onToggleHabit,
  currentDate,
  onChangeMonth,
  bestStreak,
}) {
  return (
    <div className="calendar-section">
      {/* 1. Month Header */}
      <div className="month-header">
        <h2 className="month-title">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <div className="month-nav">
          <button onClick={() => onChangeMonth(-1)}>← Prev</button>
          <button onClick={() => onChangeMonth(1)}>Next →</button>
        </div>
      </div>

      {/* 2. Stats Section: Now using the correct data from Dashboard */}
      <div className="streaks-badges-section">
        <Streaks habits={habits} />
        <Badges bestStreak={bestStreak} />
      </div>

      {/* 3. Grid Section */}
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
