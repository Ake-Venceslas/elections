"use client";

import { useEffect, useState } from "react";
import { useVotingStore } from "@/store/VotingStore";
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
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainDashboard = () => {
  const { userName, candidates, totalVoters, totalVotes, totalCandidates, voteForCandidate } =
    useVotingStore();

  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs());
    }, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  const chartData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((c) => c.votes),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "President Student Council" },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Greeting */}
      <h1 className="text-2xl font-bold">
        Hello, <span className="text-blue-600">{userName}</span>!
      </h1>
      <p className="text-gray-600">Welcome to IVOTE Online Voting System</p>

      {/* Calendar */}
      <div className="bg-white shadow p-4 rounded-lg w-fit">
        <h2 className="font-semibold mb-2">Calendar</h2>
        <p className="text-lg font-bold">{currentDate.format("MMMM DD, YYYY")}</p>
      </div>

      {/* Live Results */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="font-semibold mb-4">Live Results</h2>
        <Bar data={chartData} options={chartOptions} />
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

      {/* Test button */}
      <button
        onClick={() => voteForCandidate("c2")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Simulate Vote for Candidate 2
      </button>
    </div>
  );
};

export default MainDashboard;