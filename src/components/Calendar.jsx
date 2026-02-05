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

function Calendar({
  habits,
  onToggleHabit,
  currentDate,
  onChangeMonth,
  bestStreak,
  viewMode,
}) {
  // Format the title depending on Month or Week view
  let title = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  if (viewMode === "week") {
    // Basic week logic: Show "Week of [Date]"
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Go to Sunday
    title = `Week of ${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()}`;
  }

  return (
    <div className="calendar-section">
      <div className="month-header">
        <h2 className="month-title">{title}</h2>

        <div className="month-nav">
          <button onClick={() => onChangeMonth(-1)}>← Prev</button>
          <button onClick={() => onChangeMonth(1)}>Next →</button>
        </div>
      </div>

      <div className="streaks-badges-section">
        <Streaks habits={habits} />
        <Badges bestStreak={bestStreak} />
      </div>

      <div className="calendar-grid-container" style={{ overflowX: "auto" }}>
        <CalendarGrid
          date={currentDate}
          habits={habits}
          onToggleHabit={onToggleHabit}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}

export default Calendar;
