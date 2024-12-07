import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Brain, ArrowRight, Star } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-400">4.9</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full">
            {course.category}
          </span>
        </div>

        <p className="text-gray-300 mb-8 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{course.modules.length} Modules</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>4h 30m</span>
            </div>
          </div>

          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300"
          >
            <span className="text-sm font-medium">Start Learning</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}