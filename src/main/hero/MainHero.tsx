"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MainHero() {
  // Priorité : vert, rouge, jaune
  const colors = ["text-green-600", "text-red-600", "text-yellow-500", "text-indigo-700", "text-blue-600", "text-pink-600"];
  const [colorIdx, setColorIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((prev) => (prev + 1) % colors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to <span className={colors[colorIdx]}>MboaVote</span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-700">
        MboaVote is your secure and modern online voting platform. Participate in transparent elections, discover candidate profiles, and make your voice count in the democratic process.
      </p>
      <div className="max-w-xl mx-auto mb-8">
        <Image src="/Voting.jpg" alt="Voting" width={500} height={320} className="rounded-xl object-cover mx-auto" />
      </div>
      <div className="max-w-2xl mx-auto text-left text-gray-800 space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">Why choose MboaVote?</h2>
        <ul className="list-disc pl-6">
          <li>Simple and secure registration for all voters</li>
          <li>Access to detailed candidate information and their political parties</li>
          <li>Real-time results and transparent vote counting</li>
          <li>Support for all devices: mobile, tablet, and desktop</li>
        </ul>
        <h2 className="text-2xl font-bold text-indigo-600 mt-6 mb-2">How it works?</h2>
        <ol className="list-decimal pl-6">
          <li>Create your voter account and verify your identity</li>
          <li>Browse candidates and learn about their programs</li>
          <li>Vote securely and anonymously</li>
          <li>Follow the results live and share your experience</li>
        </ol>
      </div>
    </section>
  );
}