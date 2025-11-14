'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSignUp, useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { session } = useSession();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(599);
  const router = useRouter();

  // Redirection automatique si déjà connecté
  useEffect(() => {
    if (session) {
      router.push('/mainpage');
    }
  }, [session, router]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!isLoaded) {
      setError("Système non initialisé");
      setIsLoading(false);
      return;
    }

    try {
      // Tentative de vérification du code
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        // Mise à jour de la session
        await setActive({ session: result.createdSessionId });
        // Redirection vers la page principale
        router.push('/mainpage');
      } else {
        setError("Échec de la vérification. Statut: " + result.status);
      }
    } catch {
      console.error("Erreur de vérification");
      setError("Erreur inconnue lors de la vérification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setTimeLeft(599);
      setError('');
  } catch (err: unknown) {
      setError("Impossible d'envoyer un nouveau code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[480px]"
      >
        {/* Section Gauche - Image */}
        <div className="hidden lg:block relative w-full h-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
          <img
            src="/log.jpg"
            alt="Illustration MboaVote"
            className="object-cover w-full h-full"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
            }}
          />
        </div>

        {/* Section Droite - Formulaire de vérification */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 text-center">Verify your email</h1>
            <p className="text-gray-600 text-center mt-2">A 6-digit verification code has been sent to your email address.</p>
          </div>

          <form onSubmit={handleVerification} className="space-y-6">
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
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-3">
                Verification Code (6-digits)
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setCode(value.slice(0, 6));
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-xl tracking-widest font-mono"
                placeholder="123456"
                maxLength={6}
                pattern="[0-9]{6}"
                required
              />
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                The Code expires in {formatTime(timeLeft)}
              </p>

              <p className="text-center">
                You haven&apos;t receive code?{' '}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue-600 hover:text-blue-800 font-medium underline focus:outline-none"
                  disabled={timeLeft > 0}
                >
                  Resend
                </button>
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Vérification...
                </span>
              ) : (
                'VERIFY AND CONTINUE'
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}