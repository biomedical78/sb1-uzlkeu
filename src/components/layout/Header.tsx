import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">MedDevice Training</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          <Link to="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
        </nav>
      </div>
    </header>
  );
}