import React from 'react';
import { WelcomeBanner } from '../components/customer/dashboard/WelcomeBanner';
import { LearningStats } from '../components/customer/dashboard/LearningStats';
import { ActiveCourses } from '../components/customer/dashboard/ActiveCourses';
import { CourseLibrary } from '../components/customer/CourseLibrary';
import { ResourcesPanel } from '../components/customer/ResourcesPanel';
import { categories } from '../data/categories';

export function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeBanner />
        <LearningStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ActiveCourses />
            <CourseLibrary categories={categories} />
          </div>
          <div className="lg:col-span-1">
            <ResourcesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}