import React, { useState } from 'react';
import { Plus, Folder, ArrowUp, ArrowDown } from 'lucide-react';
import type { Module } from '../../../types';

interface ModuleManagerProps {
  courseId: string;
  modules: Module[];
  onModuleCreate: (module: Partial<Module>) => void;
  onModuleUpdate: (moduleId: string, module: Partial<Module>) => void;
  onModuleDelete: (moduleId: string) => void;
  onModuleReorder: (moduleId: string, direction: 'up' | 'down') => void;
}

export function ModuleManager({
  courseId,
  modules,
  onModuleCreate,
  onModuleUpdate,
  onModuleDelete,
  onModuleReorder,
}: ModuleManagerProps) {
  const [newModule, setNewModule] = useState({ title: '', description: '' });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
        <button
          onClick={() => onModuleCreate(newModule)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Module</span>
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Folder className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-gray-900">{module.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onModuleReorder(module.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onModuleReorder(module.id, 'down')}
                  disabled={index === modules.length - 1}
                  className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{module.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{module.lessons?.length || 0} lessons</span>
              <button
                onClick={() => onModuleDelete(module.id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete Module
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}