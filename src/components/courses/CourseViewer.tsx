import React from 'react';
import { useParams } from 'react-router-dom';
import { useTrainingSession } from '../../hooks/useTrainingSession';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function CourseViewer() {
  const { courseId } = useParams();
  const { sessionId, error } = useTrainingSession(courseId || '');

  if (error) {
    return (
      <div className="p-6 bg-red-50/50 backdrop-blur-sm border border-red-200 text-red-600 rounded-xl shadow-lg">
        {error}
      </div>
    );
  }

  if (!sessionId) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Course content will be rendered here based on the content type */}
    </div>
  );
}