"use client";

import { useState, useEffect } from "react";
import { TeacherClassStudent } from "@/types";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Mail, UserCircle, AlertTriangle, CheckCircle2, MoreVertical, BookOpen, Clock } from "lucide-react";
import { TeacherStudentDetailDrawer } from "./components/TeacherStudentDetailDrawer";
import { StudentMessageModal } from "./components/StudentMessageModal";

export function TeacherStudentsManager({ classSubjectId }: { classSubjectId: string }) {
  const [students, setStudents] = useState<TeacherClassStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      try {
        const data = await ApiService.teachers.getClassStudents(classSubjectId);
        setStudents(data);
      } catch {
        toast.error("Erro ao carregar alunos.");
      } finally {
        setIsLoading(false);
      }
    };
    loadStudents();
  }, [classSubjectId]);

  const handleOpenDetail = (id: string) => {
    setSelectedStudentId(id);
    setIsDrawerOpen(true);
  };

  const handleOpenMessage = (id: string) => {
    setSelectedStudentId(id);
    setIsMessageOpen(true);
  };

  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'HIGH': return <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Alto Risco</span>;
      case 'MEDIUM': return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Risco Médio</span>;
      case 'LOW': return <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Risco Leve</span>;
      default: return <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Sem Risco</span>;
    }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.registration.includes(search);
    const matchRisk = riskFilter === 'ALL' || s.riskStatus === riskFilter;
    const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchSearch && matchRisk && matchStatus;
  });

  if (isLoading) return <div className="p-8 text-center text-slate-500">Carregando alunos...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Alunos da Disciplina</h1>
          <p className="text-slate-500 mt-1">Acompanhe o desempenho, frequência e risco acadêmico.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nome ou RA..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-slate-200 bg-slate-50"
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v || 'ALL')}>
            <SelectTrigger className="border-slate-200 bg-white">
              <SelectValue placeholder="Risco Acadêmico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Riscos</SelectItem>
              <SelectItem value="HIGH">Alto Risco</SelectItem>
              <SelectItem value="MEDIUM">Risco Médio</SelectItem>
              <SelectItem value="LOW">Risco Leve</SelectItem>
              <SelectItem value="NONE">Sem Risco</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[180px]">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || 'ALL')}>
            <SelectTrigger className="border-slate-200 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os Status</SelectItem>
              <SelectItem value="ACTIVE">Ativos</SelectItem>
              <SelectItem value="DROPPED">Desistentes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Aluno</th>
                <th className="py-3 px-4 font-semibold text-center">Frequência</th>
                <th className="py-3 px-4 font-semibold text-center">Média Atual</th>
                <th className="py-3 px-4 font-semibold text-center">Progresso</th>
                <th className="py-3 px-4 font-semibold text-center">Risco</th>
                <th className="py-3 px-4 font-semibold text-center">Ativ. Pendentes</th>
                <th className="py-3 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{s.name}</div>
                        <div className="text-xs text-slate-500">RA: {s.registration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-medium ${s.attendancePct < 75 ? 'text-red-600' : 'text-slate-700'}`}>
                      {s.attendancePct}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-medium ${s.currentAverage < 6 ? 'text-red-600' : 'text-slate-700'}`}>
                      {s.currentAverage.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="w-24 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${s.contentProgress}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{s.contentProgress}%</div>
                  </td>
                  <td className="py-3 px-4 text-center justify-center flex">
                    {getRiskBadge(s.riskStatus)}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 font-medium">
                    {s.pendingActivitiesCount > 0 ? (
                      <span className="text-amber-600">{s.pendingActivitiesCount} pendentes</span>
                    ) : (
                      <span className="text-emerald-600">Em dia</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="sm" onClick={() => handleOpenMessage(s.studentId)} className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600" title="Enviar Mensagem">
                         <Mail className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="sm" onClick={() => handleOpenDetail(s.studentId)} className="h-8 border border-slate-200 text-indigo-600 hover:bg-indigo-50 font-medium px-3">
                         Detalhes
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <UserCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    Nenhum aluno encontrado correspondente aos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDrawerOpen && selectedStudentId && (
        <TeacherStudentDetailDrawer
          classSubjectId={classSubjectId}
          studentId={selectedStudentId}
          onClose={() => { setIsDrawerOpen(false); setSelectedStudentId(null); }}
        />
      )}

      {isMessageOpen && selectedStudentId && (
        <StudentMessageModal
          classSubjectId={classSubjectId}
          studentId={selectedStudentId}
          onClose={() => { setIsMessageOpen(false); setSelectedStudentId(null); }}
        />
      )}
    </div>
  );
}
