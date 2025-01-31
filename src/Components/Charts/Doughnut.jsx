import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["rgba(75, 192, 132, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 132, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2,
        hoverPffset: 20,
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Adjust aspect ratio
    plugins: {
      title: {
        display: true,
        text: "Income vs Expense", // Add a title
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
        color: "#9CA3AF",
      },
      legend: {
        position: "bottom", // Position the legend at the bottom
        labels: {
          font: {
            size: 14,
          },
          padding: 20, // Add padding to legend labels
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Customize tooltip background
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
    },
    animation: {
      animateScale: true, // Add scale animation
      animateRotate: true, // Add rotate animation
    },
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
