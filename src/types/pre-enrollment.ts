export type PreEnrollmentStage = 
  | 'NEW_ENROLLMENT' 
  | 'INCOMPLETE_DATA' 
  | 'WAITING_DOCS' 
  | 'DOCS_UNDER_REVIEW' 
  | 'WAITING_PAYMENT' 
  | 'WAITING_APPROVAL' 
  | 'APPROVED' 
  | 'CONVERTED' 
  | 'CANCELLED';

export type EntryMethod = 
  | 'ONLINE_TEST' 
  | 'ENEM' 
  | 'TRANSFER' 
  | 'SECOND_DEGREE' 
  | 'SIMPLIFIED';

export interface PreEnrollmentDocument {
  id: string;
  type: string;
  name: string;
  fileUrl?: string;
  status: 'PENDING' | 'UPLOADED' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

export interface PreEnrollment {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate?: string;
  city?: string;
  state?: string;
  courseId: string;
  courseName?: string;
  format?: 'ONLINE' | 'HYBRID' | 'IN_PERSON';
  entryMethod?: EntryMethod;
  stage: PreEnrollmentStage;
  documentStatus: 'PENDING' | 'UPLOADED' | 'APPROVED' | 'REJECTED';
  paymentStatus: 'PENDING' | 'PAID' | 'EXEMPT';
  documents: PreEnrollmentDocument[];
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  slaDays: number; // For admin view SLA
  notes?: Array<{
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
  }>;
  history?: Array<{
    id: string;
    stage: PreEnrollmentStage;
    changedBy: string;
    createdAt: string;
  }>;
}

export interface PublicPreEnrollmentPayload {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  courseId: string;
  format: 'ONLINE' | 'HYBRID' | 'IN_PERSON';
  entryMethod: EntryMethod;
  lgpdAccepted: boolean;
}
