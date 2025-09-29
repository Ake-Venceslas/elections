"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (err: any) {
      console.error("Erreur de connexion:", err);

      if (err && typeof err === "object") {
        if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
          setError(err.errors[0].message || "Erreur de connexion");
        } else if (err.message) {
          setError(err.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white rounded-xl p-8">
            <div className="text-center mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">Content de vous revoir</h1>
              <p className="text-gray-600 mt-2">Connectez-vous à votre compte iVote</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 text-red-700 p-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Entrez votre adresse email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  'SE CONNECTER'
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas de compte?{' '}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
