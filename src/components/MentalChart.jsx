import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function MentalChart({ mentalState }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // 1. Prepare Data for the last 7 days
    const labels = [];
    const moodData = [];
    const motivationData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));

      const entry = mentalState[dateStr] || {};
      moodData.push(entry.mood || 0);
      motivationData.push(entry.motivation || 0);
    }

    // 2. Destroy old chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // 3. Create new Chart
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Mood",
              data: moodData,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Motivation",
              data: motivationData,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { min: 0, max: 10 },
          },
        },
      });
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [mentalState]);

  return (
    <div className="chart-container mental-state">
      <div className="chart-title">Mental State (Last 7 Days)</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default MentalChart;
