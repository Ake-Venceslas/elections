"use client";

import React from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string; // chemin vers ton image locale
}

const teamMembers: TeamMember[] = [
  {
    name: "Roderick Pastor",
    role: "President",
    image: "/images/roderick.jpg", // remplace par ton chemin réel
  },
  {
    name: "Pierce Norman Belloso",
    role: "Vice President",
    image: "/images/pierce.jpg",
  },
  {
    name: "Sarita Cara Lagrmay",
    role: "Elections Director",
    image: "/images/sarita.jpg",
  },
  {
    name: "Reginald Dantes",
    role: "IT Director",
    image: "/images/reginald.jpg",
  },
];

export default function AboutComponents() {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto text-center">
      {/* Titre */}
      <h2 className="text-3xl font-bold mb-2">ABOUT US</h2>
      <p className="text-xl font-semibold text-blue-700 mb-1">
        iVOTE is an Online Voting System that is used to gather instant and trustworthy results
      </p>
      <p className="text-gray-600 mb-12">
        We aim to make the voting and elections easy, seamless and fair.
      </p>

      {/* Équipe */}
      <h3 className="text-lg font-medium mb-6">Management Team</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center border border-gray-200"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 object-cover rounded-full mb-4"
            />
            <h4 className="font-semibold">{member.name}</h4>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="text-left max-w-4xl mx-auto mb-8">
        <h4 className="font-bold text-lg mb-2">Our Mission:</h4>
        <p className="text-gray-700 leading-relaxed">
          To provide a secure and convenient way for citizens to cast their ballots in public elections. 
          The system will enable citizens to cast their votes without having to leave their homes or wait in line at polling stations. 
          It will also provide an audit trail for each vote to ensure its accuracy and integrity. 
          The system will be designed to be secure, reliable, and user-friendly. 
          In addition, the system will ensure that all votes are counted accurately and securely.
        </p>
      </div>

      {/* Strengths */}
      <div className="text-left max-w-4xl mx-auto">
        <h4 className="font-bold text-lg mb-2">Our Strengths</h4>
        <ul className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            <strong>Increased Voter Turnout:</strong> The system can increase voter turnout by making it easier for voters to cast their ballots from any location. This can make voting more convenient and allow more people to participate in the democratic process.
          </li>
          <li>
            <strong>Accurate Results:</strong> With this system, the results are instantly tallied and can be verified more quickly and accurately than with traditional paper-based methods.
          </li>
          <li>
            <strong>Cost Effective:</strong> The system can be less expensive than traditional paper-based voting because it requires fewer resources to set up and maintain.
          </li>
          <li>
            <strong>Secure:</strong> The system is highly secure and can use encryption and other security measures to ensure that votes are counted accurately and securely.
          </li>
        </ul>
      </div>
    </section>
  );
}