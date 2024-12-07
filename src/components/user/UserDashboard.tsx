import React from 'react';
import { WelcomeBanner } from './dashboard/WelcomeBanner';
import { LearningProgress } from './dashboard/LearningProgress';
import { RecommendedCourses } from './dashboard/RecommendedCourses';
import { ActiveCourses } from './dashboard/ActiveCourses';

export function UserDashboard() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <LearningProgress />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActiveCourses />
          <RecommendedCourses />
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
            <div className="space-y-2">
              <a 
                href="https://netorgft10740913-my.sharepoint.com/:f:/g/personal/m_alsaadi_shcqms_com/EnBDDa_Znv5HlNZZPvvEOpEBq4vNOXdVHdDSZw78Xq-rlg"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Training Materials Library
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}