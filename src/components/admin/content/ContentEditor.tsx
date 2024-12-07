import React, { useState } from 'react';
import { Save, Plus, Image, Video, FileText, Trash } from 'lucide-react';
import type { Module, Lesson } from '../../../types';

interface ContentEditorProps {
  moduleId?: string;
  initialContent?: {
    title: string;
    description: string;
    content: string;
    type: 'text' | 'video' | 'pdf';
  };
  onSave: (content: any) => void;
}

export function ContentEditor({ moduleId, initialContent, onSave }: ContentEditorProps) {
  const [content, setContent] = useState(initialContent || {
    title: '',
    description: '',
    content: '',
    type: 'text' as const,
  });

  const [attachments, setAttachments] = useState<Array<{ type: string; url: string }>>([]);

  const handleAttachment = (type: 'image' | 'video' | 'pdf') => {
    // In a real app, this would handle file uploads
    setAttachments([...attachments, { type, url: '' }]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Title
          </label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter content title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter content description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <select
            value={content.type}
            onChange={(e) => setContent({ ...content, type: e.target.value as 'text' | 'video' | 'pdf' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="text">Text Content</option>
            <option value="video">Video</option>
            <option value="pdf">PDF Document</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          {content.type === 'text' ? (
            <textarea
              value={content.content}
              onChange={(e) => setContent({ ...content, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={10}
              placeholder="Enter your content here..."
            />
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                className="hidden"
                accept={content.type === 'video' ? 'video/*' : 'application/pdf'}
              />
              <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                {content.type === 'video' ? (
                  <Video className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
                <span>Upload {content.type === 'video' ? 'Video' : 'PDF'}</span>
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Attachments
          </label>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleAttachment('image')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Image className="h-4 w-4" />
              <span>Add Image</span>
            </button>
            <button
              onClick={() => handleAttachment('video')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Video className="h-4 w-4" />
              <span>Add Video</span>
            </button>
            <button
              onClick={() => handleAttachment('pdf')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FileText className="h-4 w-4" />
              <span>Add Document</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onSave(content)}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span>Save Content</span>
          </button>
        </div>
      </div>
    </div>
  );
}