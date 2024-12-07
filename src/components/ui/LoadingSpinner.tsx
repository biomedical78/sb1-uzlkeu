import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-[spin_3s_linear_infinite]" />
        
        {/* Middle ring */}
        <div className="absolute inset-2 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]" />
        
        {/* Inner ring */}
        <div className="absolute inset-4 border-4 border-t-transparent border-r-indigo-400 border-b-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite]" />
      </div>
    </div>
  );
}