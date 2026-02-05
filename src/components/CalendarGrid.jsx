function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function CalendarGrid({ date, habits, onToggleHabit }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Calendar Logic
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array for the grid cells (padding nulls + actual days)
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  // Helper to calculate daily stats
  function getDailyStats(day) {
    if (!day) return { done: 0, notDone: 0, progress: 0 };
    const dateStr = formatDate(year, month, day);
    let doneCount = 0;

    habits.forEach((habit) => {
      if (habit.completedDates.includes(dateStr)) doneCount++;
    });

    return {
      done: doneCount,
      notDone: habits.length - doneCount,
      progress:
        habits.length > 0 ? Math.round((doneCount / habits.length) * 100) : 0,
    };
  }

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          {/* Day Names Header */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* --- MAIN CALENDAR BODY --- */}
        {Array.from({ length: Math.ceil(cells.length / 7) }).map((_, row) => (
          <tr key={row}>
            {cells.slice(row * 7, row * 7 + 7).map((day, idx) => {
              if (!day) return <td key={idx} />; // Empty cell

              const dateStr = formatDate(year, month, day);

              return (
                <td key={idx} className="calendar-cell">
                  <div className="day-number">{day}</div>
                  <div className="day-habits">
                    {habits.map((habit) => {
                      const completed = habit.completedDates.includes(dateStr);
                      return (
                        <span
                          key={habit.id}
                          className={`habit-dot ${completed ? "done" : ""}`}
                          title={habit.name}
                          onClick={() => onToggleHabit(habit.id, dateStr)}
                        >
                          {habit.emoji}
                        </span>
                      );
                    })}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}

        {/* --- SUMMARY ROWS (Matches Screenshot) --- */}

        {/* 1. Progress % Row */}
        <tr className="summary-row">
          <td
            colSpan={7}
            style={{
              textAlign: "left",
              padding: "5px",
              fontWeight: "bold",
              background: "#eee",
            }}
          >
            Daily Progress
          </td>
        </tr>
        <tr>
          {/* We iterate over the LAST 7 days or fit them into the grid structure. 
               However, usually summary rows match the columns. 
               Since the grid is 7 columns wide but month days vary, 
               Summary rows usually work best in a "List View". 
               
               For this Grid View, let's render a simple summary for the VISIBLE days in the last row 
               or just a global summary row if simpler.
               
               Actually, looking at your screenshot, the summary is at the bottom of the "Week View".
               If this is Month view, we usually don't show daily summary per column because columns are weekdays, not specific dates.
               
               **FIX:** I will add a row that shows average stats for the week columns if possible, 
               or we hide it for month view if it looks messy.
           */}
        </tr>
      </tbody>
    </table>
  );
}

export default CalendarGrid;
