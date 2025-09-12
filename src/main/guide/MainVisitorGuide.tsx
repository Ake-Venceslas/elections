"use client";

const VisitorsGuideline = () => {
  const guidelines = [
    "Before voting, take the time to research the candidates and issues on the ballot.",
    "Make sure you are eligible to vote in this election.",
    "Make sure you understand the voting procedure for the online voting system.",
    "Read the instructions carefully before voting.",
    "Make sure you understand the candidates and their positions on the issues.",
    "Choose your candidate carefully.",
    "If you are unsure of how to vote, ask a friend or relative for help.",
    "Double-check your choices before submitting your votes.",
    "Make sure you have a secure connection when voting.",
    "Keep your vote private. Do not share your vote with anyone.",
    "Make sure you understand the deadlines for the election.",
    "Follow the voting guidelines set by your local election office.",
    "Report any problems or concerns you have about the voting process.",
    "Thank you for participating in democracy!",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-8">VOTERS GUIDELINE</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Guidelines List */}
        <div className="space-y-5">
          {guidelines.map((item, index) => (
            <div key={index} className="flex items-start">
              {/* Number Circle */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-4">
                {index + 1}
              </div>
              {/* Guideline Text */}
              <p className="text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/voting-illustration.png" // Replace with actual image path
            alt="Voting Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-gray-600 text-sm">
        <p>For More Information</p>
        <p>Please contact: luca@email.com</p>
      </div>
    </div>
  );
};

export default VisitorsGuideline;