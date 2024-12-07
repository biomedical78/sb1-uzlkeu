import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { CourseEditor } from './CourseEditor';
import type { Course } from '../../../types/course';

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();

  const handleSave = async (courseData: Partial<Course>) => {
    setIsEditing(false);
    setEditingCourse(undefined);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Manage Courses</h2>
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>New Course</span>
        </button>
      </div>

      {isEditing ? (
        <CourseEditor course={editingCourse} onSave={handleSave} />
      ) : (
        <div className="space-y-4">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No courses yet. Create your first course!</p>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{course.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}