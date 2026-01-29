function CalendarGrid({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="calendar-grid">
      <table className="calendar-table">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map(
            (_, rowIndex) => (
              <tr key={rowIndex}>
                {days.slice(rowIndex * 7, rowIndex * 7 + 7).map((day, idx) => (
                  <td key={idx} className={day ? "calendar-day" : "empty"}>
                    {day}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CalendarGrid;
