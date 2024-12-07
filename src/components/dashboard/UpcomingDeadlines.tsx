import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const deadlines = [
  {
    title: 'Risk Management Quiz',
    date: '2024-03-25',
    timeLeft: '2 days',
    type: 'quiz'
  },
  {
    title: 'ISO 13485 Assignment',
    date: '2024-03-28',
    timeLeft: '5 days',
    type: 'assignment'
  }
];

export function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <div
            key={deadline.title}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900">{deadline.title}</h3>
              <p className="text-sm text-gray-500">Due {deadline.date}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              {deadline.timeLeft} left
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}