import React from 'react';
import { BookOpen, Award, Download, MessageSquare } from 'lucide-react';

const actions = [
  { icon: BookOpen, label: 'Resume Course', color: 'bg-blue-500' },
  { icon: Award, label: 'Certificates', color: 'bg-green-500' },
  { icon: Download, label: 'Resources', color: 'bg-purple-500' },
  { icon: MessageSquare, label: 'Community', color: 'bg-amber-500' }
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map(({ icon: Icon, label, color }) => (
        <button
          key={label}
          className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`p-3 ${color} rounded-lg text-white mb-2`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
}