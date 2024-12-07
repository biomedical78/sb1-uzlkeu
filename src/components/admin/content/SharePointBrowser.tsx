import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useSharePoint } from '../../../hooks/useSharePoint';
import { FileList } from './file-management/FileList';
import { EmptyState } from './file-management/EmptyState';
import { LoadingState } from './file-management/LoadingState';
import { ErrorState } from './file-management/ErrorState';
import { SHAREPOINT_CONFIG } from '../../../config/sharepoint';

export function SharePointBrowser() {
  const { files, loading, error, loadFiles } = useSharePoint();

  React.useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">SharePoint Files</h2>
        <a
          href={SHAREPOINT_CONFIG.ROOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Open in SharePoint
        </a>
      </div>

      {files.length === 0 ? <EmptyState /> : <FileList files={files} />}
    </div>
  );
}