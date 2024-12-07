export interface SharePointFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  lastModified: string;
  category: string;
  metadata?: Record<string, any>;
}

export interface SharePointFolder {
  id: string;
  name: string;
  path: string;
  files: SharePointFile[];
  subfolders: SharePointFolder[];
}

export interface FileUploadResponse {
  success: boolean;
  file?: SharePointFile;
  error?: string;
}