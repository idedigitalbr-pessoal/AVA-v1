"use client";

import { notFound, useRouter } from "next/navigation";
import { mockExams as MOCK_EXAMS } from "@/mocks/student.mock";
import { getExamStatusConfig } from "./ExamDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop, Clock, Calendar, CheckSquare, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";

export function ExamDetail({ id }: { id: string }) {
  const router = useRouter();
  const exam = MOCK_EXAMS.find(e => e.id === id);

  if (!exam) {
    notFound();
  }

  const config = getExamStatusConfig(exam.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b border-indigo-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <Badge variant="outline" className={`mb-2 px-2.5 py-0.5 flex items-center gap-1.5 uppercase tracking-wider text-xs font-bold w-fit ${config.color}`}>
               {config.icon} {config.label}
             </Badge>
             <h2 className="text-2xl font-black text-slate-900 mb-1">{exam.title}</h2>
             <p className="text-indigo-700 font-medium">{exam.discipline}</p>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-xs text-slate-500 font-medium mb-1">Duração</span>
              <span className="font-bold text-slate-800">{exam.durationMinutes} min</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <CheckSquare className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-xs text-slate-500 font-medium mb-1">Questões</span>
              <span className="font-bold text-slate-800">{exam.totalQuestions}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <FileText className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-xs text-slate-500 font-medium mb-1">Nota Máx.</span>
              <span className="font-bold text-slate-800">{exam.maxScore} pts</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-xs text-slate-500 font-medium mb-1">Expira em</span>
              <span className="font-bold text-slate-800 text-xs">{exam.endDate.split(' ')[0]}</span>
            </div>
          </div>

          <div className="space-y-4 border border-amber-200 bg-amber-50/50 p-5 rounded-xl">
            <h3 className="font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Instruções Importantes
            </h3>
            <ul className="space-y-3">
              {exam.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  {inst}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-amber-800">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                 Ao iniciar, o cronômetro não poderá ser pausado.
              </li>
              <li className="flex items-start gap-2 text-sm text-amber-800">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                 Sua prova será enviada automaticamente ao final do tempo.
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button variant="outline" onClick={() => router.push("/portal/aluno/provas-online")} className="w-full sm:w-auto">
              Voltar
            </Button>
            
            {exam.status === "DISPONIVEL" && (
              <Link href={`/portal/aluno/provas-online/${exam.id}/realizar`} className="w-full sm:w-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11">
                  Estou de Acordo, Iniciar Prova
                </Button>
              </Link>
            )}
            {exam.status === "CONCLUIDA" && (
              <Link href={`/portal/aluno/provas-online/${exam.id}/resultado`} className="w-full sm:w-auto">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11">
                  Ver Resultado
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
