import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { User, Teacher, Course, Subject, Class, TeacherDashboardData, TeacherClassSubject, TeacherClassOverviewData } from '@/types';
import { mockTeachers, mockCourses, mockSubjects, mockClasses, mockClassSubjects, mockStats } from '@/mocks';

export const teachersService = {
  list: async (): Promise<Teacher[]> => {
    return mockTeachers;
  },

  getTeacherDashboard: async (): Promise<TeacherDashboardData> => {
    // Retorna os dados mockados estruturados
    return {
      stats: mockStats.teacher,
      nextClass: {
        id: 'lc1',
        title: 'Estrutura de Dados em C',
        courseName: 'Engenharia de Software',
        className: 'Turma A - 2026',
        time: '19:00',
        type: 'ONLINE'
      },
      todaySchedule: [
        { id: 'ls1', title: 'Estrutura de Dados em C', courseName: 'Engenharia de Software', className: 'Turma A - 2026', time: '19:00 - 20:40', type: 'ONLINE' },
        { id: 'ls2', title: 'Lógica Básica', courseName: 'Sistemas de Informação', className: 'Turma C - 2026', time: '21:00 - 22:40', type: 'PRESENCIAL' }
      ],
      pendingTasks: [
        { id: 'pt1', title: 'Corrigir Prova P1', type: 'GRADE', courseName: 'Engenharia de Software', dueDate: 'Hoje' },
        { id: 'pt2', title: 'Frequência não lançada', type: 'ATTENDANCE', courseName: 'Sistemas de Informação', dueDate: 'Ontem' },
        { id: 'pt3', title: 'Mensagem de Carlos Silva', type: 'MESSAGE', courseName: 'Engenharia de Software', dueDate: '2 horas atrás' },
        { id: 'pt4', title: 'Aula 4: Árvores Binárias (Revisar)', type: 'DRAFT', courseName: 'Engenharia de Software' },
      ],
      coursesProgress: [
        { id: 'c1', courseName: 'Engenharia de Software', className: 'Turma A', totalStudents: 30, publishedClasses: 12, totalClasses: 20, pendingSubmissions: 5, averageGrade: 7.8 },
        { id: 'c2', courseName: 'Sistemas de Informação', className: 'Turma C', totalStudents: 40, publishedClasses: 5, totalClasses: 25, pendingSubmissions: 0, averageGrade: 8.1 },
      ],
      alerts: [
        { id: 'al1', title: 'Alunos em Risco de Reprovação', description: '3 alunos na Turma A estão com média abaixo de 5.0.', type: 'DANGER' },
        { id: 'al2', title: 'Baixo Engajamento', description: 'A Turma C teve apenas 40% de presença na última aula.', type: 'WARNING' },
        { id: 'al3', title: 'Módulo Sem Conteúdo', description: 'O Módulo 3 de "Estrutura de Dados" ainda não possui aulas publicadas.', type: 'INFO' }
      ]
    };
  },

  create: async (data: any): Promise<Teacher> => {
    return { ...mockTeachers[0], id: Math.random().toString(), ...data } as Teacher;
  },

  getAll: async (): Promise<any[]> => {
    return mockTeachers.map(t => {
      const teacherSubjects = mockSubjects.filter(sub => sub.linkedTeachers?.some(lt => lt.id === t.id));
      const teacherClassIds = mockClassSubjects.filter(cs => cs.teacherId === t.id).map(cs => cs.classId);
      const teacherClasses = mockClasses.filter(c => teacherClassIds.includes(c.id));
      const workload = teacherSubjects.reduce((acc, sub) => acc + (sub.workload || 0), 0);
      return { 
        ...t, 
        subjectsCount: teacherSubjects.length, 
        classesCount: teacherClasses.length,
        workload
      };
    });
  },

  getById: async (id: string): Promise<Teacher | undefined> => {
    return mockTeachers.find(u => u.id === id);
  },

  update: async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, ...data } as Teacher;
  },

  blockAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, status: 'BLOCKED' } as Teacher;
  },

  activeAccess: async (id: string): Promise<Teacher> => {
    const teacher = mockTeachers.find(u => u.id === id);
    return { ...teacher, status: 'ACTIVE' } as Teacher;
  },

  resetPassword: async (id: string): Promise<boolean> => {
    return true; // sucesso
  },

  assignSubject: async (teacherId: string, subjectId: string): Promise<boolean> => {
    return true;
  },

  assignClass: async (teacherId: string, classId: string): Promise<boolean> => {
    return true;
  },

  getMyClassSubjects: async (): Promise<TeacherClassSubject[]> => {
    return [
      {
        id: 'cs1',
        subjectName: 'Estrutura de Dados em C',
        courseName: 'Engenharia de Software',
        className: 'Turma A',
        academicYear: '2026.1',
        totalStudents: 30,
        totalModules: 4,
        publishedClasses: 12,
        draftClasses: 3,
        pendingActivities: 5,
        averageGrade: 7.8,
        progressPercentage: 60,
        status: 'ACTIVE'
      },
      {
        id: 'cs2',
        subjectName: 'Lógica de Programação',
        courseName: 'Sistemas de Informação',
        className: 'Turma C',
        academicYear: '2026.1',
        totalStudents: 40,
        totalModules: 5,
        publishedClasses: 5,
        draftClasses: 0,
        pendingActivities: 2,
        averageGrade: 8.1,
        progressPercentage: 20,
        status: 'ACTIVE'
      },
      {
        id: 'cs3',
        subjectName: 'Arquitetura de Computadores',
        courseName: 'Ciência da Computação',
        className: 'Turma B',
        academicYear: '2025.2',
        totalStudents: 25,
        totalModules: 6,
        publishedClasses: 20,
        draftClasses: 0,
        pendingActivities: 0,
        averageGrade: 6.5,
        progressPercentage: 100,
        status: 'ARCHIVED'
      }
    ];
  },

  getClassSubjectById: async (id: string): Promise<TeacherClassSubject | undefined> => {
    const all = await teachersService.getMyClassSubjects();
    return all.find(c => c.id === id) || all[0]; // Retorna o primeiro por padrão se não encontrar (para garantir que os mocks antigos funcionem)
  },

  getClassSubjectOverview: async (id: string): Promise<TeacherClassOverviewData> => {
    const classSubject = await teachersService.getClassSubjectById(id);
    
    return {
      classSubject: classSubject as TeacherClassSubject,
      metrics: {
        averageAttendance: 85,
        unreadMessages: 3,
        studentsAtRisk: 2,
        completedLessonsByStudents: 245,
        nextRecommendedAction: 'Publicar Aula 5 do Módulo 2',
      },
      studentsAtRiskList: [
        { studentId: 'stu1', studentName: 'João Pedro', reason: 'Baixa Frequência (60%)', actionType: 'MESSAGE' },
        { studentId: 'stu2', studentName: 'Maria Silva', reason: 'Média abaixo de 5.0 nas atividades', actionType: 'GRADE' },
      ],
      recentActivities: [
        { id: 'act1', title: 'Prova P1 - Entrega de Maria', type: 'SUBMISSION', date: 'Há 1 hora', description: 'Nota pendente' },
        { id: 'act2', title: 'Dúvida: Ponteiros em C', type: 'MESSAGE', date: 'Há 3 horas', description: 'João Pedro enviou uma dúvida na Aula 3' },
        { id: 'act3', title: 'Aula 4: Alocação Dinâmica', type: 'CONTENT', date: 'Ontem', description: 'Conteúdo programado foi publicado' },
      ],
      notices: [
        { id: 'not1', title: 'Data da Prova P1', content: 'A nossa Prova 1 será no dia 25/05. O conteúdo inclui até o módulo 3.', date: '10/05/2026', author: 'Prof. Carlos Mendes' },
        { id: 'not2', title: 'Material Complementar', content: 'Acabei de adicionar um link com exercícios extras na Aula 2. Confiram!', date: '05/05/2026', author: 'Prof. Carlos Mendes' }
      ]
    };
  },

  getClasses: async (id: string): Promise<Course[]> => {
    // legacy, returns courses the teacher is instructor of.
    return mockCourses.filter(c => c.instructorId === id);
  },

  getSubjects: async (id: string): Promise<Subject[]> => {
    return mockSubjects.filter(sub => sub.linkedTeachers?.some(t => t.id === id));
  },

  getClassesTurmas: async (id: string): Promise<Class[]> => {
    // returns actual "Turmas" (Classes) the teacher is linked to via ClassSubjects
    const classIds = mockClassSubjects.filter(cs => cs.teacherId === id).map(cs => cs.classId);
    return mockClasses.filter(c => classIds.includes(c.id));
  },

  // Conteúdo da disciplina
  getTeacherCourseModules: async (classSubjectId: string): Promise<any[]> => {
    return [
      {
        id: 'mod1',
        title: 'Módulo 1: Introdução ao C',
        order: 1,
        lessons: [
          {
            id: 'less1',
            moduleId: 'mod1',
            title: 'Estrutura Básica de um Programa',
            content: 'Nesta aula veremos a estrutura de um programa C...',
            videoUrl: 'https://youtube.com/...',
            duration: 15,
            order: 1,
            status: 'PUBLISHED',
            isMandatory: true,
            attachments: [
              { id: 'att1', name: 'Slides da Aula', url: '#', type: 'PDF' }
            ]
          },
          {
            id: 'less2',
            moduleId: 'mod1',
            title: 'Variáveis e Tipos de Dados',
            content: 'Entendendo inteiros, floats, chars...',
            videoUrl: '',
            duration: 20,
            order: 2,
            status: 'PUBLISHED',
            isMandatory: true,
            attachments: []
          }
        ]
      },
      {
        id: 'mod2',
        title: 'Módulo 2: Controle de Fluxo',
        order: 2,
        lessons: [
          {
            id: 'less3',
            moduleId: 'mod2',
            title: 'Estruturas Condicionais (if/else)',
            content: 'Controle de fluxo básico...',
            videoUrl: '',
            duration: 18,
            order: 1,
            status: 'DRAFT',
            isMandatory: false,
            attachments: []
          }
        ]
      }
    ]; 
  },
  createTeacherModule: async (classSubjectId: string, payload: any): Promise<any> => { return payload; },
  updateTeacherModule: async (moduleId: string, payload: any): Promise<any> => { return payload; },
  deleteTeacherModule: async (moduleId: string): Promise<boolean> => { return true; },
  reorderTeacherModules: async (classSubjectId: string, payload: any): Promise<boolean> => { return true; },
  createTeacherLesson: async (moduleId: string, payload: any): Promise<any> => { return payload; },
  updateTeacherLesson: async (lessonId: string, payload: any): Promise<any> => { return payload; },
  deleteTeacherLesson: async (lessonId: string): Promise<boolean> => { return true; },
  publishTeacherLesson: async (lessonId: string): Promise<boolean> => { return true; },
  unpublishTeacherLesson: async (lessonId: string): Promise<boolean> => { return true; },
  addTeacherLessonMaterial: async (lessonId: string, payload: any): Promise<any> => { return payload; },
  removeTeacherLessonMaterial: async (materialId: string): Promise<boolean> => { return true; },

  // Notas
  getGradebook: async (classSubjectId: string): Promise<any> => {
    return {
      classSubjectId,
      assessments: [
        { id: 'a1', name: 'Atividade 1', type: 'ACTIVITY', weight: 1, maxGrade: 10, status: 'PUBLISHED' },
        { id: 'a2', name: 'Quiz 1', type: 'QUIZ', weight: 2, maxGrade: 10, status: 'PUBLISHED' },
        { id: 'a3', name: 'Prova P1', type: 'EXAM', weight: 4, maxGrade: 10, status: 'PUBLISHED' },
        { id: 'a4', name: 'Projeto Final', type: 'PROJECT', weight: 3, maxGrade: 10, status: 'PENDING' },
      ],
      students: [
        {
          studentId: 'stu1',
          studentName: 'João Pedro',
          email: 'joao.pedro@example.com',
          grades: { 'a1': 8, 'a2': 9, 'a3': 7.5, 'a4': null },
          finalGrade: 8.0,
          situation: 'EM_ANDAMENTO'
        },
        {
          studentId: 'stu2',
          studentName: 'Maria Silva',
          email: 'maria.silva@example.com',
          grades: { 'a1': 9, 'a2': 10, 'a3': 8.5, 'a4': null },
          finalGrade: 8.9,
          situation: 'EM_ANDAMENTO'
        },
        {
          studentId: 'stu3',
          studentName: 'Carlos Oliveira',
          email: 'carlos.oliveira@example.com',
          grades: { 'a1': 5, 'a2': 6, 'a3': 4, 'a4': null },
          finalGrade: 4.7,
          situation: 'RECUPERACAO'
        }
      ]
    };
  },
  updateStudentGrade: async (classSubjectId: string, studentId: string, assessmentId: string, payload: any): Promise<boolean> => { return true; },
  saveGradebook: async (classSubjectId: string, payload: any): Promise<boolean> => { return true; },
  exportGradebook: async (classSubjectId: string): Promise<string> => { return "export_url"; },

  // Frequência
  getAttendanceSessions: async (classSubjectId: string): Promise<any> => {
    return {
      classSubjectId,
      sessions: [
        {
          id: 'sess1',
          classSubjectId,
          date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 days ago
          topic: 'Estrutura Básica de um Programa',
          isSaved: true,
          records: [
            { studentId: 'stu1', studentName: 'João Pedro', status: 'PRESENT', attendancePercentage: 90 },
            { studentId: 'stu2', studentName: 'Maria Silva', status: 'PRESENT', attendancePercentage: 100 },
            { studentId: 'stu3', studentName: 'Carlos Oliveira', status: 'ABSENT', attendancePercentage: 65 },
          ]
        }
      ],
      students: [
        { studentId: 'stu1', studentName: 'João Pedro', attendancePercentage: 90 },
        { studentId: 'stu2', studentName: 'Maria Silva', attendancePercentage: 100 },
        { studentId: 'stu3', studentName: 'Carlos Oliveira', attendancePercentage: 65 },
      ]
    };
  },
  createAttendanceSession: async (classSubjectId: string, payload: any): Promise<any> => { return { id: Date.now().toString(), ...payload }; },
  updateAttendanceRecord: async (sessionId: string, studentId: string, payload: any): Promise<boolean> => { return true; },
  saveAttendanceSession: async (sessionId: string, payload: any): Promise<boolean> => { return true; },
  exportAttendance: async (classSubjectId: string): Promise<string> => { return "export_url"; },
  
  // Comunicação (Mensagens e Avisos)
  getCommunicationData: async (classSubjectId: string): Promise<any> => {
    return {
      classSubjectId,
      threads: [
        {
          id: 'th1',
          studentId: 'stu1',
          studentName: 'João Pedro',
          subject: 'Dúvida sobre a lista de exercícios',
          lastMessageDate: new Date().toISOString(),
          status: 'UNREAD',
          messages: [
            {
              id: 'msg1',
              senderId: 'stu1',
              senderName: 'João Pedro',
              senderRole: 'STUDENT',
              content: 'Professor, não consegui entender a questão 3 da lista.',
              date: new Date().toISOString()
            }
          ]
        },
        {
          id: 'th2',
          studentId: 'stu2',
          studentName: 'Maria Silva',
          subject: 'Entrega do projeto',
          lastMessageDate: new Date(Date.now() - 86400000).toISOString(),
          status: 'WAITING_STUDENT',
          messages: [
            {
              id: 'msg2',
              senderId: 'stu2',
              senderName: 'Maria Silva',
              senderRole: 'STUDENT',
              content: 'Posso entregar o projeto um dia depois?',
              date: new Date(Date.now() - 100000000).toISOString()
            },
            {
              id: 'msg3',
              senderId: 'me',
              senderName: 'Você',
              senderRole: 'TEACHER',
              content: 'Depende do motivo. Qual a justificativa?',
              date: new Date(Date.now() - 86400000).toISOString()
            }
          ]
        }
      ],
      announcements: [
        {
          id: 'ann1',
          title: 'Bem-vindos à disciplina!',
          content: 'Olá turma, espero que este semestre seja muito proveitoso para todos.',
          date: new Date(Date.now() - 86400000 * 5).toISOString(),
          authorName: 'Prof. Silva'
        }
      ]
    };
  },
  replyMessage: async (threadId: string, payload: any): Promise<any> => { return payload; },
  sendClassMessage: async (classSubjectId: string, payload: any): Promise<any> => { return payload; },
  createClassAnnouncement: async (classSubjectId: string, payload: any): Promise<any> => { return { id: Date.now().toString(), ...payload }; },
  markMessageAsRead: async (threadId: string): Promise<boolean> => { return true; }
};
