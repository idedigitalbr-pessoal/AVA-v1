"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Book, GraduationCap, Users, UserCircle, 
  Settings, LogOut, Bell, FileText, ClipboardList, Calendar, X,
  TrendingUp, HelpCircle, FolderSync, DollarSign, Laptop, Award, Shield
} from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { Permission } from "@/types";
import { Can } from "@/lib/auth/Can";

export type SidebarRole = "ALUNO" | "PROFESSOR" | "ADMIN" | "SECRETARIA";

interface SidebarProps {
  role: SidebarRole;
}

interface SidebarLink {
  href: string;
  label: string;
  icon: any;
  permission: Permission;
}

const getLinks = (role: SidebarRole): SidebarLink[] => {
  switch (role) {
    case "ALUNO":
      return [
        { href: "/portal/aluno/dashboard", label: "Dashboard", icon: LayoutDashboard, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/disciplinas", label: "Minhas Disciplinas", icon: Book, permission: 'VIEW_COURSES' },
        { href: "/portal/aluno/provas-online", label: "Provas Online", icon: Laptop, permission: 'SUBMIT_ASSIGNMENTS' },
        { href: "/portal/aluno/quizzes", label: "Quizzes", icon: FileText, permission: 'SUBMIT_ASSIGNMENTS' },
        { href: "/portal/aluno/atividades", label: "Atividades", icon: ClipboardList, permission: 'SUBMIT_ASSIGNMENTS' },
        { href: "/portal/aluno/calendario", label: "Calendário", icon: Calendar, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/servicos", label: "Central de Serviços", icon: FolderSync, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/financeiro", label: "Financeiro", icon: DollarSign, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/boletim", label: "Boletim", icon: FileText, permission: 'VIEW_GRADES' },
        { href: "/portal/aluno/notificacoes", label: "Notificações", icon: Bell, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/como-estudar", label: "Como Estudar", icon: HelpCircle, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/mensagens", label: "Mensagens", icon: UserCircle, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/atendimento", label: "Atendimento", icon: UserCircle, permission: 'VIEW_STUDENT_DASHBOARD' },
        { href: "/portal/aluno/configuracoes", label: "Configurações", icon: Settings, permission: 'VIEW_STUDENT_DASHBOARD' },
      ];
    case "PROFESSOR":
      return [
        { href: "/professor", label: "Dashboard", icon: LayoutDashboard, permission: 'VIEW_TEACHER_DASHBOARD' },
        { href: "/professor/disciplinas", label: "Minhas Disciplinas", icon: Book, permission: 'VIEW_COURSES' },
        { href: "/professor/banco-questoes", label: "Banco de Questões", icon: FileText, permission: 'CREATE_CONTENT' },
        { href: "/professor/quizzes", label: "Questionários", icon: FileText, permission: 'CREATE_CONTENT' },
      ];
    case "ADMIN":
    case "SECRETARIA":
      return [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: 'VIEW_ADMIN_DASHBOARD' },
        { href: "/admin/alunos", label: "Alunos", icon: GraduationCap, permission: 'MANAGE_USERS' },
        { href: "/admin/professores", label: "Professores", icon: Users, permission: 'MANAGE_USERS' },
        { href: "/admin/cursos", label: "Cursos", icon: Book, permission: 'MANAGE_COURSES' },
        { href: "/admin/turmas", label: "Turmas", icon: Users, permission: 'MANAGE_COURSES' },
        { href: "/admin/disciplinas", label: "Disciplinas", icon: Book, permission: 'MANAGE_COURSES' },
        { href: "/admin/matriculas", label: "Matrículas", icon: Book, permission: 'MANAGE_COURSES' },
        { href: "/admin/avaliacoes/atividades", label: "Avaliações", icon: ClipboardList, permission: 'CREATE_CONTENT' },
        { href: "/admin/certificados", label: "Certificados", icon: Award, permission: 'MANAGE_COURSES' },
        { href: "/admin/relatorios", label: "Relatórios", icon: FileText, permission: 'VIEW_ADMIN_DASHBOARD' },
        { href: "/admin/usuarios", label: "Usuários", icon: Users, permission: 'MANAGE_USERS' },
        { href: "/admin/perfis", label: "Perfis e Acessos", icon: Shield, permission: 'MANAGE_SYSTEM' },
        { href: "/admin/configuracoes", label: "Configurações", icon: Settings, permission: 'MANAGE_SYSTEM' },
      ];
    default:
      return [];
  }
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = getLinks(role);
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col z-50 w-64 md:relative transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">A</div>
          <span className="text-white font-bold text-xl tracking-tight">AVA Acadêmica</span>
        </div>
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Can key={link.href} I={link.permission}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-indigo-600 text-white" 
                      : "hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {link.label}
                </Link>
              </Can>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-slate-800">
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          Sair
        </Link>
      </div>
    </aside>
  </>
  );
}
