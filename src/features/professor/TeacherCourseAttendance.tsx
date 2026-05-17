"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Save, Download, Plus, Clock, AlertTriangle, Calendar as CalendarIcon, Check, X, FileText } from "lucide-react";
import { TeacherAttendanceData, AttendanceSession, AttendanceStatus, AttendanceRecord } from "@/types";
import { toast } from "sonner";
import { ApiService } from "@/lib/api";

type StatusTheme = { label: string; color: string; icon: any };

const statusMap: Record<AttendanceStatus, StatusTheme> = {
  PRESENT: { label: 'Presente', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200', icon: Check },
  ABSENT: { label: 'Falta', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200', icon: X },
  LATE: { label: 'Atraso', color: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200', icon: Clock },
  JUSTIFIED: { label: 'Justificado', color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200', icon: FileText }
};

export function TeacherCourseAttendance({ classSubjectId, initialData }: { classSubjectId: string, initialData: TeacherAttendanceData }) {
  const [data, setData] = useState(initialData);
  const [selectedSessionId, setSelectedSessionId] = useState<string | 'NEW'>(data.sessions.length > 0 ? data.sessions[0].id : 'NEW');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTopic, setNewTopic] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeSession = selectedSessionId === 'NEW' ? null : data.sessions.find(s => s.id === selectedSessionId);

  const handleCreateSession = async () => {
    if (!newDate || !newTopic) {
      toast.error("Preencha a data e o tópico da aula.");
      return;
    }
    setIsSaving(true);
    try {
      const newSessionPayload = {
        classSubjectId,
        date: newDate,
        topic: newTopic,
        isSaved: false,
        records: data.students.map(s => ({
          studentId: s.studentId,
          studentName: s.studentName,
          status: 'PRESENT' as AttendanceStatus,
          attendancePercentage: s.attendancePercentage,
        }))
      };
      const created = await ApiService.teachers.createAttendanceSession(classSubjectId, newSessionPayload);
      setData(prev => ({
        ...prev,
        sessions: [created, ...prev.sessions]
      }));
      setSelectedSessionId(created.id);
      toast.success("Sessão de chamada criada.");
    } catch(e) {
      toast.error("Erro ao criar sessão.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    if (!activeSession) return;
    setData(prev => {
      const newSessions = prev.sessions.map(sess => {
        if (sess.id === activeSession.id) {
          const newRecords = sess.records.map(rec => 
            rec.studentId === studentId ? { ...rec, status, justification: status !== 'JUSTIFIED' && status !== 'ABSENT' ? '' : rec.justification } : rec
          );
          return { ...sess, records: newRecords };
        }
        return sess;
      });
      return { ...prev, sessions: newSessions };
    });
  };

  const handleJustification = (studentId: string, val: string) => {
    if (!activeSession) return;
    setData(prev => {
      const newSessions = prev.sessions.map(sess => {
        if (sess.id === activeSession.id) {
          return {
            ...sess,
            records: sess.records.map(rec => 
              rec.studentId === studentId ? { ...rec, justification: val } : rec
            )
          };
        }
        return sess;
      });
      return { ...prev, sessions: newSessions };
    });
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    if (!activeSession) return;
    setData(prev => {
      const newSessions = prev.sessions.map(sess => {
        if (sess.id === activeSession.id) {
          return {
            ...sess,
            records: sess.records.map(rec => ({ ...rec, status, justification: '' }))
          };
        }
        return sess;
      });
      return { ...prev, sessions: newSessions };
    });
  };

  const handleSave = async () => {
    if (!activeSession) return;
    setIsSaving(true);
    try {
      await ApiService.teachers.saveAttendanceSession(activeSession.id, activeSession);
      setData(prev => ({
        ...prev,
        sessions: prev.sessions.map(s => s.id === activeSession.id ? { ...s, isSaved: true } : s)
      }));
      toast.success("Chamada salva com sucesso!");
    } catch(e) {
      toast.error("Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    toast.info("Iniciando exportação CSV...");
    try {
      const url = await ApiService.teachers.exportAttendance(classSubjectId);
      setTimeout(() => toast.success("Relatório de frequência exportado."), 500);
    } catch(err) {
      toast.error("Erro ao exportar.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 items-start">
      
      {/* Sidebar - Sessões de Frequência */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <Button 
            onClick={() => setSelectedSessionId('NEW')} 
            className="w-full mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
          >
            <Plus className="h-4 w-4 mr-2" /> Nova Chamada
          </Button>

          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Histórico de Aulas</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {data.sessions.map(sess => (
              <button
                key={sess.id}
                onClick={() => setSelectedSessionId(sess.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedSessionId === sess.id 
                    ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500' 
                    : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-semibold text-slate-800 tabular-nums">
                    {new Date(sess.date).toLocaleDateString('pt-BR')}
                  </span>
                  {sess.isSaved ? (
                     <span className="text-[10px] font-bold tracking-wider text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">SALVO</span>
                  ) : (
                     <span className="text-[10px] font-bold tracking-wider text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">RASCUNHO</span>
                  )}
                </div>
                <div className="text-xs text-slate-500 truncate">{sess.topic}</div>
              </button>
            ))}
            {data.sessions.length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-4">Nenhuma chamada registrada.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Diário de Frequência */}
      <div className="flex-1 w-full flex flex-col gap-6">
        
        {/* Header Toolbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <div>
             <h2 className="text-xl font-bold text-slate-900 tracking-tight">
               {selectedSessionId === 'NEW' ? 'Nova Sessão de Chamada' : 'Diário de Frequência'}
             </h2>
             <p className="text-sm text-slate-500 mt-1">
               {selectedSessionId === 'NEW' ? 'Configure a data e o tópico para iniciar.' : 'Controle a presença dos alunos.'}
             </p>
           </div>
           
           <div className="flex gap-2">
             <Button variant="outline" size="sm" onClick={handleExport} className="text-slate-600">
               <Download className="mr-2 h-4 w-4" /> Exportar .csv
             </Button>
           </div>
        </div>

        {selectedSessionId === 'NEW' ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-xl mx-auto w-full mt-10">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
              <CalendarIcon className="mr-2 text-indigo-500 h-5 w-5" /> Configurar Aula
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Data da Aula</label>
                <Input 
                  type="date" 
                  value={newDate} 
                  onChange={e => setNewDate(e.target.value)}
                  className="font-medium text-slate-900" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tópico abordado / Conteúdo</label>
                <Input 
                  placeholder="Ex: Introdução ao React Hooks" 
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleCreateSession} 
                disabled={isSaving}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                {isSaving ? "Criando..." : "Iniciar Chamada"}
              </Button>
            </div>
          </div>
        ) : activeSession && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleMarkAll('PRESENT')} className="text-slate-600 border-slate-200 hover:bg-slate-100">
                  <Check className="mr-2 h-4 w-4 text-emerald-500" /> Todos Presentes
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMarkAll('ABSENT')} className="text-slate-600 border-slate-200 hover:bg-slate-100">
                  <X className="mr-2 h-4 w-4 text-red-500" /> Todos Ausentes
                </Button>
              </div>
              <div className="flex items-center gap-3">
                {activeSession.isSaved && <span className="text-sm text-slate-500 hidden sm:inline-block">Última alteração salva.</span>}
                <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Chamada"}
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead className="w-[300px]">Aluno / Frequência Acumulada</TableHead>
                    <TableHead className="min-w-[400px]">Status na Aula e Justificativa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSession.records.map((rec) => {
                    const isAlert = rec.attendancePercentage < 75;
                    return (
                    <TableRow key={rec.studentId} className="hover:bg-slate-50 border-slate-100">
                      <TableCell>
                        <div className="font-semibold text-slate-900">{rec.studentName}</div>
                        <div className={`mt-1 flex items-center text-xs font-medium ${isAlert ? 'text-red-600' : 'text-slate-500'}`}>
                          {isAlert && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {rec.attendancePercentage}% de presença geral
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {(['PRESENT', 'ABSENT', 'LATE', 'JUSTIFIED'] as AttendanceStatus[]).map(status => {
                              const theme = statusMap[status];
                              const Icon = theme.icon;
                              const isActive = rec.status === status;
                              return (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(rec.studentId, status)}
                                  className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                    isActive 
                                      ? theme.color 
                                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                  }`}
                                >
                                  <Icon className={`mr-1.5 h-3 w-3 ${isActive ? '' : 'text-slate-400'}`} /> {theme.label}
                                </button>
                              );
                            })}
                          </div>
                          {(rec.status === 'ABSENT' || rec.status === 'JUSTIFIED' || rec.status === 'LATE') && (
                            <div className="mt-1">
                              <Input
                                placeholder={rec.status === 'JUSTIFIED' ? "Informe a justificativa..." : "Observação (opcional)"}
                                value={rec.justification || ''}
                                onChange={e => handleJustification(rec.studentId, e.target.value)}
                                className="h-8 text-sm max-w-sm border-slate-200 bg-slate-50 focus:bg-white"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
