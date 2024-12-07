import { useState, useCallback } from 'react';
import { 
  fetchSharePointFiles, 
  linkSharePointFile, 
  unlinkSharePointFile,
  updateFileMetadata 
} from '../services/sharepoint/api';
import type { SharePointFile } from '../services/sharepoint/types';

export function useSharePoint() {
  const [files, setFiles] = useState<SharePointFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async (category?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSharePointFiles(category);
      setFiles(data);
    } catch (err) {
      setError('Failed to load files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const linkFile = useCallback(async (fileData: Partial<SharePointFile>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await linkSharePointFile(fileData);
      if (response.success && response.file) {
        setFiles(prev => [...prev, response.file!]);
        return true;
      }
      throw new Error(response.error || 'Failed to link file');
    } catch (err) {
      setError('Failed to link file');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const unlinkFile = useCallback(async (fileId: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await unlinkSharePointFile(fileId);
      if (success) {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        return true;
      }
      throw new Error('Failed to unlink file');
    } catch (err) {
      setError('Failed to unlink file');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMetadata = useCallback(async (fileId: string, metadata: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateFileMetadata(fileId, metadata);
      if (response.success && response.file) {
        setFiles(prev => prev.map(f => f.id === fileId ? response.file! : f));
        return true;
      }
      throw new Error(response.error || 'Failed to update metadata');
    } catch (err) {
      setError('Failed to update metadata');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    files,
    loading,
    error,
    loadFiles,
    linkFile,
    unlinkFile,
    updateMetadata
  };
}