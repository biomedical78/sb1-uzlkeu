import React, { useState } from 'react';
import { Save, Trash } from 'lucide-react';
import type { Course, Module, Lesson } from '../../types';

interface CourseEditorProps {
  course?: Course;
  onSave: (course: Partial<Course>) => void;
}

export function CourseEditor({ course, onSave }: CourseEditorProps) {
  const [title, setTitle] = useState(course?.title || '');
  const [description, setDescription] = useState(course?.description || '');
  const [category, setCategory] = useState(course?.category || 'quality');
  const [modules, setModules] = useState<Partial<Module>[]>(course?.modules || []);

  const addLesson = (moduleIndex: number) => {
    const updatedModules = [...modules];
    const module = updatedModules[moduleIndex];
    if (module.lessons) {
      module.lessons.push({
        title: '',
        content: '',
        type: 'text',
        order: module.lessons.length
      } as Lesson);
    }
    setModules(updatedModules);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Enter course description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Course['category'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="quality">Quality Management</option>
            <option value="regulatory">Regulatory Compliance</option>
            <option value="risk">Risk Management</option>
            <option value="clinical">Clinical Evaluation</option>
            <option value="postmarket">Post-Market Surveillance</option>
            <option value="software">Medical Software</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content</h3>

          <div className="space-y-4">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4">
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => {
                    const updatedModules = [...modules];
                    updatedModules[moduleIndex].title = e.target.value;
                    setModules(updatedModules);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Module title"
                />

                <div className="space-y-2">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => {
                          const updatedModules = [...modules];
                          updatedModules[moduleIndex].lessons![lessonIndex].title = e.target.value;
                          setModules(updatedModules);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Lesson title"
                      />
                      <button
                        onClick={() => {
                          const updatedModules = [...modules];
                          updatedModules[moduleIndex].lessons!.splice(lessonIndex, 1);
                          setModules(updatedModules);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addLesson(moduleIndex)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Lesson
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onSave({ title, description, category, modules })}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span>Save Course</span>
          </button>
        </div>
      </div>
    </div>
  );
}