"use client";

import { useEffect, useState } from "react";
import { useVotingStore } from "@/store/VotingStore";
import { useUser } from '@clerk/nextjs';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import dayjs from "dayjs";

const MainDashboard = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { candidates, totalVoters, totalVotes, totalCandidates, resetVotes } = useVotingStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prepare chart data and options
  const chartData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.votes),
        backgroundColor: "rgba(34,197,94,0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Live Voting Results" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6 text-left">
        <button
          onClick={() => (window.location.href = "/mainpage")}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold text-base hover:bg-gray-300 transition"
        >
          Return
        </button>
      </div>
      {/* Greeting */}
      <h1 className="text-2xl font-bold">
        Hello, <span className="text-green-600">{user?.firstName || user?.username || "Utilisateur"}</span>!
      </h1>
      <p className="text-gray-600">Welcome to MboaVote Online Voting System</p>

      {/* Calendar */}
      <div className="bg-white shadow p-4 rounded-lg w-fit">
        <h2 className="font-semibold mb-2">Calendar</h2>
        <p className="text-lg font-bold">{currentDate.format("MMMM DD, YYYY")}</p>
      </div>

      {/* Live Results */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="font-semibold mb-4">Live Results</h2>
        <Bar key={candidates.map((c) => c.votes).join("-")} data={chartData} options={chartOptions} />
      </div>

      {/* Voting Process */}
      <div className="bg-white shadow p-4 rounded-lg space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{totalVoters}</p>
          <p className="text-gray-500">Total number of registered voters</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{totalVotes}</p>
          <p className="text-gray-500">Total number of votes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{totalCandidates}</p>
          <p className="text-gray-500">Total number of registered candidates</p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;