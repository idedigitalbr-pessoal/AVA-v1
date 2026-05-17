"use client";

import { useState } from "react";
import { TeacherClassOverviewData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, BookOpen, Clock, Activity, FileText, AlertTriangle, 
  MessageSquare, UserCheck, Plus, Pencil, Trash2, CheckCircle2,
  ListTodo, BellRing, Settings, FileQuestion
} from "lucide-react";
import Link from "next/link";
import { TeacherStatCard } from "./components/TeacherStatCard";

interface TeacherCourseOverviewProps {
  data: TeacherClassOverviewData;
}

export function TeacherCourseOverview({ data }: TeacherCourseOverviewProps) {
  const { classSubject, metrics, studentsAtRiskList, recentActivities, notices: initialNotices } = data;
  const [notices, setNotices] = useState(initialNotices);

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'SUBMISSION': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'QUIZ': return <FileQuestion className="w-4 h-4 text-purple-500" />;
      case 'MESSAGE': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'CONTENT': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      default: return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const getRiskActionIcon = (type: string) => {
    switch (type) {
      case 'MESSAGE': return <MessageSquare className="w-3 h-3 mr-1" />;
      case 'ATTENDANCE': return <UserCheck className="w-3 h-3 mr-1" />;
      case 'GRADE': return <Activity className="w-3 h-3 mr-1" />;
      default: return <BellRing className="w-3 h-3 mr-1" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Indicadores Principais (8 Cards) */}
      <h2 className="text-lg font-bold text-slate-900 px-1">Visão Geral da Turma</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TeacherStatCard title="Total de Alunos" value={classSubject.totalStudents} icon={Users} iconColor="text-emerald-600" />
        <TeacherStatCard title="Média da Turma" value={Number(classSubject.averageGrade.toFixed(1))} icon={Activity} iconColor="text-indigo-600" />
        <TeacherStatCard title="Frequência Média" value={metrics.averageAttendance} icon={UserCheck} iconColor="text-blue-500" />
        <TeacherStatCard title="Alunos em Risco" value={metrics.studentsAtRisk} icon={AlertTriangle} iconColor="text-rose-600" />
        
        <TeacherStatCard title="Aulas Publicadas" value={classSubject.publishedClasses} icon={BookOpen} iconColor="text-indigo-600" />
        <TeacherStatCard title="Aulas em Rascunho" value={classSubject.draftClasses} icon={FileText} iconColor="text-slate-400" />
        <TeacherStatCard title="A Avaliar" value={classSubject.pendingActivities} icon={Clock} iconColor="text-amber-500" />
        <TeacherStatCard title="Mensagens Novas" value={metrics.unreadMessages} icon={MessageSquare} iconColor="text-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Esquerda (Principal) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 2. Progresso de Conteúdo e Ações Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Progresso do Repositório</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-900">{classSubject.progressPercentage}% Concluído</span>
                  <span className="text-slate-500">{classSubject.publishedClasses} aulas de {classSubject.publishedClasses + classSubject.draftClasses}</span>
                </div>
                <Progress value={classSubject.progressPercentage} className="h-2 bg-slate-100" />
                <div className="mt-4 pt-4 border-t border-slate-100">
                   <p className="text-xs text-slate-500 mb-1">Próxima ação recomendada:</p>
                   <p className="text-sm font-medium text-indigo-700 flex items-center gap-1"><BookOpen className="w-3 h-3"/> {metrics.nextRecommendedAction}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Ações Rápidas da Disciplina</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mt-1">
                   <Link href={`/professor/disciplinas/${classSubject.id}/conteudo`} className="h-14 flex flex-col justify-center items-center gap-1 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-md text-sm font-medium transition-colors">
                     <FileText className="w-4 h-4" />Criar Aula
                   </Link>
                   <Link href={`/professor/disciplinas/${classSubject.id}/atividades`} className="h-14 flex flex-col justify-center items-center gap-1 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-md text-sm font-medium transition-colors">
                     <ListTodo className="w-4 h-4" />Nova Atividade
                   </Link>
                   <Link href={`/professor/disciplinas/${classSubject.id}/notas`} className="h-14 flex flex-col justify-center items-center gap-1 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-md text-sm font-medium transition-colors">
                     <Activity className="w-4 h-4" />Lançar Notas
                   </Link>
                   <Link href={`/professor/disciplinas/${classSubject.id}/frequencia`} className="h-14 flex flex-col justify-center items-center gap-1 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-slate-200 rounded-md text-sm font-medium transition-colors">
                     <UserCheck className="w-4 h-4" />Chamada
                   </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5. Mural da Turma */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Mural da Turma</CardTitle>
                  <CardDescription>Avisos e comunicados importantes</CardDescription>
                </div>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                  <Plus className="w-4 h-4 mr-1" /> Novo Aviso
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {notices.length === 0 ? (
                <div className="text-center py-6 text-slate-500">
                  <p className="text-sm">Nenhum aviso publicado no quadro.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notices.map(notice => (
                    <div key={notice.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 relative group">
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600"><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => handleDeleteNotice(notice.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <div className="pr-16">
                        <h4 className="font-semibold text-slate-900">{notice.title}</h4>
                        <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{notice.content}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <span>{notice.author}</span>
                          <span>•</span>
                          <span>{notice.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita (Atividade e Alertas) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 3. Alunos em Atenção */}
          <Card className="border-rose-200 bg-rose-50/30">
            <CardHeader className="pb-3 border-b border-rose-100">
              <CardTitle className="text-base flex items-center gap-2 text-rose-800">
                <AlertTriangle className="h-5 w-5" />
                Alunos em Atenção
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {studentsAtRiskList.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">Nenhum aluno em risco detectado.</p>
              ) : (
                <div className="space-y-3">
                  {studentsAtRiskList.map(item => (
                    <div key={item.studentId} className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                      <p className="font-semibold text-slate-900 text-sm">{item.studentName}</p>
                      <p className="text-xs text-rose-600 mt-0.5">{item.reason}</p>
                      <div className="mt-2 text-right">
                        <Button variant="secondary" size="sm" className="h-7 text-xs bg-rose-100 text-rose-700 hover:bg-rose-200">
                          {getRiskActionIcon(item.actionType)}
                          Avaliar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 4. Últimas Atividades (Timeline) */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Últimas Interações</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
               {recentActivities.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">Nenhuma atividade recente.</p>
              ) : (
                <div className="relative border-l-2 border-slate-100 ml-3 pl-4 space-y-5">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="relative">
                      <div className="absolute -left-[25px] top-0 rounded-full bg-white border border-slate-200 p-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{activity.date}</span>
                        <p className="text-sm font-semibold text-slate-900 leading-tight">{activity.title}</p>
                        <p className="text-xs text-slate-500">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
