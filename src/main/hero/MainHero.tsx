"use client";

export default function MainHero() {
  return (
    <section className="bg-blue-600 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to iVOTE
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
        Discover, search, and connect with the best candidates for your mission.
      </p>
      <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  );
}