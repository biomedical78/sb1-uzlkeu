import React from 'react';
import { Settings, User } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="h-5 w-5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}