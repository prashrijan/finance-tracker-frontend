import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const IncomeLineChart = ({ income }) => {
  console.log(income);

  // Use the `income` prop to generate data for the chart
  const data = {
    labels: "Income",
    datasets: [
      {
        label: "Income",
        data: [income],
        fill: true,
        backgroundColor: "rgba(75, 192, 132, 0.6)",
        borderColor: "rgba(75, 192, 132, 1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 132, 0.6)",
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Income Overview",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: "#fff",
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        callbacks: {
          label: (context) => `$${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          callback: (value) => `$${value}`,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeLineChart;
