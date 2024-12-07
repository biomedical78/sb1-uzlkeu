import React from 'react';
import { FileText, Link } from 'lucide-react';
import { SHAREPOINT_CONFIG } from '../../../../config/sharepoint';

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">No files have been linked yet</p>
      <a
        href={SHAREPOINT_CONFIG.ROOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-4 text-sm text-blue-600 hover:text-blue-700"
      >
        <Link className="h-4 w-4 mr-1" />
        Link SharePoint Files
      </a>
    </div>
  );
}