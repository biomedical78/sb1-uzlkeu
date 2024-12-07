import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { COURSE_CATEGORIES } from '../../config/constants';

export function CourseLibrary() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Course Library</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(COURSE_CATEGORIES).map(([key, value]) => (
          <div 
            key={key}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/courses/${key.toLowerCase()}`)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
            </div>
            <p className="text-sm text-gray-600">
              Access comprehensive training materials and courses in {value.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}