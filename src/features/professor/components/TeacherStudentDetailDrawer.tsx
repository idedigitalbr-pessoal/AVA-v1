"use client";

import { useState, useEffect } from "react";
import { TeacherClassStudentDetail } from "@/types";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";
import { X, Calendar, Activity, GraduationCap, History, Bookmark, CheckCircle2, AlertCircle } from "lucide-react";

export function TeacherStudentDetailDrawer({
  classSubjectId,
  studentId,
  onClose
}: {
  classSubjectId: string;
  studentId: string;
  onClose: () => void;
}) {
  const [student, setStudent] = useState<TeacherClassStudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<'RESUMO' | 'NOTAS' | 'FREQ' | 'ATIVIDADES' | 'ACESSO'>('RESUMO');

  useEffect(() => {
    const loadDetais = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.teachers.getClassStudentDetail(classSubjectId, studentId);
        setStudent(data);
      } catch {
        toast.error("Erro ao carregar detalhes do aluno.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDetais();
  }, [classSubjectId, studentId]);

  if (isLoading) {
    return (
      <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 flex items-center justify-center border-l border-slate-100">
        <p className="text-slate-500">Carregando detalhes...</p>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-start px-6 py-5 border-b border-slate-100 bg-slate-50">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
              {student.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <div className="text-sm text-slate-500 flex gap-3 mt-1">
                <span>RA: {student.registration}</span>
                <span>•</span>
                <span>{student.email}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm border border-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-100 bg-white overflow-x-auto hide-scrollbar">
          {(['RESUMO', 'NOTAS', 'FREQ', 'ATIVIDADES', 'ACESSO'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t === 'FREQ' ? 'Frequência' : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          
          {tab === 'RESUMO' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="text-sm font-medium text-slate-500 mb-1 flex items-center"><GraduationCap className="w-4 h-4 mr-1"/> Média Atual</div>
                  <div className={`text-3xl font-bold ${student.currentAverage >= 6 ? 'text-emerald-600' : 'text-red-500'}`}>{student.currentAverage.toFixed(1)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="text-sm font-medium text-slate-500 mb-1 flex items-center"><Calendar className="w-4 h-4 mr-1"/> Frequência</div>
                  <div className={`text-3xl font-bold ${student.attendancePct >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{student.attendancePct}%</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="text-sm font-medium text-slate-500 mb-1 flex items-center"><Activity className="w-4 h-4 mr-1"/> Progresso</div>
                  <div className="text-3xl font-bold text-indigo-600">{student.contentProgress}%</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="text-sm font-medium text-slate-500 mb-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> Pendências</div>
                  <div className={`text-3xl font-bold ${student.pendingActivitiesCount > 0 ? 'text-amber-500' : 'text-emerald-600'}`}>{student.pendingActivitiesCount}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-800 flex items-center mb-4"><Bookmark className="w-4 h-4 mr-2" /> Risco Acadêmico</h3>
                <div className="text-sm text-slate-600">
                  Status atual: <span className="font-bold">{student.riskStatus}</span>
                  {student.riskStatus !== 'NONE' && (
                    <p className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg text-xs leading-relaxed">
                      O aluno apresenta indicadores de risco (baixa frequência ou nota insuficiente). Considere enviar uma mensagem de acompanhamento ou propor atividades de recuperação.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === 'NOTAS' && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Avaliação</th>
                    <th className="py-3 px-4 font-semibold">Data</th>
                    <th className="py-3 px-4 font-semibold text-right">Nota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.grades.map((g, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-medium">{g.title}</td>
                      <td className="py-3 px-4 text-slate-500">{new Date(g.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-bold ${g.score >= g.maxScore*0.6 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {g.score}
                        </span>
                        <span className="text-slate-400 text-xs ml-1">/ {g.maxScore}</span>
                      </td>
                    </tr>
                  ))}
                  {student.grades.length === 0 && (
                    <tr><td colSpan={3} className="py-6 text-center text-slate-500">Nenhuma nota registrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'FREQ' && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Data da Aula</th>
                    <th className="py-3 px-4 font-semibold text-right">Presença</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.attendanceDates.map((a, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4">{new Date(a.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        {a.present ? (
                          <span className="text-emerald-600 font-medium flex items-center justify-end"><CheckCircle2 className="w-4 h-4 mr-1"/> Presente</span>
                        ) : (
                          <span className="text-red-500 font-medium flex items-center justify-end"><AlertCircle className="w-4 h-4 mr-1"/> Faltou</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {student.attendanceDates.length === 0 && (
                    <tr><td colSpan={2} className="py-6 text-center text-slate-500">Nenhuma aula registrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'ATIVIDADES' && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Atividade</th>
                    <th className="py-3 px-4 font-semibold">Prazo</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.activities.map((a, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-medium">{a.title}</td>
                      <td className="py-3 px-4 text-slate-500">{new Date(a.dueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        {a.status === 'PENDING' && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Pendente</span>}
                        {a.status === 'SUBMITTED' && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Entregue</span>}
                        {a.status === 'GRADED' && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Avaliada ({a.score})</span>}
                      </td>
                    </tr>
                  ))}
                  {student.activities.length === 0 && (
                     <tr><td colSpan={3} className="py-6 text-center text-slate-500">Nenhuma atividade registrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'ACESSO' && (
             <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[17px] before:w-[2px] before:bg-slate-200">
               {student.accessHistory.map((h, i) => (
                 <div key={i} className="flex gap-4 relative">
                   <div className="w-9 h-9 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center shrink-0 z-10">
                     <History className="w-4 h-4 text-indigo-500" />
                   </div>
                   <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex-1">
                     <p className="text-sm font-medium text-slate-800 mb-0.5">{h.action}</p>
                     <p className="text-xs text-slate-500">{new Date(h.date).toLocaleString('pt-BR')}</p>
                   </div>
                 </div>
               ))}
               {student.accessHistory.length === 0 && (
                 <div className="text-sm text-slate-500 ml-12">Nenhum histórico encontrado.</div>
               )}
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
