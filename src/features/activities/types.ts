export interface ActivityAttachment {
  id: string;
  name: string;
  url: string;
  type: 'PDF' | 'LINK' | 'DOCUMENT';
}

export interface ActivityDetail {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'UPLOAD' | 'QUIZ';
  dueDate: string;
  maxScore: number;
  status: 'DRAFT' | 'PUBLISHED';
  attachments: ActivityAttachment[];
}

export interface ActivitySubmission {
  id: string;
  activityId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  content: string; // text submission or link
  fileUrl?: string; // if they uploaded a file
  status: 'SUBMITTED' | 'GRADED' | 'LATE';
  grade?: number;
  feedback?: string;
}
