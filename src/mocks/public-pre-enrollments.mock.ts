import { PreEnrollment } from '@/types/pre-enrollment';

export const mockPreEnrollments: PreEnrollment[] = [
  {
    id: 'pe-1',
    courseId: 'course-1',
    courseName: 'Pós-Graduação em Tecnologia e Inovação',
    name: 'José Ribeiro',
    email: 'jose.ribeiro@example.com',
    phone: '11977777777',
    cpf: '12345678900',
    stage: 'NEW_ENROLLMENT',
    documentStatus: 'PENDING',
    paymentStatus: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    entryMethod: 'ONLINE_TEST',
    slaDays: 1,
    documents: [
      {
        id: 'doc-1',
        type: 'RG',
        name: 'RG Frente e Verso',
        status: 'PENDING',
      }
    ]
  },
  {
    id: 'pe-2',
    courseId: 'course-2',
    courseName: 'MBA em Gestão Estratégica',
    name: 'Manoel Pedro',
    email: 'manoel@example.com',
    phone: '11966666666',
    cpf: '09876543211',
    stage: 'WAITING_PAYMENT',
    documentStatus: 'APPROVED',
    paymentStatus: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    entryMethod: 'ENEM',
    slaDays: 3,
    documents: [
      {
        id: 'doc-2',
        type: 'RG',
        name: 'RG Frente e Verso',
        status: 'APPROVED',
        fileUrl: 'fake-url'
      }
    ],
  }
];
