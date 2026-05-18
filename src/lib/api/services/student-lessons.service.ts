import { StudentModule, StudentLesson } from '@/types/student';
import { mockStudentModules, mockLessonQuestions } from '@/mocks/student.mock';
import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const studentLessonsService = {
  getLessonDetails: async (courseId: string, lessonId: string): Promise<StudentLesson | undefined> => {
    // try { return await apiClient.get<StudentLesson>(ENDPOINTS.STUDENT_AREA.LESSON_BY_ID(courseId, lessonId)); } catch(e) {}
    for (const courseModule of mockStudentModules) {
      const lesson = courseModule.lessons.find(l => l.id === lessonId);
      if (lesson) return Promise.resolve(lesson);
    }
    return Promise.resolve(mockStudentModules[0].lessons[0]);
  },
  completeLesson: async (lessonId: string): Promise<boolean> => {
    // try { await apiClient.post(ENDPOINTS.STUDENT_AREA.LESSON_COMPLETE(lessonId), {}); return true; } catch(e) {}
    return Promise.resolve(true);
  },
  uncompleteLesson: async (lessonId: string): Promise<boolean> => {
    // try { await apiClient.post(ENDPOINTS.STUDENT_AREA.LESSON_UNCOMPLETE(lessonId), {}); return true; } catch(e) {}
    return Promise.resolve(true);
  },
  getLessonComments: async (lessonId: string): Promise<any[]> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.LESSON_COMMENTS(lessonId)); } catch(e) {}
    return Promise.resolve(mockLessonQuestions);
  },
  createLessonQuestion: async (lessonId: string, payload: any): Promise<any> => {
    // try { return await apiClient.post(ENDPOINTS.STUDENT_AREA.LESSON_COMMENTS(lessonId), payload); } catch(e) {}
    return Promise.resolve({
      id: Date.now(),
      user: "Aluno Logado",
      avatar: "AL",
      text: payload.text,
      time: "Agora mesmo",
      isTeacher: false,
      replies: []
    });
  },
  getLessonAttachments: async (lessonId: string): Promise<any[]> => {
    // try { return await apiClient.get(ENDPOINTS.STUDENT_AREA.LESSON_ATTACHMENTS(lessonId)); } catch(e) {}
    return Promise.resolve([
      { title: "Apostila Completa", size: "2.4 MB" },
      { title: "Slides da Aula", size: "1.1 MB" }
    ]);
  }
};
