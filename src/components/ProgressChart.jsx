import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function ProgressChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Daily Progress",
            data: [30, 40, 45, 60, 70, 80, 90],
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="chart-container">
      <div className="chart-title">Daily Progress</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ProgressChart;
