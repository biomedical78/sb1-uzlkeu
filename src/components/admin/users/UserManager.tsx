import React from 'react';
import { Users } from 'lucide-react';

export function UserManager() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">User Management</h2>
      </div>
      <p className="text-gray-600">User management functionality coming soon.</p>
    </div>
  );
}