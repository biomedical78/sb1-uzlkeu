import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import type { FileUpload } from '../../types';

export function FileUploader() {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload logic here
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Materials</h2>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop your files here, or{' '}
            <button className="text-blue-600 hover:text-blue-700">browse</button>
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF and MP4 files up to 500MB
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {uploads.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.filename}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}