"use client";

import { TeacherClassSubject } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  TrendingUp, 
  Users, 
  MessageSquare,
  UserCheck,
  FileQuestion,
  BarChart,
  Settings,
  Eye,
  GraduationCap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TeacherCourseLayoutProps {
  classSubject: TeacherClassSubject;
  children: React.ReactNode;
}

export function TeacherCourseLayout({ classSubject, children }: TeacherCourseLayoutProps) {
  const pathname = usePathname();
  const baseUrl = `/professor/disciplinas/${classSubject.id}`;

  const tabs = [
    { href: baseUrl, label: "Visão Geral", icon: LayoutDashboard, exact: true },
    { href: `${baseUrl}/conteudo`, label: "Conteúdo", icon: BookOpen },
    { href: `${baseUrl}/atividades`, label: "Atividades", icon: ClipboardList },
    { href: `${baseUrl}/quizzes`, label: "Provas & Quizzes", icon: FileQuestion },
    { href: `${baseUrl}/notas`, label: "Notas", icon: TrendingUp },
    { href: `${baseUrl}/frequencia`, label: "Frequência", icon: UserCheck }, // using UserCheck for attendance
    { href: `${baseUrl}/alunos`, label: "Alunos", icon: Users },
    { href: `${baseUrl}/mensagens`, label: "Mensagens", icon: MessageSquare },
    { href: `${baseUrl}/relatorios`, label: "Relatórios", icon: BarChart },
    { href: `${baseUrl}/configuracoes`, label: "Configurações", icon: Settings },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Ativa</Badge>;
      case 'ARCHIVED': return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Encerrada</Badge>;
      case 'DRAFT': return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Rascunho</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-indigo-700 bg-indigo-50 border-indigo-200 font-semibold px-2.5">
                  {classSubject.academicYear}
                </Badge>
                {getStatusBadge(classSubject.status)}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{classSubject.subjectName}</h1>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-slate-600 text-sm font-medium">
                <span className="flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {classSubject.courseName}</span>
                <span className="text-slate-300">•</span>
                <span>{classSubject.className}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {classSubject.totalStudents} Alunos</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-3 min-w-[200px]">
              <Button variant="outline" className="hidden sm:flex border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                <Eye className="w-4 h-4 mr-2" />
                Pré-visualizar como aluno
              </Button>
              <div className="w-full">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5 mt-2">
                  <span className="font-semibold">Progresso: {classSubject.publishedClasses} de {classSubject.publishedClasses + classSubject.draftClasses} aulas</span>
                  <span>{classSubject.progressPercentage}%</span>
                </div>
                <Progress value={classSubject.progressPercentage} className="h-2 bg-slate-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full overflow-x-auto scroolbar-hide">
          <nav className="flex min-w-max border-b border-slate-200 px-2 sm:px-4">
            {tabs.map((tab) => {
              const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center px-4 py-3.5 text-sm font-medium transition-all relative whitespace-nowrap",
                    isActive
                      ? "text-indigo-700"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/50 rounded-t-lg"
                  )}
                >
                  <Icon className={cn("h-4 w-4 mr-2", isActive ? "text-indigo-600" : "text-slate-400")} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {children}
      </div>
    </div>
  );
}
