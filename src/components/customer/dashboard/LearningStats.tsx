import React from 'react';
import { Clock, Award, Target, BookOpen } from 'lucide-react';

const stats = [
  { icon: Clock, label: 'Learning Time', value: '24h', subtext: 'This month' },
  { icon: Award, label: 'Certificates', value: '3', subtext: 'Earned' },
  { icon: Target, label: 'Course Progress', value: '78%', subtext: 'Average' },
  { icon: BookOpen, label: 'Active Courses', value: '4', subtext: 'In progress' },
];

export function LearningStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ icon: Icon, label, value, subtext }) => (
        <div key={label} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{subtext}</p>
            </div>
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
}