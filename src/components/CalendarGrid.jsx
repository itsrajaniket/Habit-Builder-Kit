function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}`;
}

function CalendarGrid({ date, habits, onToggleHabit }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: Math.ceil(cells.length / 7) }).map((_, row) => (
          <tr key={row}>
            {cells.slice(row * 7, row * 7 + 7).map((day, idx) => {
              if (!day) return <td key={idx} />;

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
      </tbody>
    </table>
  );
}

export default CalendarGrid;
