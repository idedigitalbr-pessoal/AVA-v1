"use client";

import { useState, useEffect } from "react";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";
import { 
  BarChart, 
  Download, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { TeacherClassPerformanceReport, TeacherClassAttendanceReport, TeacherClassEngagementReport, TeacherAtRiskReport } from "@/types";

export function TeacherReportsManager({ classSubjectId }: { classSubjectId: string }) {
  const [activeTab, setActiveTab] = useState<'PERFORMANCE' | 'ATTENDANCE' | 'ENGAGEMENT' | 'RISK'>('PERFORMANCE');
  const [isLoading, setIsLoading] = useState(true);

  const [performance, setPerformance] = useState<TeacherClassPerformanceReport | null>(null);
  const [attendance, setAttendance] = useState<TeacherClassAttendanceReport | null>(null);
  const [engagement, setEngagement] = useState<TeacherClassEngagementReport | null>(null);
  const [risk, setRisk] = useState<TeacherAtRiskReport | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === 'PERFORMANCE') {
          const data = await ApiService.teachers.getClassPerformance(classSubjectId);
          setPerformance(data);
        } else if (activeTab === 'ATTENDANCE') {
          const data = await ApiService.teachers.getClassAttendanceReport(classSubjectId);
          setAttendance(data);
        } else if (activeTab === 'ENGAGEMENT') {
          const data = await ApiService.teachers.getClassEngagementReport(classSubjectId);
          setEngagement(data);
        } else if (activeTab === 'RISK') {
          const data = await ApiService.teachers.getAtRiskStudentsReport(classSubjectId);
          setRisk(data);
        }
      } catch {
        toast.error("Erro ao carregar relatório.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [classSubjectId, activeTab]);

  const handleExport = async () => {
    try {
      await ApiService.teachers.exportTeacherReport(activeTab, {});
      toast.success("Relatório exportado com sucesso.");
    } catch {
      toast.error("Erro ao exportar relatório.");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Relatórios da Turma</h1>
          <p className="text-slate-500 mt-1">Acompanhe métricas de desempenho, frequência e risco.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="text-slate-600">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setActiveTab('PERFORMANCE')}
          className={`flex-shrink-0 flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'PERFORMANCE' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
        >
          <TrendingUp className="w-4 h-4 mr-2" /> Desempenho
        </button>
        <button
          onClick={() => setActiveTab('ATTENDANCE')}
          className={`flex-shrink-0 flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'ATTENDANCE' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Clock className="w-4 h-4 mr-2" /> Frequência
        </button>
        <button
          onClick={() => setActiveTab('ENGAGEMENT')}
          className={`flex-shrink-0 flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'ENGAGEMENT' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
        >
          <Users className="w-4 h-4 mr-2" /> Engajamento
        </button>
        <button
          onClick={() => setActiveTab('RISK')}
          className={`flex-shrink-0 flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'RISK' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
        >
          <AlertTriangle className="w-4 h-4 mr-2" /> Alunos em Risco
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          Carregando relatório...
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'PERFORMANCE' && performance && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Média da Turma</div>
                  <div className="text-3xl font-bold text-slate-900">{performance.averageGrade.toFixed(1)}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Maior Nota</div>
                  <div className="text-3xl font-bold text-emerald-600">{performance.highestGrade.toFixed(1)}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Menor Nota</div>
                  <div className="text-3xl font-bold text-red-500">{performance.lowestGrade.toFixed(1)}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Aprovação</div>
                  <div className="text-3xl font-bold text-indigo-600">{performance.passingRate}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-semibold text-slate-800 mb-4 flex items-center"><BarChart className="w-4 h-4 mr-2" /> Histograma de Notas</h3>
                   <div className="space-y-3">
                     {performance.gradeDistribution.map((d, i) => (
                       <div key={i} className="flex items-center gap-3">
                         <div className="w-16 text-sm text-slate-600 font-medium">{d.range}</div>
                         <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(d.count / performance.studentsCount) * 100}%` }} />
                         </div>
                         <div className="w-10 text-right text-sm text-slate-800 font-medium">{d.count}</div>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-semibold text-slate-800 mb-4">Últimas Avaliações</h3>
                   <div className="space-y-3">
                     {performance.recentAssessments.map((a, i) => (
                       <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                         <div>
                           <div className="font-medium text-slate-800">{a.title}</div>
                           <div className="text-xs text-slate-500">{new Date(a.date).toLocaleDateString()}</div>
                         </div>
                         <div className="text-right">
                           <div className="text-lg font-bold text-slate-900">{a.average.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ {a.maxScore}</span></div>
                           <div className="text-xs text-slate-500">Média Geral</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </>
          )}

          {activeTab === 'ATTENDANCE' && attendance && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Média de Frequência</div>
                  <div className="text-3xl font-bold text-slate-900">{attendance.averageAttendancePct}%</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Aulas Realizadas</div>
                  <div className="text-3xl font-bold text-indigo-600">{attendance.totalSessions}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">100% de Presença</div>
                  <div className="text-3xl font-bold text-emerald-600">{attendance.perfectAttendanceCount}</div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-sm font-medium text-slate-500 mb-1">Abaixo de 75%</div>
                  <div className="text-3xl font-bold text-amber-500">{attendance.lowAttendanceCount}</div>
                </div>
              </div>

               <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-semibold text-slate-800 mb-4">Presença por Aula</h3>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">Data da Aula</th>
                        <th className="py-2.5 px-4 font-semibold text-right">Presentes</th>
                        <th className="py-2.5 px-4 font-semibold text-right">Faltantes</th>
                        <th className="py-2.5 px-4 font-semibold text-center">Taxa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attendance.attendanceByDate.map((a, i) => {
                        const total = a.presentCount + a.absentCount;
                        const pct = total === 0 ? 0 : Math.round((a.presentCount / total) * 100);
                        return (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-medium text-slate-800">{new Date(a.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4 text-emerald-600 text-right">{a.presentCount}</td>
                            <td className="py-3 px-4 text-red-500 text-right">{a.absentCount}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{pct}%</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                 </div>
               </div>
            </>
          )}

          {activeTab === 'ENGAGEMENT' && engagement && (
             <>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                   <div className="text-sm font-medium text-slate-500 mb-1">Total de Interações</div>
                   <div className="text-3xl font-bold text-slate-900">{engagement.totalInteractions}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                   <div className="text-sm font-medium text-slate-500 mb-1">Acessos Médios (Aluno/sem)</div>
                   <div className="text-3xl font-bold text-indigo-600">{engagement.averageAccessPerWeek.toFixed(1)}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                   <div className="text-sm font-medium text-emerald-600 mb-1">Alunos Ativos (7d)</div>
                   <div className="text-3xl font-bold text-emerald-600">{engagement.activeStudents}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                   <div className="text-sm font-medium text-slate-500 mb-1">Alunos Inativos (7d+)</div>
                   <div className="text-3xl font-bold text-red-500">{engagement.inactiveStudents}</div>
                 </div>
               </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
                 <h3 className="font-semibold text-slate-800 mb-4">Top 3 Alunos Engajados</h3>
                 <div className="space-y-3">
                   {engagement.topActiveStudents.map((s, i) => (
                     <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                           {i + 1}
                         </div>
                         <div className="font-medium text-slate-800">{s.name}</div>
                       </div>
                       <div className="text-sm font-bold text-slate-600">{s.accesses} interações</div>
                     </div>
                   ))}
                 </div>
               </div>
             </>
          )}

          {activeTab === 'RISK' && risk && (
            <>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                   <div className="text-sm font-medium text-slate-500 mb-1">Total em Risco</div>
                   <div className="text-3xl font-bold text-slate-900">{risk.totalAtRisk}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm text-center bg-red-50">
                   <div className="text-sm font-medium text-red-700 mb-1">Alto Risco</div>
                   <div className="text-3xl font-bold text-red-700">{risk.highRisk}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-amber-100 shadow-sm text-center bg-amber-50">
                   <div className="text-sm font-medium text-amber-700 mb-1">Risco Médio</div>
                   <div className="text-3xl font-bold text-amber-700">{risk.mediumRisk}</div>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-yellow-100 shadow-sm text-center bg-yellow-50">
                   <div className="text-sm font-medium text-yellow-700 mb-1">Risco Leve</div>
                   <div className="text-3xl font-bold text-yellow-700">{risk.lowRisk}</div>
                 </div>
               </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Aluno</th>
                        <th className="py-3 px-4 font-semibold">Nível</th>
                        <th className="py-3 px-4 font-semibold">Motivo</th>
                        <th className="py-3 px-4 font-semibold text-right">Ação Recomendada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {risk.students.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">{s.name}</div>
                            <div className="text-xs text-slate-500">RA: {s.registration}</div>
                          </td>
                          <td className="py-3 px-4">
                            {s.riskLevel === 'HIGH' && <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">Alto</span>}
                            {s.riskLevel === 'MEDIUM' && <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-700">Médio</span>}
                            {s.riskLevel === 'LOW' && <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">Leve</span>}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{s.reason}</td>
                          <td className="py-3 px-4 text-right">
                             <Button variant="ghost" size="sm" className="h-8 border border-slate-200 text-indigo-600 hover:bg-indigo-50 font-medium px-3">
                               Enviar Mensagem
                             </Button>
                          </td>
                        </tr>
                      ))}
                      {risk.students.length === 0 && (
                        <tr><td colSpan={4} className="py-8 text-center text-slate-500">Nenhum aluno em risco no momento.</td></tr>
                      )}
                    </tbody>
                  </table>
               </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
