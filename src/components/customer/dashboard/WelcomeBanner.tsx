import React from 'react';
import { BookOpen, Star } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8">
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="h-8 w-8 text-blue-200" />
          <div className="flex items-center bg-white/10 rounded-full px-4 py-1">
            <Star className="h-4 w-4 text-yellow-300 mr-2" />
            <span className="text-sm text-white font-medium">Pro Member</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Learning Portal</h1>
        <p className="text-blue-100 max-w-xl">
          Continue your journey in medical device quality management. You're making excellent progress!
        </p>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/20 to-transparent" />
    </div>
  );
}