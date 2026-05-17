import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/api';

export function useTeacherDashboard() {
  return useQuery({
    queryKey: ['teacher-dashboard'],
    queryFn: () => ApiService.teachers.getTeacherDashboard(),
  });
}

export function useTeacherClassSubjects() {
  return useQuery({
    queryKey: ['teacher-class-subjects'],
    queryFn: () => ApiService.teachers.getMyClassSubjects(),
  });
}

export function useTeacherClassSubjectOverview(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-class-overview', classSubjectId],
    queryFn: () => ApiService.teachers.getClassSubjectOverview(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherContent(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-content', classSubjectId],
    queryFn: () => ApiService.teachers.getTeacherCourseModules(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherActivities(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-activities', classSubjectId],
    queryFn: () => ApiService.teachers.getAssessments(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherGradebook(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-gradebook', classSubjectId],
    queryFn: () => ApiService.teachers.getGradebook(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherAttendance(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-attendance', classSubjectId],
    queryFn: () => ApiService.teachers.getAttendanceSessions(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherMessages(classSubjectId: string) {
  return useQuery({
    queryKey: ['teacher-messages', classSubjectId],
    queryFn: () => ApiService.teachers.getCommunicationData(classSubjectId),
    enabled: !!classSubjectId,
  });
}

export function useTeacherQuestions(filters?: any) {
  return useQuery({
    queryKey: ['teacher-questions', filters],
    queryFn: () => ApiService.teachers.getQuestions(filters),
  });
}

// Relatórios
export function useTeacherReports(classSubjectId: string, type: 'PERFORMANCE' | 'ATTENDANCE' | 'ENGAGEMENT' | 'RISK') {
  return useQuery({
    queryKey: ['teacher-reports', classSubjectId, type],
    queryFn: () => {
      switch (type) {
        case 'PERFORMANCE': return ApiService.teachers.getClassPerformance(classSubjectId);
        case 'ATTENDANCE': return ApiService.teachers.getClassAttendanceReport(classSubjectId);
        case 'ENGAGEMENT': return ApiService.teachers.getClassEngagementReport(classSubjectId);
        case 'RISK': return ApiService.teachers.getAtRiskStudentsReport(classSubjectId);
        default: return Promise.reject(new Error("Tipo de relatório inválido"));
      }
    },
    enabled: !!classSubjectId,
  });
}
