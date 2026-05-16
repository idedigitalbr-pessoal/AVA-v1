import { useQuery } from "@tanstack/react-query";
import { studentsService, teachersService, coursesService, subjectsService, classesService } from "@/lib/api";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => studentsService.getAll(),
  });
}

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => teachersService.getAll(),
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
