import { Role, Permission } from "@/types";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'VIEW_DASHBOARD',
    'VIEW_ADMIN_DASHBOARD',
    'MANAGE_USERS',
    'MANAGE_COURSES',
    'MANAGE_SYSTEM',
    'VIEW_ALL_USERS',
    'DELETE_USERS',
    'DELETE_COURSES'
  ],
  SECRETARIA: [
    'VIEW_DASHBOARD',
    'VIEW_ADMIN_DASHBOARD',
    'MANAGE_USERS',
    'MANAGE_COURSES',
    'VIEW_ALL_USERS'
  ],
  PROFESSOR: [
    'VIEW_DASHBOARD',
    'VIEW_TEACHER_DASHBOARD',
    'MANAGE_GRADES',
    'VIEW_COURSES',
    'CREATE_CONTENT'
  ],
  ALUNO: [
    'VIEW_DASHBOARD',
    'VIEW_STUDENT_DASHBOARD',
    'VIEW_COURSES',
    'SUBMIT_ASSIGNMENTS',
    'VIEW_GRADES'
  ]
};

export function hasPermission(role: Role | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
