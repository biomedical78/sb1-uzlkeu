export interface SharePointFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  lastModified: string;
}

export interface FileUploadResponse {
  success: boolean;
  file?: SharePointFile;
  error?: string;
}