import { RoleProfile, Permission, Role } from '@/types';

export const mockRoles: RoleProfile[] = [
  {
    id: 'role_1',
    name: 'SUPER_ADMIN',
    label: 'Super Admin',
    description: 'Acesso total ao sistema',
    permissions: [
       'students.read', 'students.create', 'students.update', 'students.delete',
       'teachers.read', 'courses.manage', 'classes.manage', 'subjects.manage',
       'enrollments.manage', 'ava.manage', 'assessments.manage', 'grades.manage',
       'reports.read', 'certificates.manage', 'settings.manage',
       'VIEW_DASHBOARD', 'MANAGE_USERS', 'VIEW_ADMIN_DASHBOARD', 'MANAGE_SYSTEM'
    ]
  },
  {
    id: 'role_2',
    name: 'ADMIN',
    label: 'Administrador',
    description: 'Acesso gerencial amplo, sem gerenciar permissões e configurações globais',
    permissions: [
       'students.read', 'students.create', 'students.update', 'students.delete',
       'teachers.read', 'courses.manage', 'classes.manage', 'subjects.manage',
       'enrollments.manage', 'ava.manage', 'assessments.manage', 'grades.manage',
       'reports.read', 'certificates.manage',
       'VIEW_DASHBOARD', 'MANAGE_USERS', 'VIEW_ADMIN_DASHBOARD'
    ]
  },
  {
    id: 'role_3',
    name: 'SECRETARIA',
    label: 'Secretaria',
    description: 'Gestão de alunos, matrículas e certificação',
    permissions: [
       'students.read', 'students.create', 'students.update',
       'enrollments.manage', 'certificates.manage',
       'VIEW_DASHBOARD', 'VIEW_ADMIN_DASHBOARD'
    ]
  },
  {
    id: 'role_4',
    name: 'COORDENADOR',
    label: 'Coordenador',
    description: 'Gestão acadêmica e de professores',
    permissions: [
       'students.read', 'teachers.read', 'courses.manage', 'classes.manage', 'subjects.manage',
       'reports.read', 'VIEW_DASHBOARD', 'VIEW_ADMIN_DASHBOARD'
    ]
  },
  {
    id: 'role_5',
    name: 'PROFESSOR',
    label: 'Professor',
    description: 'Acesso as turmas e notas',
    permissions: [
       'ava.manage', 'assessments.manage', 'grades.manage', 'VIEW_TEACHER_DASHBOARD', 'VIEW_DASHBOARD', 'CREATE_CONTENT'
    ]
  },
  {
    id: 'role_6',
    name: 'ALUNO',
    label: 'Aluno',
    description: 'Acesso ao AVA',
    permissions: [
       'VIEW_STUDENT_DASHBOARD', 'VIEW_DASHBOARD', 'SUBMIT_ASSIGNMENTS', 'VIEW_COURSES'
    ]
  },
  {
    id: 'role_7',
    name: 'FINANCEIRO',
    label: 'Financeiro',
    description: 'Acesso a relatórios e inadimplências',
    permissions: [
       'reports.read', 'VIEW_DASHBOARD', 'VIEW_ADMIN_DASHBOARD'
    ]
  },
  {
    id: 'role_8',
    name: 'SUPORTE',
    label: 'Suporte IT',
    description: 'Acesso de leitura ao sistema para suporte',
    permissions: [
       'students.read', 'teachers.read', 'VIEW_DASHBOARD', 'VIEW_ADMIN_DASHBOARD'
    ]
  }
];

export const permissionsService = {
  listRoles: async (): Promise<RoleProfile[]> => {
    return mockRoles;
  },

  getRoleById: async (id: string): Promise<RoleProfile> => {
    const role = mockRoles.find(r => r.id === id);
    if (!role) throw new Error('Role not found');
    return role;
  },

  updateRolePermissions: async (id: string, permissions: Permission[]): Promise<RoleProfile> => {
    const role = await permissionsService.getRoleById(id);
    // mocked response
    return { ...role, permissions };
  },

  createRole: async (data: Partial<RoleProfile>): Promise<RoleProfile> => {
    return {
      id: "role_new_" + Date.now(),
      name: (data.name || 'SUPORTE') as Role,
      label: data.label || '',
      description: data.description || '',
      permissions: data.permissions || []
    };
  }
};
