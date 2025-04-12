"use client"

import UploadForm from "@/components/UploadForm";
import { logout } from "./auth/signout/actions";
import MainDisplay from "@/components/MainDisplay";
import { UploadProvider } from "@/context/UploadContext";
import { useState } from 'react';



export default function Home() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const formData = new FormData();
    await logout(formData);
    setIsSigningOut(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-blue-300">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Smart Notes Toolkit</h1>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSignOut(); }} className="absolute top-4 right-4">
            <button
              type="submit"
              className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 flex items-center`}
              disabled={isSigningOut}
            >
              {isSigningOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing out...
                </>
              ) : (
                'Sign out'
              )}
            </button>
          </form>
          
          <UploadProvider>
            <div className="max-w-3xl mx-auto">
              <UploadForm />
              <MainDisplay />
            </div>
          </UploadProvider>
        </div>
      </div>
    </>
  );
}
