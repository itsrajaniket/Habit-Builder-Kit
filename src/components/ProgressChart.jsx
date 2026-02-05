import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function ProgressChart({ habits }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // 1. Calculate Data for the last 7 days
    const labels = [];
    const dataPoints = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      // Label (e.g., "Mon")
      labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));

      // Count completions for this day
      let count = 0;
      habits.forEach((habit) => {
        if (habit.completedDates.includes(dateStr)) count++;
      });

      // Calculate percentage for that day
      const percentage = habits.length > 0 ? (count / habits.length) * 100 : 0;
      dataPoints.push(percentage);
    }

    // 2. Destroy old chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // 3. Create new Chart
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
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
        },
      });
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [habits]); // Re-run when habits change

  return (
    <div className="chart-container">
      <div className="chart-title">Last 7 Days Progress</div>
      <div style={{ height: "200px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default ProgressChart;
