import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import type { SharePointFile } from '../../../../types/files';

interface FileListProps {
  files: SharePointFile[];
}

export function FileList({ files }: FileListProps) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">{file.name}</h3>
              <p className="text-xs text-gray-500">
                Last modified: {new Date(file.lastModified).toLocaleDateString()}
              </p>
            </div>
          </div>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-600"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  );
}