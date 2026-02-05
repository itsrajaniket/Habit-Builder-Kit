import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function MentalChart({ mentalState, currentDate }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const labels = [];
    const moodData = [];
    const motivationData = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      labels.push(d);

      const entry = mentalState[dateStr] || {};
      moodData.push(entry.mood || 0);
      motivationData.push(entry.motivation || 0);
    }

    if (chartRef.current) chartRef.current.destroy();

    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Mood",
              data: moodData,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
              label: "Motivation",
              data: motivationData,
              backgroundColor: "rgba(255, 206, 86, 0.7)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min: 0, max: 10 },
            x: { grid: { display: false } },
          },
        },
      });
    }
    return () => {
      chartRef.current?.destroy();
    };
  }, [mentalState, currentDate]);

  return <canvas ref={canvasRef} style={{ height: "200px", width: "100%" }} />;
}

export default MentalChart;
