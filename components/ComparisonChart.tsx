"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonChart({ greedy, brute }: any) {
  const data = {
    labels: ["Greedy", "Brute Force"],
    datasets: [
      {
        label: "Distance (km)",
        data: [greedy, brute],
        backgroundColor: ["#22c55e", "#ef4444"], // green vs red
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // text white
        },
      },
      title: {
        display: true,
        text: "Algorithm Comparison",
        color: "#ffffff",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#444",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700">
      <Bar data={data} options={options} />
    </div>
  );
}