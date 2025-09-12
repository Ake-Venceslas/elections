"use client";

import React from "react";

const faqs = [
  {
    id: 1,
    question: "How can I be sure that my vote and information are safe on this platform?",
    answer:
      "Your vote and personal information are secured on this platform because the system is built on the highest security protocols and standards. It also utilizes the latest encryption technology to ensure data security and privacy. Additionally, the system is designed to prevent any attempts to tamper with, alter or manipulate the voting process.",
  },
  {
    id: 2,
    question: "How long does it take for my vote to be counted?",
    answer:
      "This is an online voting system that speeds up the ballot counting process and counts votes instantly after they are cast in favor of their preferred candidate.",
  },
  {
    id: 3,
    question: "How can I receive election date reminders?",
    answer:
      "The system will provide reminders about upcoming election dates directly to the user. These reminders can be sent via email and dashboard. This online voting system will provide a calendar view of all upcoming elections, which can be accessed directly from the system.",
  },
  {
    id: 4,
    question: "Would my vote be kept private and secure?",
    answer:
      "Yes, your vote will be kept secret and secured on the online voting system. The system is designed to protect the integrity of the vote and ensure that the results are accurate and untampered with.",
  },
];

export const FaqComponents: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-4">
        <span className="text-blue-400 text-6xl font-extrabold">FAQ</span>
        <span className="text-lg font-semibold">Frequently Asked Questions</span>
      </h2>

      <div className="space-y-8">
        {faqs.map(({ id, question, answer }) => (
          <div key={id} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center">
              {id}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{question}</h3>
              <p className="text-gray-600">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};