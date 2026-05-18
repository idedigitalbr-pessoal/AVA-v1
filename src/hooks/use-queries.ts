import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentsService, teachersService, coursesService, subjectsService, classesService, ApiService } from "@/lib/api";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const data = await studentsService.getAll();
      return data as import("@/types").Student[];
    },
  });
}

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const data = await teachersService.getAll();
      return data as import("@/types").Teacher[];
    },
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => coursesService.getAll(),
  });
}

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: () => subjectsService.getAll(),
  });
}

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: () => classesService.getAll(),
  });
}

export function useEnrollments() {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: () => import("@/lib/api").then(m => m.enrollmentService.listEnrollments()),
  });
}

// ==========================================
// Aluno Hooks
// ==========================================

export function useStudentDashboard() {
  return useQuery({
    queryKey: ["student-dashboard"],
    queryFn: () => ApiService.aluno.dashboard.getStudentDashboard()
  });
}

export function useStudentCourses() {
  return useQuery({
    queryKey: ["student-courses"],
    queryFn: () => ApiService.aluno.courses.getMyCourses()
  });
}

export function useStudentCourseDetails(courseId: string) {
  return useQuery({
    queryKey: ["student-course-details", courseId],
    queryFn: () => ApiService.aluno.courses.getCourseDetails(courseId),
    enabled: !!courseId,
  });
}

export function useStudentModules(courseId: string) {
  return useQuery({
    queryKey: ["student-modules", courseId],
    queryFn: () => ApiService.aluno.courses.getCourseModules(courseId),
    enabled: !!courseId,
  });
}

export function useStudentLesson(courseId: string, lessonId: string) {
  return useQuery({
    queryKey: ["student-lesson", courseId, lessonId],
    queryFn: () => ApiService.aluno.lessons.getLessonDetails(courseId, lessonId),
    enabled: !!lessonId,
  });
}

export function useStudentActivities() {
  return useQuery({
    queryKey: ["student-activities"],
    queryFn: () => ApiService.aluno.activities.getMyActivities()
  });
}

export function useStudentQuizzes() {
  return useQuery({
    queryKey: ["student-quizzes"],
    queryFn: () => ApiService.aluno.quizzes.getMyQuizzes()
  });
}

export function useStudentExams() {
  return useQuery({
    queryKey: ["student-exams"],
    queryFn: () => ApiService.aluno.exams.getMyExams()
  });
}

export function useStudentGradebook() {
  return useQuery({
    queryKey: ["student-gradebook"],
    queryFn: () => ApiService.aluno.grades.getMyGradebook()
  });
}

export function useStudentCalendar() {
  return useQuery({
    queryKey: ["student-calendar"],
    queryFn: () => ApiService.aluno.calendar.getMyEvents()
  });
}

export function useStudentMessages() {
  return useQuery({
    queryKey: ["student-messages"],
    queryFn: () => ApiService.aluno.messages.getMyMessages()
  });
}

export function useStudentNotifications() {
  return useQuery({
    queryKey: ["student-notifications"],
    queryFn: () => ApiService.aluno.notifications.getMyNotifications()
  });
}

export function useStudentFinancial() {
  return useQuery({
    queryKey: ["student-financial"],
    queryFn: () => ApiService.aluno.financial.getMyFinancialSummary()
  });
}

export function useStudentProfile() {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: () => ApiService.aluno.settings.getMyProfile()
  });
}

export function useStudentAcademicHistory() {
  return useQuery({
    queryKey: ["student-academic-history"],
    queryFn: () => ApiService.aluno.grades.getAcademicHistory()
  });
}

export function useStudentDashboardShortcuts() {
  return useQuery({
    queryKey: ["student-dashboard-shortcuts"],
    queryFn: () => ApiService.aluno.dashboard.getStudentShortcuts()
  });
}

export function useStudentDashboardAnnouncements() {
  return useQuery({
    queryKey: ["student-dashboard-announcements"],
    queryFn: () => ApiService.aluno.dashboard.getStudentAnnouncements()
  });
}

export function useStudentSupportTickets() {
  return useQuery({
    queryKey: ["student-support-tickets"],
    queryFn: () => ApiService.aluno.support.getTickets()
  });
}
