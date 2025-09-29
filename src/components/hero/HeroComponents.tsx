"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroComponent() {
  return (
    <section className="bg-white">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-3">
            <span className="text-indigo-500">MboaVote</span> Online Voting System
          </h1>
          <p className="text-gray-600 mb-6">
            Let’s make voting and elections easy for you. This is designed to ensure a secured voting session.
          </p>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md transition cursor-pointer"
            onClick={() => window.location.href = '/register'}
          >
            Register as a Voter
          </button>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="/Voting.jpg"
            alt="Voting Illustration"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-white">
        <div className="bg-indigo-300 p-6">
          <h3 className="font-bold text-lg">Step 1:</h3>
          <p className="font-semibold">SIGN UP</p>
          <p className="text-sm mb-4">Create an account on this system to vote</p>
          <button className="bg-white text-indigo-600 px-4 py-1 rounded-full text-sm cursor-pointer">
            Register as a Voter
          </button>
        </div>
        <div className="bg-indigo-500 p-6">
          <h3 className="font-bold text-lg">Step 2:</h3>
          <p className="font-semibold">VOTE</p>
          <p className="text-sm">Vote for your preferred candidate</p>
        </div>
        <div className="bg-indigo-700 p-6">
          <h3 className="font-bold text-lg">Step 3:</h3>
          <p className="font-semibold">VIEW ELECTION RESULTS</p>
          <p className="text-sm">View election results of various candidate</p>
        </div>
      </div>

      {/* Middle Text */}
      <div className="text-center py-10 px-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Make your decision-making process more modern, safe, and efficient.
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Upgrade from manual ballot counting to an online election system without jeopardizing the integrity of your vote.
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-white py-10 px-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Our Features</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-8">
          We provide an online voting system that exceeds expectations, from secure polling software to the management of complex virtual voting events.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <div>
            <div className="bg-indigo-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              🔒
            </div>
            <h3 className="font-bold mt-4">Secured Platform</h3>
            <p className="text-gray-500 text-sm">
              With our system, your data is secured.
            </p>
          </div>
          {/* Feature 2 */}
          <div>
            <div className="bg-indigo-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              📱
            </div>
            <h3 className="font-bold mt-4">Vote Online</h3>
            <p className="text-gray-500 text-sm">
              In just a few clicks, you can vote for your preferred candidates.
            </p>
          </div>
          {/* Feature 3 */}
          <div>
            <div className="bg-indigo-100 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              ⏱
            </div>
            <h3 className="font-bold mt-4">Real Time Results</h3>
            <p className="text-gray-500 text-sm">
              View real time voting results and scores of each candidate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}