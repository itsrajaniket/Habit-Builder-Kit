import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function MentalChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "Mood",
            data: [3, 4, 2, 5, 4],
          },
          {
            label: "Motivation",
            data: [4, 3, 5, 4, 5],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="chart-container mental-state">
      <div className="chart-title">Mental State</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default MentalChart;
