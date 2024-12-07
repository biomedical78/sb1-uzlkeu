export const COURSE_CATEGORIES = {
  QUALITY: 'quality',
  REGULATORY: 'regulatory',
  RISK: 'risk',
  CLINICAL: 'clinical',
  POSTMARKET: 'postmarket',
  SOFTWARE: 'software'
} as const;

export const CONTENT_TYPES = {
  VIDEO: 'video',
  PDF: 'pdf',
  QUIZ: 'quiz',
  INTERACTIVE: 'interactive'
} as const;

export const FILE_LIMITS = {
  MAX_SIZE: 500 * 1024 * 1024, // 500MB
  ALLOWED_TYPES: ['.pdf', '.mp4', '.pptx', '.docx']
} as const;