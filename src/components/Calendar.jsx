import CalendarGrid from "./CalendarGrid";

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
  viewMode,
}) {
  let title = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  if (viewMode === "week") {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
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

      {/* Streaks and Badges removed from here */}

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
