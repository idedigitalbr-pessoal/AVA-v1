"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, Clock, PlayCircle, Megaphone, FileText,
  Play, LineChart, AlertCircle, TrendingUp, TrendingDown,
  ChevronRight, CalendarIcon, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { StudentShortcutGrid, SideShortcutList } from "./components/StudentShortcuts";
import { CampaignBanner } from "./campaigns/CampaignBanner";
import { CampaignCard } from "./campaigns/CampaignCard";
import { CampaignModal } from "./campaigns/CampaignModal";
import { 
  useStudentDashboard, 
  useStudentFinancial, 
  useStudentActivities,
  useStudentAcademicHistory,
  useStudentDashboardShortcuts,
  useStudentDashboardAnnouncements
} from "@/hooks/use-queries";
import { LineChart as RechartsLineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockEvolutionData = [
  { name: 'Jan', nota: 7.5 },
  { name: 'Fev', nota: 8.2 },
  { name: 'Mar', nota: 7.8 },
  { name: 'Abr', nota: 9.0 },
  { name: 'Mai', nota: 8.6 }
];

export function StudentDashboard() {
  const { user } = useAuth();
  
  const { data: dashboard, isLoading: isLoadingDash, isError: isErrorDash } = useStudentDashboard();
  const { data: financial, isLoading: isLoadingFin } = useStudentFinancial();
  const { data: activities, isLoading: isLoadingAct } = useStudentActivities();
  const { data: academic, isLoading: isLoadingAcad } = useStudentAcademicHistory();
  const { data: shortcuts, isLoading: isLoadingShort } = useStudentDashboardShortcuts();
  const { data: announcements, isLoading: isLoadingAnn } = useStudentDashboardAnnouncements();

  const isLoading = isLoadingDash || isLoadingFin || isLoadingAct || isLoadingAcad || isLoadingShort || isLoadingAnn;

  if (isErrorDash) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-red-50/50 border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-red-900">Erro ao carregar o dashboard</h2>
        <p className="text-red-600 mt-2">Não foi possível carregar as informações da sua área. Tente recarregar a página.</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-6 border-red-200 text-red-700 hover:bg-red-50">
          Recarregar
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 pb-8">
        <div className="lg:col-span-1 xl:col-span-3 space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-2 xl:col-span-6 space-y-6">
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-1 xl:col-span-3 space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!dashboard || dashboard.stats?.activeCourses === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-xl bg-slate-50">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Nenhuma matrícula ativa</h2>
        <p className="text-slate-500 mt-2 max-w-md">Você não possui matrículas ativas no momento. Entre em contato com a secretaria ou visite o financeiro para regularizar sua situação.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/portal/aluno/cursos">
            <Button>Ver Cursos</Button>
          </Link>
          <Link href="/portal/aluno/financeiro">
            <Button variant="outline">Ir para Financeiro</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { stats, lastAccessedLesson, overdueActivities = [], pendingQuizzes = [], courseProgress, courseName, campaigns = [] } = dashboard;
  
  const mainBanner = campaigns.find((c: any) => c.important);
  const sideCampaigns = campaigns.filter((c: any) => !c.important);

  const leftShortcuts = shortcuts?.left || [];
  const rightShortcuts = shortcuts?.right || [];

  const pendingFinancial = financial?.invoices?.filter((i: any) => i.status === 'PENDING') || [];
  const nextInvoice = pendingFinancial.length > 0 ? pendingFinancial.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0] : null;

  // Derive academic info
  const myActivities = activities || [];
  const completedRecent = myActivities.filter((a: any) => a.status === 'GRADED' || a.status === 'SUBMITTED').slice(0, 2);
  const comingSoon = myActivities.filter((a: any) => a.status === 'PENDING').slice(0, 3);
  
  // Fake some best/worst disciplines for the "Meu Desempenho" block based on recentGrades or just mock
  const bestDiscipline = academic?.recentGrades?.length > 0 ? academic.recentGrades.reduce((prev: any, current: any) => (prev.grade > current.grade) ? prev : current) : null;
  const worstDiscipline = academic?.recentGrades?.length > 0 ? academic.recentGrades.reduce((prev: any, current: any) => (prev.grade < current.grade) ? prev : current) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-6 pb-8">
      {mainBanner && <CampaignModal campaign={mainBanner} />}
      
      {/* -------------------- COLUNA ESQUERDA -------------------- */}
      <div className="lg:col-span-1 xl:col-span-3 space-y-6">
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
            <p className="text-sm text-slate-500 mt-1 capitalize">{courseName}</p>
            <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase font-semibold">Matrícula (RA)</p>
              <p className="font-mono text-sm font-bold text-slate-800 tracking-wider">2024{user?.id?.substring(0,4) || "0001"}</p>
            </div>
          </CardContent>
        </Card>

        {nextInvoice && (
          <Card className="border border-red-200 shadow-sm bg-red-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Pendência Financeira</span>
              </div>
              <p className="text-sm text-slate-700 mb-3">{nextInvoice.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-500">Vencimento</p>
                  <p className="text-sm font-medium text-slate-900">{new Date(nextInvoice.dueDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <Link href="/portal/aluno/financeiro">
                  <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-100">Ver Boleto</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <StudentShortcutGrid items={leftShortcuts} />
      </div>

      {/* -------------------- ÁREA CENTRAL -------------------- */}
      <div className="lg:col-span-2 xl:col-span-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Olá, {user?.name?.split(' ')[0] || "Estudante"}! 👋</h1>
          <p className="text-slate-500 mt-1">Bem-vindo(a) ao seu semestre 2024.1. Aqui está o resumo das suas atividades.</p>
        </div>

        {mainBanner && <CampaignBanner campaign={mainBanner} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center text-slate-800">
                <LineChart className="w-4 h-4 mr-2 text-indigo-500" /> Progresso do Curso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-black text-slate-900">{courseProgress}%</span>
                <span className="text-xs text-slate-500 mb-1 font-medium">Integralizado</span>
              </div>
              <Progress value={courseProgress} className="h-2.5 bg-slate-100" />
              <div className="mt-4 flex justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                 <span>Média Geral: <strong className="text-slate-800">{stats?.averageGrade?.toFixed(1) || "8.5"}</strong></span>
                 <span>Frequência: <strong className="text-emerald-600">93%</strong></span>
              </div>
            </CardContent>
          </Card>

          {lastAccessedLesson ? (
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
                    <p className="text-xs font-semibold text-indigo-600">{lastAccessedLesson.subject}</p>
                    <p className="font-medium text-slate-900 text-sm leading-tight mt-0.5 line-clamp-1">{lastAccessedLesson.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm flex flex-col justify-center items-center text-center p-6">
               <BookOpen className="w-8 h-8 text-slate-300 mb-2" />
               <p className="text-sm font-medium text-slate-800">Pronto para começar?</p>
               <p className="text-xs text-slate-500 mt-1">Acesse suas disciplinas e inicie os estudos.</p>
               <Link href="/portal/aluno/disciplinas" className="mt-4">
                 <Button size="sm">Acessar Aulas</Button>
               </Link>
            </Card>
          )}
        </div>

        {/* Meu Desempenho */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center">
                <LineChart className="w-4 h-4 mr-2 text-indigo-500" /> Meu Desempenho
              </CardTitle>
              <Link href="/portal/aluno/desempenho">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-indigo-600">Ver Relatório Completo</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              <div className="p-5 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Destaque Positivo</p>
                {bestDiscipline ? (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900">{bestDiscipline.discipline}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Nota: {bestDiscipline.grade.toFixed(1)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Sem dados recentes.</p>
                )}
              </div>
              <div className="p-5 flex flex-col justify-center">
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Requer Atenção</p>
                 {worstDiscipline && worstDiscipline.grade < 7 ? (
                   <div className="flex gap-3">
                     <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                       <TrendingDown className="w-5 h-5 text-amber-600" />
                     </div>
                     <div>
                       <p className="font-medium text-sm text-slate-900">{worstDiscipline.discipline}</p>
                       <p className="text-xs text-slate-500 mt-0.5">Nota: {worstDiscipline.grade.toFixed(1)}</p>
                     </div>
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                     <CheckCircle2 className="w-4 h-4" /> Notas acima da média!
                   </div>
                 )}
              </div>
              <div className="p-5 flex flex-col justify-center">
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Evolução Geral</p>
                 <div className="h-16 w-full mt-1">
                   <ResponsiveContainer width="100%" height="100%">
                     <RechartsLineChart data={mockEvolutionData}>
                       <XAxis dataKey="name" hide />
                       <Tooltip 
                         contentStyle={{ borderRadius: '8px', fontSize: '12px', padding: '4px 8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                         labelStyle={{ display: 'none' }}
                       />
                       <Line type="monotone" dataKey="nota" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                     </RechartsLineChart>
                   </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3">
              <CardTitle className="text-base font-bold flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" /> Próximas Atividades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
               {overdueActivities.length === 0 && pendingQuizzes.length === 0 && comingSoon.length === 0 && (
                 <div className="text-center py-6">
                   <p className="text-sm text-slate-500">Tudo em dia! Parabéns pela organização.</p>
                 </div>
               )}
               {overdueActivities.map((task: any) => (
                 <div key={task.id} className="flex gap-3 items-start border-l-2 border-red-500 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{task.title}</p>
                     <p className="text-xs text-red-600 font-medium mt-1">Atrasada há {task.daysOverdue} dias - {task.subject}</p>
                   </div>
                 </div>
               ))}
               {pendingQuizzes.map((quiz: any) => (
                 <div key={quiz.id} className="flex gap-3 items-start border-l-2 border-amber-500 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{quiz.title}</p>
                     <p className="text-xs text-amber-600 font-medium mt-1">Vence: {quiz.dueDate}</p>
                   </div>
                 </div>
               ))}
               {comingSoon.map((act: any) => (
                 <div key={act.id} className="flex gap-3 items-start border-l-2 border-blue-400 pl-3">
                   <div className="flex-1">
                     <p className="text-sm font-semibold text-slate-800 leading-tight">{act.title}</p>
                     <p className="text-xs text-slate-500 font-medium mt-1">Vence: {new Date(act.dueDate).toLocaleDateString('pt-BR')}</p>
                   </div>
                 </div>
               ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-50 mb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center">
                  <Megaphone className="w-4 h-4 mr-2 text-indigo-500" /> Mural de Avisos
                </CardTitle>
                <Link href="/portal/aluno/avisos" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Ver Todos</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {announcements && announcements.length > 0 ? announcements.slice(0, 4).map((ann: any) => (
                <div key={ann.id} className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5 bg-slate-100 text-slate-500 p-1.5 rounded-md group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-1">{ann.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{ann.date || new Date().toLocaleDateString('pt-BR')} • {ann.type || 'Informativo'}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6">
                   <p className="text-sm text-slate-500">Nenhum aviso no momento.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* -------------------- COLUNA DIREITA -------------------- */}
      <div className="lg:col-span-1 xl:col-span-3 space-y-6">
         {sideCampaigns.length > 0 && (
           <div className="space-y-4">
             {sideCampaigns.map((camp: any) => (
               <CampaignCard key={camp.id} campaign={camp} />
             ))}
           </div>
         )}
         
         <div>
           <h3 className="text-sm font-bold border-b border-slate-200 pb-2 text-slate-800 uppercase tracking-wider mb-4">Acesso Rápido</h3>
           <SideShortcutList items={rightShortcuts} />
         </div>
      </div>
    </div>
  );
}
