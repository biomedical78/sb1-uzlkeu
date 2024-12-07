import React from 'react';
import { BarChart } from 'lucide-react';

export function Analytics() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">Analytics Dashboard</h2>
      </div>
      <p className="text-gray-600">Analytics dashboard coming soon.</p>
    </div>
  );
}