"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Book, GraduationCap, Users, UserCircle, 
  Settings, LogOut, Bell, FileText, ClipboardList
} from "lucide-react";

export type SidebarRole = "ALUNO" | "PROFESSOR" | "ADMIN";

interface SidebarProps {
  role: SidebarRole;
}

const getLinks = (role: SidebarRole) => {
  switch (role) {
    case "ALUNO":
      return [
        { href: "/student", label: "Dashboard", icon: LayoutDashboard },
        { href: "/student/courses", label: "Minhas Disciplinas", icon: Book },
        { href: "/student/activities", label: "Atividades", icon: ClipboardList },
        { href: "/student/grades", label: "Boletim", icon: FileText },
        { href: "/student/profile", label: "Perfil", icon: UserCircle },
      ];
    case "PROFESSOR":
      return [
        { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
        { href: "/teacher/classes", label: "Minhas Disciplinas", icon: Book },
        { href: "/teacher/activities", label: "Atividades", icon: ClipboardList },
        { href: "/teacher/grades", label: "Notas e Frequência", icon: FileText },
      ];
    case "ADMIN":
      return [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/students", label: "Alunos", icon: GraduationCap },
        { href: "/admin/teachers", label: "Professores", icon: Users },
        { href: "/admin/courses", label: "Cursos e Turmas", icon: Book },
        { href: "/admin/settings", label: "Configurações", icon: Settings },
      ];
  }
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = getLinks(role);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 space-x-3">
        <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">A</div>
        <span className="text-white font-bold text-xl tracking-tight">AVA Acadêmica</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
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
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-slate-800">
        <Link 
          href="/" 
          className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          Sair
        </Link>
      </div>
    </aside>
  );
}
