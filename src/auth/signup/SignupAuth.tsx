
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isLoaded) return;

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Vous devez accepter les conditions d'utilisation");
      setIsLoading(false);
      return;
    }

    try {
      // intentional 2 second delay to match requested UX
      await new Promise((res) => setTimeout(res, 2000));
      // Start the sign-up process using the email as identifier
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        username: formData.username,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Redirect to verification page
      router.push('/email');
  } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
  const errorObj = err as { errors?: { longMessage?: string }[] };
  setError(errorObj.errors?.[0]?.longMessage || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
      >
        {/* Section Gauche - Image (déposez votre image dans `public/auth-left.jpg`) */}
        <div className="hidden lg:block relative w-full h-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
  <img
    src="/log.jpg"
    alt="Illustration MboaVote"
    className="object-cover w-full h-full"
    onError={(e) => {
      // fallback: keep gradient background if image missing
      const el = e.currentTarget as HTMLImageElement;
      el.style.display = 'none';
    }}
  />
</div>

        {/* Section Droite - Formulaire */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscription</h1>
            <p className="text-gray-600">Create an account to vote</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="User Name"
                required
              />
            </div>

            {/* Email */}
            <div>
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
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
              >
                {error}
              </motion.div>
            )}

            {/* CAPTCHA */}
            <div id="clerk-captcha" className="min-h-[78px] flex items-center justify-center border-2 border-gray-200 rounded-lg">
              {/* Le widget CAPTCHA de Clerk sera injecté ici automatiquement */}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-700 cursor-pointer">
                  I accept <span className="font-semibold">User Conditions</span> and <span className="font-semibold">Privacy Policy</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
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
                "REGISTER MY ACCOUNT"
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Dou you have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}