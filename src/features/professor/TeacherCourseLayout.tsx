"use client";

import { Course } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, ClipboardList, TrendingUp, Users, MessageSquare } from "lucide-react";

interface TeacherCourseLayoutProps {
  course: Course;
  children: React.ReactNode;
}

export function TeacherCourseLayout({ course, children }: TeacherCourseLayoutProps) {
  const pathname = usePathname();
  const baseUrl = `/professor/disciplinas/${course.id}`;

  const tabs = [
    { href: baseUrl, label: "Visão Geral", icon: LayoutDashboard, exact: true },
    { href: `${baseUrl}/conteudo`, label: "Conteúdo", icon: BookOpen },
    { href: `${baseUrl}/atividades`, label: "Atividades", icon: ClipboardList },
    { href: `${baseUrl}/notas`, label: "Notas", icon: TrendingUp },
    { href: `${baseUrl}/frequencia`, label: "Frequência", icon: Users },
    { href: `${baseUrl}/mensagens`, label: "Mensagens", icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
        <p className="text-slate-500 text-sm mt-1">Gerenciamento da disciplina</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <nav className="flex overflow-x-auto border-b border-slate-200 font-medium">
          {tabs.map((tab) => {
            const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm transition-colors whitespace-nowrap",
                  isActive
                    ? "border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
