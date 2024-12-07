import React, { useState } from 'react';
import { ContentEditor } from './ContentEditor';
import { ModuleManager } from './ModuleManager';
import { SharePointBrowser } from './SharePointBrowser';
import type { Module } from '../../../types';

export function ContentDashboard() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);

  const handleModuleCreate = (moduleData: Partial<Module>) => {
    const newModule = {
      id: Date.now().toString(),
      ...moduleData,
      lessons: [],
      order: modules.length,
    } as Module;
    setModules([...modules, newModule]);
  };

  const handleModuleUpdate = (moduleId: string, moduleData: Partial<Module>) => {
    setModules(modules.map(m => m.id === moduleId ? { ...m, ...moduleData } : m));
  };

  const handleModuleDelete = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const handleModuleReorder = (moduleId: string, direction: 'up' | 'down') => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return;

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? moduleIndex - 1 : moduleIndex + 1;

    if (targetIndex >= 0 && targetIndex < modules.length) {
      [newModules[moduleIndex], newModules[targetIndex]] = 
      [newModules[targetIndex], newModules[moduleIndex]];
      setModules(newModules);
    }
  };

  return (
    <div className="space-y-8">
      <SharePointBrowser />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ModuleManager
          courseId="1"
          modules={modules}
          onModuleCreate={handleModuleCreate}
          onModuleUpdate={handleModuleUpdate}
          onModuleDelete={handleModuleDelete}
          onModuleReorder={handleModuleReorder}
        />
        <ContentEditor
          moduleId={selectedModule || undefined}
          onSave={(content) => {
            console.log('Saving content:', content);
            // Handle content saving logic here
          }}
        />
      </div>
    </div>
  );
}