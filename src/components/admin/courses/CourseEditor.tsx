import React, { useState } from 'react';
import { Save, Plus, Trash } from 'lucide-react';
import { COURSE_CATEGORIES } from '../../../config/constants';
import type { Course, Module } from '../../../types/course';

interface CourseEditorProps {
  course?: Course;
  onSave: (courseData: Partial<Course>) => Promise<void>;
}

export function CourseEditor({ course, onSave }: CourseEditorProps) {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [category, setCategory] = useState(course?.category || 'QUALITY');
  const [modules, setModules] = useState<Module[]>(course?.modules || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        title,
        description,
        category: category as keyof typeof COURSE_CATEGORIES,
        modules,
        status: 'draft'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.entries(COURSE_CATEGORIES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Modules</h3>
          <button
            type="button"
            onClick={() => setModules([...modules, {
              id: Date.now().toString(),
              courseId: course?.id || '',
              title: '',
              description: '',
              order: modules.length,
              lessons: [],
              duration: 0,
              status: 'draft'
            }])}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Module</span>
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((module, index) => (
            <div key={module.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => {
                    const updatedModules = [...modules];
                    updatedModules[index].title = e.target.value;
                    setModules(updatedModules);
                  }}
                  placeholder="Module Title"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setModules(modules.filter((_, i) => i !== index))}
                  className="ml-2 text-red-600 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Course'}</span>
        </button>
      </div>
    </form>
  );
}