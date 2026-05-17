"use client";

import { useMemo } from "react";
import { AdminPageHeader } from "../components";
import { AdminAssessmentsTabs } from "./AdminAssessmentsTabs";
import { mockAssessments } from "@/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ListChecks, CheckSquare, Activity, Settings, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AdminAssessmentsDashboard() {
  const router = useRouter();

  // Mocks for dashboard
  const totalAssessments = mockAssessments.length;
  const activeExams = mockAssessments.filter(a => a.type === 'EXAM' && a.status === 'PUBLISHED').length;
  const activeQuizzes = mockAssessments.filter(a => a.type === 'QUIZ' && a.status === 'PUBLISHED').length;
  const pendingActivities = mockAssessments.filter(a => a.type === 'ASSIGNMENT' && a.status === 'DRAFT').length; // example logic
  const totalQuestions = 45; // arbitrary mock value

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Avaliações e Atividades" 
        description="Gestão centralizada de provas, quizzes, trabalhos e banco de questões."
        action={
          <Button onClick={() => toast.info("Relatório geral exportado com sucesso!")}>
            <FileText className="w-4 h-4 mr-2" /> Exportar Relatório
          </Button>
        }
      />

      <AdminAssessmentsTabs />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total de Avaliações</CardTitle>
            <Activity className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalAssessments}</div>
            <p className="text-xs text-slate-500 mt-1">Registradas no sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Provas Ativas</CardTitle>
            <CheckSquare className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeExams}</div>
            <p className="text-xs text-slate-500 mt-1">Sendo aplicadas agora</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Quizzes Ativos</CardTitle>
            <ListChecks className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeQuizzes}</div>
            <p className="text-xs text-slate-500 mt-1">Abertos para resolução</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Atividades Pendentes</CardTitle>
            <Settings className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingActivities}</div>
            <p className="text-xs text-slate-500 mt-1">Trabalhos em rascunho</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Questões no Banco</CardTitle>
            <Database className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalQuestions}</div>
            <p className="text-xs text-slate-500 mt-1">Prontas para uso</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links ou Atalhos */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
         <h2 className="text-lg font-semibold text-slate-900 mb-4">Acesso Rápido</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/avaliacoes/provas')}>
             <CheckSquare className="w-6 h-6 text-indigo-600" />
             <span>Gerenciar Provas</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/avaliacoes/quizzes')}>
             <ListChecks className="w-6 h-6 text-blue-600" />
             <span>Gerenciar Quizzes</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/avaliacoes/atividades')}>
             <Settings className="w-6 h-6 text-amber-600" />
             <span>Gerenciar Atividades</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/avaliacoes/banco-questoes')}>
             <Database className="w-6 h-6 text-slate-600" />
             <span>Banco de Questões</span>
           </Button>
         </div>
      </div>
    </div>
  );
}
