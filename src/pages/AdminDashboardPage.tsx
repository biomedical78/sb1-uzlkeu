import React from 'react';
import { AdminHeader } from '../components/admin/AdminHeader';
import { ContentDashboard } from '../components/admin/content/ContentDashboard';

export function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Create and manage your training content</p>
        </div>
        <ContentDashboard />
      </div>
    </div>
  );
}