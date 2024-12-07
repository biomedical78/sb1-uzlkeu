import React from 'react';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { LearningProgress } from '../components/dashboard/LearningProgress';
import { CategoryGrid } from '../components/dashboard/CategoryGrid';
import { PricingBanner } from '../components/pricing/PricingBanner';
import { QuickActions } from '../components/dashboard/QuickActions';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';
import { AchievementWidget } from '../components/dashboard/AchievementWidget';
import { categories } from '../data/categories';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader 
          title="Learning Dashboard"
          description="Track your progress and explore comprehensive training modules"
        />

        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <LearningProgress 
              courseName="Quality Management Systems Fundamentals"
              progress={45}
              lastLesson="Documentation Requirements"
              timeRemaining="2.5 hours"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Training Categories</h2>
            <CategoryGrid categories={categories} />
          </div>
          <div className="space-y-8">
            <AchievementWidget />
            <UpcomingDeadlines />
          </div>
        </div>

        <div className="mt-12">
          <PricingBanner />
        </div>
      </div>
    </div>
  );
}