import { useState } from "react";
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

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  function changeMonth(direction) {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  }

  const monthName = MONTHS[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="calendar-section">
      {/* Month Header */}
      <div className="month-header">
        <h2 className="month-title">
          {monthName} {year}
        </h2>

        <div className="month-nav">
          <button onClick={() => changeMonth(-1)}>← Prev</button>
          <button onClick={() => changeMonth(1)}>Next →</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid date={currentDate} />
    </div>
  );
}

export default Calendar;
