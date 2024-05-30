import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale, // Add this line
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale, // Add this line
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ appointmentsByYear }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Monthly Appointments",
        data: appointmentsByYear,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
