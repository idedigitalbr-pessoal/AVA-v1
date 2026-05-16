"use client";

import { DashboardStats, Activity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, CheckCircle, Clock, AlertCircle, 
  PlayCircle, Calendar as CalendarIcon, Megaphone, FileText, LayoutDashboard,
  CheckSquare, ArrowRight, Play, Settings, GraduationCap, Briefcase, Video, LifeBuoy,
  Tv, LineChart
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { StudentShortcutGrid, SideShortcutList, MOCK_LEFT_SHORTCUTS, MOCK_RIGHT_SHORTCUTS } from "./components/StudentShortcuts";
import { CampaignBanner } from "./campaigns/CampaignBanner";
import { CampaignCard } from "./campaigns/CampaignCard";
import { CampaignModal } from "./campaigns/CampaignModal";
import { MOCK_CAMPAIGNS } from "./campaigns/types";

interface StudentDashboardProps {
  stats: DashboardStats["student"];
  activities: Activity[];
}

export function StudentDashboard({ stats, activities }: StudentDashboardProps) {
  const { user } = useAuth();
  
  // Real-looking Mocks
  const LAST_ACCESSED_LESSON = { id: 1, title: "Estruturas de Repetição (While, For)", subject: "Lógica de Programação", progress: 85, duration: "45 min" };
  const OVERDUE_ACTIVITIES = [{ id: 101, title: "Lista 02 - Normalização", subject: "Banco de Dados I", daysOverdue: 2 }];
  const PENDING_QUIZZES = [{ id: 201, title: "Avaliação Parcial 1", subject: "Lógica de Programação", dueDate: "Amanhã, 23:59" }];
  const ANNOUNCEMENTS = [
    { id: 1, title: "Semana de Provas - 1º Bimestre", date: "15/05", type: "Importante" },
    { id: 2, title: "Palestra: Carreira em Tech", date: "12/05", type: "Evento" },
  ];

  const COURSE_PROGRESS = 35; // %
  const COURSE_NAME = "Análise e Desenvolvimento de Sistemas";

  // Separation of campaigns
  const mainBanner = MOCK_CAMPAIGNS.find(c => c.important);
  const sideCampaigns = MOCK_CAMPAIGNS.filter(c => !c.important);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 pb-8">
      {/* Important Campaign Modal */}
      {mainBanner && <CampaignModal campaign={mainBanner} />}
      
      {/* -------------------- COLUNA ESQUERDA -------------------- */}
      <div className="lg:col-span-1 xl:col-span-3 space-y-6">
        {/* Perfil do Aluno */}
        <Card className="border-0 shadow-sm overflow-hidden text-center">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <CardContent className="pt-0 relative px-4 pb-6">
            <div className="flex justify-center -mt-12 mb-3">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-700">
                  {user?.name?.substring(0, 2).toUpperCase() || "AL"}
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">{user?.name || "Aluno Demo"}</h2>
            <p className="text-sm text-slate-500 mt-1 capitalize">{COURSE_NAME}</p>
            <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase font-semibold">Matrícula (RA)</p>
              <p className="font-mono text-sm font-bold text-slate-800 tracking-wider">2024{user?.id?.substring(0,4) || "0001"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Atalhos */}
        <StudentShortcutGrid items={MOCK_LEFT_SHORTCUTS} />
      </div>

      {/* -------------------- ÁREA CENTRAL -------------------- */}
      <div className="lg:col-span-2 xl:col-span-6 space-y-6">
        {/* Boas-vindas */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Olá, {user?.name?.split(' ')[0] || "Estudante"}! 👋</h1>
          <p className="text-slate-500 mt-1">Bem-vindo(a) ao seu semestre 2024.1. Aqui está o resumo das suas atividades.</p>
        </div>

        {/* Banner Principal de Campanha */}
        {mainBanner && <CampaignBanner campaign={mainBanner} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progresso Geral */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center text-slate-800">
                <LineChart className="w-4 h-4 mr-2 text-indigo-500" /> Progresso do Curso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-black text-slate-900">{COURSE_PROGRESS}%</span>
                <span className="text-xs text-slate-500 mb-1 font-medium">Integralizado</span>
              </div>
              <Progress value={COURSE_PROGRESS} className="h-2.5 bg-slate-100" />
              <div className="mt-4 flex justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                 <span>Média Geral: <strong className="text-slate-800">{stats?.averageGrade?.toFixed(1) || "8.5"}</strong></span>
                 <span>Frequência: <strong className="text-emerald-600">93%</strong></span>
              </div>
            </CardContent>
          </Card>

          {/* Continue Estudando (Next Lesson) */}
          <Card className="border-0 shadow-sm bg-indigo-50/50 border-indigo-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center text-indigo-900">
                <PlayCircle className="w-4 h-4 mr-2 text-indigo-600" /> Continue Estudando
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-600">{LAST_ACCESSED_LESSON.subject}</p>
                  <p className="font-medium text-slate-900 text-sm leading-tight mt-0.5 line-clamp-1">{LAST_ACCESSED_LESSON.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Atividades e Avisos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3">
              <CardTitle className="text-base font-bold flex items-center">
                <Clock className="w-4 h-4 mr-2 text-amber-500" /> Próximas Atividades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               {OVERDUE_ACTIVITIES.map(task => (
                 <div key={task.id} className="flex gap-3 items-start border-l-2 border-red-500 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{task.title}</p>
                     <p className="text-xs text-red-600 font-medium mt-1">Atrasada há {task.daysOverdue} dias</p>
                   </div>
                 </div>
               ))}
               {PENDING_QUIZZES.map(quiz => (
                 <div key={quiz.id} className="flex gap-3 items-start border-l-2 border-indigo-500 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{quiz.title}</p>
                     <p className="text-xs text-slate-500 font-medium mt-1">Vence: {quiz.dueDate}</p>
                   </div>
                 </div>
               ))}
               {(activities || []).slice(0,1).map(act => (
                 <div key={act.id} className="flex gap-3 items-start border-l-2 border-slate-300 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{act.title}</p>
                     <p className="text-xs text-slate-500 font-medium mt-1">{act.dueDate}</p>
                   </div>
                 </div>
               ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3">
              <CardTitle className="text-base font-bold flex items-center">
                <Megaphone className="w-4 h-4 mr-2 text-indigo-500" /> Mural de Avisos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ANNOUNCEMENTS.map(ann => (
                <div key={ann.id} className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5 bg-slate-100 text-slate-500 p-1.5 rounded-md group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">{ann.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{ann.date} • {ann.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* -------------------- COLUNA DIREITA -------------------- */}
      <div className="lg:col-span-1 xl:col-span-3 space-y-6">
         {/* Campanhas Menores */}
         {sideCampaigns.length > 0 && (
           <div className="space-y-4">
             {sideCampaigns.map(camp => (
               <CampaignCard key={camp.id} campaign={camp} />
             ))}
           </div>
         )}
         
         <div>
           <h3 className="text-sm font-bold border-b border-slate-200 pb-2 text-slate-800 uppercase tracking-wider mb-4">Acesso Rápido</h3>
           <SideShortcutList items={MOCK_RIGHT_SHORTCUTS} />
         </div>
      </div>
    </div>
  );
}
