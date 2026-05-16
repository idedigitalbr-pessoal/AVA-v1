import { useQuery } from "@tanstack/react-query";
import { studentsService, teachersService, coursesService, subjectsService, classesService } from "@/lib/api";

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
