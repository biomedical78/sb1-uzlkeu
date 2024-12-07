import React, { useState } from 'react';
import { Plus, Folder, Edit, Trash } from 'lucide-react';
import { CourseEditor } from './CourseEditor';
import type { Course } from '../../types';

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();

  const handleSave = (courseData: Partial<Course>) => {
    if (editingCourse) {
      setCourses(courses.map(c => 
        c.id === editingCourse.id ? { ...c, ...courseData } : c
      ));
    } else {
      setCourses([...courses, {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...courseData
      } as Course]);
    }
    setIsEditing(false);
    setEditingCourse(undefined);
  };

  if (isEditing) {
    return <CourseEditor course={editingCourse} onSave={handleSave} />;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
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

        <div className="space-y-4">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No courses yet. Create your first course!</p>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.modules.length} modules</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      setEditingCourse(course);
                      setIsEditing(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}