"use client";

import React, { useState } from "react";

export default function LoginAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Stocker le token JWT
      localStorage.setItem("token", data.token);

      alert("✅ Login successful");

      // Rediriger vers dashboard
      window.location.href = "/mainpage";
    } catch (error) {
      console.error(error);
      alert("An error occurred, try again later");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 relative overflow-hidden">
        {/* Background stripes */}
        <div className="absolute inset-0 flex justify-between -z-10">
          <div className="w-1/5 bg-gradient-to-b from-indigo-800 to-indigo-400"></div>
          <div className="w-1/5 bg-gradient-to-b from-indigo-600 to-indigo-300"></div>
          <div className="w-1/5 bg-gradient-to-b from-indigo-500 to-indigo-200"></div>
          <div className="w-1/5 bg-gradient-to-b from-indigo-400 to-indigo-200"></div>
          <div className="w-1/5 bg-gradient-to-b from-indigo-800 to-indigo-400"></div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-indigo-700">iVOTE</span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back to iVOTE's Online Voting System, please log in to vote in
          your preferred candidate
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-indigo-500"
              />
              Remember Password
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-2 rounded-lg hover:opacity-90"
          >
            LOGIN
          </button>
        </form>

        {/* Admin & Register Links */}
        <div className="mt-4 text-center text-sm">
          <a href="#" className="text-indigo-600 hover:underline">
            Sign in as an Admin
          </a>
          <p className="mt-1">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}