import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function ProgressChart({ habits, currentDate }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Use passed currentDate
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const labels = [];
    const dataPoints = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      labels.push(d);

      let count = 0;
      habits.forEach((habit) => {
        if (habit.completedDates.includes(dateStr)) count++;
      });

      const percentage = habits.length > 0 ? (count / habits.length) * 100 : 0;
      dataPoints.push(percentage);
    }

    if (chartRef.current) chartRef.current.destroy();

    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Daily Completion %",
              data: dataPoints,
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              tension: 0.2,
              fill: true,
              pointRadius: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100 },
            x: { grid: { display: false } },
          },
        },
      });
    }
    return () => {
      chartRef.current?.destroy();
    };
  }, [habits, currentDate]); // Re-run when date changes

  return <canvas ref={canvasRef} style={{ height: "200px", width: "100%" }} />;
}

export default ProgressChart;
