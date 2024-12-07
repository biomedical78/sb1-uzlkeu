import React from 'react';
import { FileText, Download, Video, Book } from 'lucide-react';

const resources = [
  {
    title: 'ISO 13485:2016 Overview',
    type: 'PDF',
    icon: FileText,
    size: '2.4 MB'
  },
  {
    title: 'Risk Management Templates',
    type: 'ZIP',
    icon: Download,
    size: '4.1 MB'
  },
  {
    title: 'Quality Manual Guide',
    type: 'Video',
    icon: Video,
    duration: '15 min'
  },
  {
    title: 'Regulatory Guidelines',
    type: 'PDF',
    icon: Book,
    size: '1.8 MB'
  }
];

export function ResourcesPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Resources</h2>
      
      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div 
              key={resource.title}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-xs text-gray-500">
                    {resource.duration || resource.size}
                  </p>
                </div>
              </div>
              <Download className="h-4 w-4 text-gray-400 hover:text-blue-600" />
            </div>
          );
        })}
      </div>
    </div>
  );
}