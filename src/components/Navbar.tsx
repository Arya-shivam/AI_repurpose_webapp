import React from 'react';
import { Menu, LogIn, UserPlus, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onAuthClick: (mode: 'signin' | 'signup') => void;
}

export function Navbar({ onAuthClick }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <nav className="backdrop-blur-lg bg-gray-800/50 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-purple-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  ContentWizard
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => onAuthClick('signin')}
                  className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700/50 transition-colors flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}