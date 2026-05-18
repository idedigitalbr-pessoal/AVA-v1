"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExamStatus, Exam } from "./types";
import { Laptop, Calendar, CheckCircle2, Clock, XCircle, FileText, Lock, PlayCircle, Eye } from "lucide-react";
import { useStudentExams } from "@/hooks/use-queries";

export function getExamStatusConfig(status: ExamStatus) {
  switch (status) {
    case "DISPONIVEL": return { label: "Disponível", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <PlayCircle className="w-3.5 h-3.5" /> };
    case "AGENDADA": return { label: "Agendada", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Calendar className="w-3.5 h-3.5" /> };
    case "EM_ANDAMENTO": return { label: "Em Andamento", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <Clock className="w-3.5 h-3.5" /> };
    case "CONCLUIDA": return { label: "Concluída", color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    case "EXPIRADA": return { label: "Expirada", color: "bg-slate-100 text-slate-500 border-slate-200", icon: <XCircle className="w-3.5 h-3.5" /> };
    case "BLOQUEADA": return { label: "Bloqueada", color: "bg-red-100 text-red-700 border-red-200", icon: <Lock className="w-3.5 h-3.5" /> };
  }
}

function ExamCard({ exam }: { exam: Exam }) {
  const config = getExamStatusConfig(exam.status);

  return (
    <Card className={`border-slate-200 shadow-sm transition-shadow hover:shadow-md ${exam.status === 'BLOQUEADA' ? 'opacity-70 grayscale' : ''}`}>
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold ${config.color}`}>
                {config.icon} {config.label}
              </Badge>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{exam.discipline}</span>
            </div>
            <h3 className="font-bold text-xl text-slate-800">{exam.title}</h3>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm flex gap-4 shrink-0">
            <div>
              <p className="text-xs text-slate-500 font-medium">Duração</p>
              <p className="font-bold text-slate-800">{exam.durationMinutes} min</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Questões</p>
              <p className="font-bold text-slate-800">{exam.totalQuestions}</p>
            </div>
            {exam.score !== undefined && (
              <div>
                <p className="text-xs text-slate-500 font-medium">Nota</p>
                <p className={`font-bold ${exam.score >= 7 ? 'text-emerald-600' : 'text-red-600'}`}>{exam.score.toFixed(1)} <span className="text-slate-400 font-normal text-xs">/ {exam.maxScore}</span></p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 space-y-1">
            {exam.status === "AGENDADA" && exam.scheduledDate ? (
              <p className="flex items-center gap-1.5 font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
                <Calendar className="w-3.5 h-3.5" /> Agendada para: {exam.scheduledDate}
              </p>
            ) : (
              <>
                <p>Disponível de: <span className="font-medium text-slate-700">{exam.startDate}</span></p>
                <p>Até: <span className="font-medium text-slate-700">{exam.endDate}</span></p>
              </>
            )}
          </div>
          
          <div className="w-full sm:w-auto">
            {exam.status === "DISPONIVEL" && (
              <Link href={`/portal/aluno/provas-online/${exam.id}`}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <PlayCircle className="w-4 h-4 mr-2" /> Acessar Prova
                </Button>
              </Link>
            )}
            {exam.status === "AGENDADA" && (
              <Link href={`/portal/aluno/provas-online/${exam.id}`}>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" /> Ver Detalhes
                </Button>
              </Link>
            )}
            {exam.status === "CONCLUIDA" && (
              <Link href={`/portal/aluno/provas-online/${exam.id}/resultado`}>
                <Button variant="secondary" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700">
                  <FileText className="w-4 h-4 mr-2" /> Ver Resultado
                </Button>
              </Link>
            )}
            {exam.status === "BLOQUEADA" && (
              <Button disabled variant="outline" className="w-full">
                <Lock className="w-4 h-4 mr-2" /> Indisponível
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ExamDashboard() {
  const { data: examsData, isLoading } = useStudentExams();
  const [activeTab, setActiveTab] = useState("pendentes");

  const exams = examsData || [];

  const pendingExams = exams.filter((e: any) => e.status === "DISPONIVEL" || e.status === "AGENDADA" || e.status === "EM_ANDAMENTO");
  const completedExams = exams.filter((e: any) => e.status === "CONCLUIDA");
  const otherExams = exams.filter((e: any) => e.status === "EXPIRADA" || e.status === "BLOQUEADA");

  if (isLoading) return <div className="p-8 text-center text-slate-500">Carregando provas...</div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pendentes" onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-slate-200 mb-6">
          <TabsList className="bg-transparent border-b-0 h-10 p-0 space-x-6 gap-0 justify-start w-full overflow-x-auto rounded-none">
            <TabsTrigger 
              value="pendentes" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 font-medium text-slate-500 data-[state=active]:text-indigo-600"
            >
              Pendentes ({pendingExams.length})
            </TabsTrigger>
            <TabsTrigger 
              value="concluidas" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 font-medium text-slate-500 data-[state=active]:text-indigo-600"
            >
              Concluídas ({completedExams.length})
            </TabsTrigger>
            <TabsTrigger 
              value="outras" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-0 font-medium text-slate-500 data-[state=active]:text-indigo-600"
            >
              Outras ({otherExams.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pendentes" className="mt-0 space-y-4 outline-none">
          {pendingExams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
               <Laptop className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <h3 className="text-slate-500 font-medium">Nenhuma prova pendente</h3>
            </div>
          ) : (
            pendingExams.map(exam => <ExamCard key={exam.id} exam={exam} />)
          )}
        </TabsContent>

        <TabsContent value="concluidas" className="mt-0 space-y-4 outline-none">
          {completedExams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
               <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <h3 className="text-slate-500 font-medium">Nenhuma prova concluída ainda</h3>
            </div>
          ) : (
            completedExams.map(exam => <ExamCard key={exam.id} exam={exam} />)
          )}
        </TabsContent>

        <TabsContent value="outras" className="mt-0 space-y-4 outline-none">
          {otherExams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
               <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
               <h3 className="text-slate-500 font-medium">Sem registros</h3>
            </div>
          ) : (
            otherExams.map(exam => <ExamCard key={exam.id} exam={exam} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
