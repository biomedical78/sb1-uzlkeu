import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';

interface ActiveCourseCardProps {
  title: string;
  progress: number;
  timeLeft: string;
  lastLesson: string;
  thumbnail: string;
}

export function ActiveCourseCard({ title, progress, timeLeft, lastLesson, thumbnail }: ActiveCourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="aspect-video relative">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center text-sm text-white/80">
            <Clock className="h-4 w-4 mr-1" />
            {timeLeft} remaining
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Last: {lastLesson}</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 rounded-full h-2 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PlayCircle className="h-5 w-5" />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
}