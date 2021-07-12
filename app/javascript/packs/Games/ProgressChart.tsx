import React, { useRef, useEffect, useState } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

const ProgressChart = ({ times }: { times: number[] }): JSX.Element => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [chart, setChart] = useState<null | Chart>(null);
  useEffect(() => {
    if (canvasRef.current && !chart) {
      Chart.register(...registerables);
      const data = {
        labels: times,
        datasets: [
          {
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: times,
            lineTension: 0.4,
          },
        ],
      };
      const config: ChartConfiguration = {
        type: "line",
        data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };
      setChart(new Chart(canvasRef.current, config));
    }
  }, [canvasRef, chart, times]);
  useEffect(() => {
    if (chart) {
      chart.data.labels = times.map((time, i) => i + 1);
      chart.data.datasets.forEach((set) => {
        set.data = times.map((time) => parseFloat(time.toFixed(1)));
      });
      chart.update();
    }
  }, [times, chart]);
  return <canvas ref={canvasRef} width='300' height='200'></canvas>;
};

export default ProgressChart;
