export interface Course {
  id: string;
  title: string;
  description: string;
  category: keyof typeof COURSE_CATEGORIES;
  modules: Module[];
  prerequisites?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  duration: number;
  status: 'draft' | 'published';
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  contentType: keyof typeof CONTENT_TYPES;
  content: string;
  duration: number;
  order: number;
  status: 'draft' | 'published';
  metadata: Record<string, any>;
}