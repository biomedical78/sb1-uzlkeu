export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'pdf';
  fileUrl?: string;
  duration?: number;
  order: number;
}

export type CategoryType = 'quality' | 'regulatory' | 'risk' | 'clinical' | 'postmarket' | 'software';

export interface Category {
  id: CategoryType;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export interface FileUpload {
  id: string;
  filename: string;
  fileUrl: string;
  fileType: string;
  size: number;
  uploadedAt: string;
}