import React from 'react';
import { ActiveCourseCard } from './ActiveCourseCard';

const activeCourses = [
  {
    title: 'ISO 13485:2016 Fundamentals',
    progress: 65,
    timeLeft: '2.5 hours',
    lastLesson: 'Documentation Requirements',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070'
  },
  {
    title: 'Risk Management for Medical Devices',
    progress: 42,
    timeLeft: '4 hours',
    lastLesson: 'Risk Analysis Methods',
    thumbnail: 'https://images.unsplash.com/photo-1581093458791-4a2b7b366621?auto=format&fit=crop&q=80&w=2070'
  }
];

export function ActiveCourses() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeCourses.map((course) => (
          <ActiveCourseCard key={course.title} {...course} />
        ))}
      </div>
    </div>
  );
}