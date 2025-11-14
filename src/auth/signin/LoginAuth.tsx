"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.06,
      },
    },
  };

  const field = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.36 } },
  };

  const header = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
  };

  const errorVariant = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // No automatic redirect for signed-in users

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isLoaded) return;

    if (isSignedIn) {
      setError("Vous êtes déjà connecté. Veuillez vous déconnecter avant de vous reconnecter.");
      setIsLoading(false);
      return;
    }

    try {
      // Tentative de connexion
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === "needs_first_factor") {
        // L'utilisateur doit d'abord vérifier son email
        // Rediriger vers la page de vérification email
        router.push("/email");
      } else if (result.status === "complete") {
        // Si déjà vérifié et connexion réussie
        await setActive({ session: result.createdSessionId });
        router.push("/mainpage");
      } else {
        setError("Échec de la connexion. Statut: " + result.status);
      }
  } catch (err: unknown) {
      console.error("Erreur de connexion:", err);

      if (err && typeof err === "object") {
        const errorObj = err as { errors?: { message?: string }[]; message?: string };
        if (errorObj.errors && Array.isArray(errorObj.errors) && errorObj.errors.length > 0) {
          setError(errorObj.errors[0].message || "Erreur de connexion");
        } else if (errorObj.message) {
          setError(errorObj.message);
        } else {
          setError("Email ou mot de passe incorrect");
        }
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
      >
        {/* Left image column */}
        <div className="hidden lg:block relative w-full h-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
          <motion.img
            src="/log.jpg"
            alt="Illustration MboaVote"
            className="object-cover w-full h-full"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            whileHover={{ scale: 1.03, transition: { duration: 0.28 } }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Right form column */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <motion.div className="mb-8" variants={header} initial="hidden" animate="show">
            <motion.h1 className="text-3xl font-bold text-gray-900 mb-2">Nice to see you again</motion.h1>
            <motion.p className="text-gray-600">Log in to your MboaVote Account</motion.p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-5" variants={container} initial="hidden" animate="show">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  variants={errorVariant}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={field}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Adress
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="vote@gmail.com"
                required
              />
            </motion.div>

            <motion.div variants={field}>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={field} whileTap={{ scale: 0.995 }}>
              <motion.div className="flex items-center" whileTap={{ scale: 0.95 }}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </motion.div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                  Forgotten Password?
                </a>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              aria-live="polite"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Pending...
                </span>
              ) : (
                'LOGIN'
              )}
            </motion.button>
          </motion.form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              You do not have an account?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
