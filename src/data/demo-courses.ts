import { Course } from '../types/course';
import { COURSE_CATEGORIES, CONTENT_TYPES } from '../config/constants';

export const DEMO_COURSES: Course[] = [
  {
    id: '1',
    title: 'ISO 13485:2016 Fundamentals',
    description: 'Comprehensive introduction to ISO 13485:2016 requirements and implementation in medical device quality management systems.',
    category: 'QUALITY',
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    modules: [
      {
        id: 'm1',
        courseId: '1',
        title: 'Introduction to Quality Management Systems',
        description: 'Understanding the basics of QMS and its importance in medical device industry',
        order: 0,
        duration: 60,
        status: 'published',
        lessons: [
          {
            id: 'l1',
            moduleId: 'm1',
            title: 'What is a Quality Management System?',
            description: 'Basic concepts and principles of QMS',
            contentType: 'VIDEO',
            content: '',
            duration: 20,
            order: 0,
            status: 'published',
            metadata: {
              videoUrl: 'https://netorgft10740913-my.sharepoint.com/qms-intro.mp4'
            }
          },
          {
            id: 'l2',
            moduleId: 'm1',
            title: 'ISO 13485:2016 Overview',
            description: 'Introduction to the ISO 13485:2016 standard',
            contentType: 'PDF',
            content: '',
            duration: 40,
            order: 1,
            status: 'published',
            metadata: {
              fileUrl: 'https://netorgft10740913-my.sharepoint.com/iso-13485-overview.pdf'
            }
          }
        ]
      },
      {
        id: 'm2',
        courseId: '1',
        title: 'Documentation Requirements',
        description: 'Understanding and implementing documentation requirements',
        order: 1,
        duration: 90,
        status: 'published',
        lessons: [
          {
            id: 'l3',
            moduleId: 'm2',
            title: 'Quality Manual Development',
            description: 'How to develop and maintain a quality manual',
            contentType: 'PDF',
            content: '',
            duration: 45,
            order: 0,
            status: 'published',
            metadata: {
              fileUrl: 'https://netorgft10740913-my.sharepoint.com/quality-manual-guide.pdf'
            }
          },
          {
            id: 'l4',
            moduleId: 'm2',
            title: 'Document Control',
            description: 'Document control procedures and best practices',
            contentType: 'VIDEO',
            content: '',
            duration: 45,
            order: 1,
            status: 'published',
            metadata: {
              videoUrl: 'https://netorgft10740913-my.sharepoint.com/document-control.mp4'
            }
          }
        ]
      }
    ]
  }
];