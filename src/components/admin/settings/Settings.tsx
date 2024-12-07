import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <SettingsIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">System Settings</h2>
      </div>
      <p className="text-gray-600">System settings configuration coming soon.</p>
    </div>
  );
}