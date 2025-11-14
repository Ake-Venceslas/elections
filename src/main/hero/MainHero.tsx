"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaVoteYea, FaUserCheck, FaLock, FaChartBar } from "react-icons/fa";

const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
  .animate-slideUp { animation: slideUp 0.6s ease-out; }
  .animate-slideLeft { animation: slideLeft 0.6s ease-out; }
  .animate-slideRight { animation: slideRight 0.6s ease-out; }
  .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
  .animate-bounce-slow { animation: bounce 2s infinite; }
`;

export default function MainHero() {
  const router = useRouter();
  
  // Animation du mot coloré
  const colors = [
    "text-green-600",
    "text-red-600",
    "text-yellow-500",
    "text-indigo-700",
    "text-blue-600",
    "text-pink-600",
  ];
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIdx((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white text-gray-800">
      <style>{animationStyles}</style>
      {/* HERO */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-slideUp">
          Welcome to <span className={`${colors[colorIdx]} transition-colors duration-500`}>MboaVote</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 text-gray-700 leading-relaxed animate-slideUp" style={{animationDelay: "0.1s"}}>
          The most reliable, transparent, and modern platform for digital elections in Africa and beyond.
          Participate, vote, and make your voice count.
        </p>

        <div className="w-full max-w-4xl mx-auto animate-scaleIn" style={{animationDelay: "0.2s"}}>
          <Image
            src="/mboavote.jpg"
            alt="Voting process"
            width={700}
            height={400}
            className="rounded-xl sm:rounded-2xl shadow-lg mx-auto object-cover w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8 sm:mb-12 animate-slideUp">
          Why Choose MboaVote?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <div className="text-center bg-white shadow-md rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideUp" style={{animationDelay: "0.1s"}}>
            <FaUserCheck className="text-indigo-600 text-4xl sm:text-5xl mx-auto mb-3 sm:mb-4 animate-bounce-slow" />
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Simple Registration</h3>
            <p className="text-sm sm:text-base">Easily create your account and verify your identity in a few clicks.</p>
          </div>

          <div className="text-center bg-white shadow-md rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideUp" style={{animationDelay: "0.2s"}}>
            <FaLock className="text-green-600 text-4xl sm:text-5xl mx-auto mb-3 sm:mb-4 animate-bounce-slow" />
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Secure Voting</h3>
            <p className="text-sm sm:text-base">End-to-end encryption ensures total anonymity and vote integrity.</p>
          </div>

          <div className="text-center bg-white shadow-md rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideUp" style={{animationDelay: "0.3s"}}>
            <FaChartBar className="text-yellow-500 text-4xl sm:text-5xl mx-auto mb-3 sm:mb-4 animate-bounce-slow" />
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Real-Time Results</h3>
            <p className="text-sm sm:text-base">Track live statistics and election progress with full transparency.</p>
          </div>

          <div className="text-center bg-white shadow-md rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slideUp" style={{animationDelay: "0.4s"}}>
            <FaVoteYea className="text-red-600 text-4xl sm:text-5xl mx-auto mb-3 sm:mb-4 animate-bounce-slow" />
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Accessible Everywhere</h3>
            <p className="text-sm sm:text-base">Vote securely from any device — mobile, tablet, or computer.</p>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8 sm:mb-12 animate-slideUp">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-slideLeft">
            <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-base sm:text-lg">
              <li className="animate-slideUp" style={{animationDelay: "0.1s"}}>
                <strong>Create your voter account</strong> and verify your
                identity easily.
              </li>
              <li className="animate-slideUp" style={{animationDelay: "0.2s"}}>
                <strong>Explore candidate profiles</strong> and discover their
                programs and visions.
              </li>
              <li className="animate-slideUp" style={{animationDelay: "0.3s"}}>
                <strong>Cast your vote securely</strong> and anonymously from
                anywhere.
              </li>
              <li className="animate-slideUp" style={{animationDelay: "0.4s"}}>
                <strong>Follow live results</strong> and stay updated with real-time
                data.
              </li>
            </ol>
          </div>

          <div className="w-full animate-slideRight">
            <video
              src="/pinterest-video-59.mp4"
              poster="/howitworks.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg sm:rounded-2xl shadow-lg object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* SECTION TRANSPARENCE */}
      <section className="bg-indigo-600 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 animate-slideUp">Transparency at the Heart</h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed animate-slideUp" style={{animationDelay: "0.1s"}}>
          MboaVote is built to ensure fairness, credibility, and public trust in
          every election. From data encryption to real-time tracking, every step
          of the process is transparent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 p-4 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm animate-scaleIn" style={{animationDelay: "0.1s"}}>
            <video
              src="/data-encryption.mp4"
              poster="/Data Encryption.jpeg"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg mx-auto w-full h-auto object-cover"
            />
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold">Data Encryption</h3>
          </div>

          <div className="bg-white/10 p-4 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm animate-scaleIn" style={{animationDelay: "0.2s"}}>
            <video
              src="/Live Counting.mp4"
              poster="/livecount.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg mx-auto w-full h-auto object-cover"
            />
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold">Live Counting</h3>
          </div>

          <div className="bg-white/10 p-4 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm animate-scaleIn" style={{animationDelay: "0.3s"}}>
            <video
              src="/Audit.mp4"
              poster="/auditing.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg mx-auto w-full h-auto object-cover"
            />
            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold">Audit-Ready System</h3>
          </div>
        </div>
      </section>

            {/* SECTION IMPACT SOCIAL */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8 sm:mb-12 animate-slideUp">
          The Impact of MboaVote
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition animate-slideUp" style={{animationDelay: "0.1s"}}>
            <Image
              src="/Empowering.jpeg"
              alt="Community participation"
              width={400}
              height={250}
              className="rounded-lg mx-auto mb-3 sm:mb-4 object-cover w-full h-auto"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700">Empowering Communities</h3>
            <p className="text-sm sm:text-base">
              MboaVote strengthens democratic participation across regions,
              giving everyone a voice — from cities to remote villages.
            </p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition animate-slideUp" style={{animationDelay: "0.2s"}}>
            <Image
              src="/Inspiring Youth.jpeg"
              alt="Youth voting"
              width={400}
              height={250}
              className="rounded-lg mx-auto mb-3 sm:mb-4 object-cover w-full h-auto"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700">Inspiring Youth</h3>
            <p className="text-sm sm:text-base">
              By making digital voting accessible and intuitive, MboaVote motivates
              younger generations to participate in democratic life.
            </p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition animate-slideUp" style={{animationDelay: "0.3s"}}>
            <Image
              src="/Driving Innovation.jpg"
              alt="Innovation"
              width={400}
              height={250}
              className="rounded-lg mx-auto mb-3 sm:mb-4 object-cover w-full h-auto"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-700">Driving Innovation</h3>
            <p className="text-sm sm:text-base">
              Combining blockchain and modern web technologies, MboaVote redefines
              transparency and trust in online elections.
            </p>
          </div>
        </div>
      </section>


      {/* SECTION TECHNOLOGY */}
      <section className="py-16 bg-indigo-50 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-12 animate-slideUp">
    What Voters Are Saying
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {/* CARD 1 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scaleIn" style={{animationDelay: "0.1s"}}>
      {/* Top Color Section */}
      <div className="h-24 bg-teal-500"></div>

      {/* Content */}
      <div className="px-6 pb-6 relative -mt-12 text-center">
        <div className="w-24 h-24 mx-auto">
          <img
            src="/Kratos.jpeg"
            className="rounded-full border-4 border-white shadow-md object-cover w-full h-full"
            alt="User"
          />
        </div>

        {/* Bulle */}
        <div className="bg-indigo-900 text-white p-5 rounded-xl mt-4 relative">
          <p className="text-sm italic">
            A revolution for African democracy! I voted from my phone safely and instantly.
          </p>

          {/* Bubble arrow */}
          <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 
            w-0 h-0 border-x-8 border-x-transparent border-t-8 border-indigo-900">
          </div>
        </div>

        <h4 className="mt-6 font-semibold text-indigo-700 text-lg">Kratos D.</h4>
        <p className="text-gray-500 text-sm">Cameroon</p>

        {/* Stars */}
        <div className="flex justify-center mt-2 text-yellow-400 text-xl">
          ★★★★☆
        </div>

      </div>
    </div>

    {/* CARD 2 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scaleIn" style={{animationDelay: "0.2s"}}>
      <div className="h-24 bg-red-500"></div>

      <div className="px-6 pb-6 relative -mt-12 text-center">
        <div className="w-24 h-24 mx-auto">
          <img
            src="/Junior.jpeg"
            className="rounded-full border-4 border-white shadow-md object-cover w-full h-full"
            alt="User"
          />
        </div>

        <div className="bg-indigo-900 text-white p-5 rounded-xl mt-4 relative">
          <p className="text-sm italic">
            It&apos;s fast, transparent, and secure. I saw live results instantly!
          </p>

          <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 
            w-0 h-0 border-x-8 border-x-transparent border-t-8 border-indigo-900"></div>
        </div>

        <h4 className="mt-6 font-semibold text-indigo-700 text-lg">Junior D.</h4>
        <p className="text-gray-500 text-sm">Cameroon</p>

        <div className="flex justify-center mt-2 text-yellow-400 text-xl">
          ★★★★★
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scaleIn" style={{animationDelay: "0.3s"}}>
      <div className="h-24 bg-yellow-500"></div>

      <div className="px-6 pb-6 relative -mt-12 text-center">
        <div className="w-24 h-24 mx-auto">
          <img
            src="/Aicha.jpeg"
            className="rounded-full border-4 border-white shadow-md object-cover w-full h-full"
            alt="User"
          />
        </div>

        <div className="bg-indigo-900 text-white p-5 rounded-xl mt-4 relative">
          <p className="text-sm italic">
            An amazing platform that makes elections accessible to everyone.
          </p>

          <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 
            w-0 h-0 border-x-8 border-x-transparent border-t-8 border-indigo-900"></div>
        </div>

        <h4 className="mt-6 font-semibold text-indigo-700 text-lg">Aïcha B.</h4>
        <p className="text-gray-500 text-sm">Cameroon</p>

        <div className="flex justify-center mt-2 text-yellow-400 text-xl">
          ★★★★★
        </div>

      </div>
    </div>

  </div>
</section>



      {/* SECTION CALL TO ACTION */}
      <section className="py-12 sm:py-16 md:py-20 text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-indigo-50 to-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 mb-4 sm:mb-6 animate-slideUp">
          Ready to Vote for Change?
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-slideUp" style={{animationDelay: "0.1s"}}>
          Join thousands of voters already using MboaVote to make their voices
          heard. Register today and take part in shaping the future!
        </p>
        <button 
          onClick={() => router.push("/vote")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold transition hover:shadow-lg animate-slideUp cursor-pointer" 
          style={{animationDelay: "0.2s"}}
        >
          Get Started
        </button>
      </section>
    </main>
  );
}
