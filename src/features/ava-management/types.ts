export interface ExtendedLesson {
  id: string;
  moduleId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  status: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | 'ARCHIVED';
  isMandatory?: boolean;
  releaseDate?: string;
  prerequisiteId?: string; // ID of the lesson required to unlock this one
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'PDF' | 'LINK' | 'VIDEO' | 'FILE';
}

export interface ExtendedModule {
  id: string;
  title: string;
  order: number;
  lessons: ExtendedLesson[];
}
