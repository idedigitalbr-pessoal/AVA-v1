import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const studentSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  registrationNumber: z.string().min(4, "Matrícula inválida").optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

export const courseSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().optional(),
  totalModules: z.coerce.number().min(1, "Mínimo de 1 módulo"),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
