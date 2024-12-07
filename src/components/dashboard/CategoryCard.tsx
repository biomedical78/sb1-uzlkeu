import React from 'react';
import { Category } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  green: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  rose: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;
  
  return (
    <div 
      className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer 
      ${colorClasses[category.color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-lg bg-white">
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
          <p className="text-sm opacity-90">{category.description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm font-medium">12 Courses</span>
        <button className="text-sm font-semibold flex items-center space-x-1">
          <span>Explore</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}