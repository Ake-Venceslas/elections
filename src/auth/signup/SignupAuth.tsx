"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // eye icons

// Route de redirection après succès
const REDIRECT_TO = "/mainpage";

export default function SignupAuth() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms and Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      // Appel à ton backend Express/MongoDB
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Sauvegarde du token (optionnel mais utile pour rester connecté)
      localStorage.setItem("token", data.token);

      // Redirection vers la page principale
      router.replace(REDIRECT_TO);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          Welcome!
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome to iVOTE's Online Voting System, please register as a voter to
          vote in your preferred candidate
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

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
              Create password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 text-indigo-500"
            />
            <span>
              I agree to LOCO's{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms and Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-2 rounded-lg hover:opacity-90"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
