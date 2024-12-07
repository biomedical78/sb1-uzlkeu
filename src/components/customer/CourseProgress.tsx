import React from 'react';
import { BookOpen, Clock, Award } from 'lucide-react';

export function CourseProgress() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Learning Journey</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">3/6</div>
          <div className="text-sm text-gray-600">Categories Started</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">12h</div>
          <div className="text-sm text-gray-600">Learning Time</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-sm text-gray-600">Certificates</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 rounded-full h-2" style={{ width: '45%' }}></div>
        </div>
      </div>
    </div>
  );
}