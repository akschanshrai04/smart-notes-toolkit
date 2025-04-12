"use client";

import { useState, useTransition } from 'react';
import { login, signup } from './actions';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<'login' | 'signup' | null>(null);
  
  const handleSubmit = async (action: 'login' | 'signup') => {
    setActiveAction(action);
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 7000)
    );
  
    const authPromise = action === 'login' ? login(formData) : signup(formData);
  
    try {
      await Promise.race([authPromise, timeoutPromise]);
  
      if (action === 'login') {
        toast.success("Logged in successfully!");
      } else {
        toast.success("Confirmation email sent. Please check your inbox.");
      }
      window.location.href = "/";
    } catch (error: any) {
      const message =
        error?.message === "Request timed out"
          ? "⏱️ Request timed out. Please try again."
          : error?.message || "Something went wrong.";
      toast.error(message);
    }
  
    setIsLoading(false);
    setActiveAction(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Smart Notes Toolkit</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              aria-describedby="email-description"
            />
            <p id="email-description" className="text-xs text-gray-500 dark:text-gray-400">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              aria-describedby="password-description"
            />
            <p id="password-description" className="text-xs text-gray-500 dark:text-gray-400">
              Password must be at least 8 characters long.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 flex justify-center items-center"
              onClick={() => handleSubmit('login')}
              disabled={isLoading || isPending}
              aria-live="polite"
            >
              {isLoading && activeAction === 'login' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Log in"}
            </button>

            <button
              type="button"
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70 flex justify-center items-center"
              onClick={() => handleSubmit('signup')}
              disabled={isLoading || isPending}
              aria-live="polite"
            >
              {isLoading && activeAction === 'signup' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing up...
                </>
              ) : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
