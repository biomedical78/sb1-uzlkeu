import React from 'react';
import { Lock, PlayCircle } from 'lucide-react';
import type { Category } from '../../types';

interface CourseLibraryProps {
  categories: Category[];
}

export function CourseLibrary({ categories }: CourseLibraryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Library</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg bg-${category.color}-50`}>
                  <Icon className={`h-6 w-6 text-${category.color}-600`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                  <button className="mt-3 inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                    <PlayCircle className="h-4 w-4" />
                    <span>Start Learning</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}