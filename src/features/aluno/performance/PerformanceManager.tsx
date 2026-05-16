"use client";

import { MOCK_PERFORMANCE } from "./types";
import { DisciplineProgressCard } from "./DisciplineProgressCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, BrainCircuit, Activity, GraduationCap, CheckCircle2, History, AlertTriangle, FileBarChart, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PerformanceManager() {
  const data = MOCK_PERFORMANCE;

  const criticalDisciplines = data.disciplines.filter(d => d.status === "CRITICO" || d.status === "ATENCAO");

  return (
    <div className="space-y-8">
      {/* Overview KPI Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Média Geral (GPA)</span>
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-slate-900">{data.gpa.toFixed(1)}</h2>
              <span className="text-sm text-slate-500 font-medium">/ 10</span>
            </div>
            <p className="text-xs text-slate-500">+0.2 comparação ao semestre anterior</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Frequência Geral</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className={`text-3xl font-black ${data.attendance < 75 ? 'text-red-600' : 'text-slate-900'}`}>{data.attendance}%</h2>
            </div>
            <Progress value={data.attendance} className="h-1.5 mt-2 bg-slate-100" />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status do Curso</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-slate-900">{data.courseProgress}%</h2>
              <span className="text-sm text-slate-500 font-medium">Concluído</span>
            </div>
            <Progress value={data.courseProgress} className="h-1.5 border border-slate-100 mt-2 bg-slate-100" />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Atividades</span>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-slate-900">{data.totalPendingActivities}</h2>
              <span className="text-sm text-slate-500 font-medium">pendentes</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">{data.totalCompletedActivities}</span> concluídas • <span className="text-indigo-600 font-bold">{data.totalQuizzes}</span> quizzes feios
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Disciplines */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" /> Progresso por Disciplina
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {data.disciplines.map(discipline => (
               <DisciplineProgressCard key={discipline.id} discipline={discipline} />
             ))}
          </div>
        </div>

        {/* Right Col - Side Widgets */}
        <div className="space-y-6">
          
          {/* Alertas */}
          {criticalDisciplines.length > 0 && (
            <Card className="border-red-200 shadow-sm overflow-hidden">
              <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <h3 className="font-bold text-red-900">Risco Acadêmico</h3>
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-red-100">
                  {criticalDisciplines.map(disc => (
                    <div key={disc.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-slate-800 text-sm leading-tight">{disc.name}</span>
                        <Badge variant="outline" className={`text-[10px] ${disc.status === 'CRITICO' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {disc.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Média: <span className="font-bold">{disc.grade.toFixed(1)}</span> • Frequência: <span className="font-bold">{disc.attendance}%</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recomendações */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600 shrink-0" />
                <h3 className="font-bold text-indigo-900">Mentor IA • Recomendações</h3>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-4">
                  {data.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-700 font-bold text-xs mt-0.5">
                        {i + 1}
                      </div>
                      <span className="leading-snug">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
          </Card>

          {/* Histórico Recente */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
             <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500 shrink-0" />
                <h3 className="font-bold text-slate-800">Notas Recentes</h3>
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {data.recentGrades.map((rg) => (
                    <div key={rg.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="min-w-0 flex-1 pr-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 truncate">{rg.discipline}</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">{rg.activityName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{rg.date}</p>
                      </div>
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${rg.grade >= 7 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : rg.grade >= 5 ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {rg.grade.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
