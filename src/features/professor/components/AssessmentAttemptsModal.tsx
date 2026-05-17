"use client";

import { useState, useEffect } from "react";
import { TeacherAssessmentAttempt } from "@/types";
import { ApiService } from "@/lib/api";
import { X, Search, FileSignature } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AssessmentAttemptsModal({
  assessmentId,
  onClose
}: {
  assessmentId: string;
  onClose: () => void;
}) {
  const [attempts, setAttempts] = useState<TeacherAssessmentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const data = await ApiService.teachers.getAssessmentAttempts(assessmentId);
        setAttempts(data);
      } catch {
        toast.error("Erro ao carregar tentativas.");
      } finally {
        setIsLoading(false);
      }
    };
    loadAttempts();
  }, [assessmentId]);

  const filtered = attempts.filter(a => a.studentName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tentativas dos Alunos</h2>
            <p className="text-sm text-slate-500 mt-0.5">Acompanhe quem já realizou a avaliação.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por nome do aluno..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          {isLoading ? (
            <div className="text-center py-8 text-slate-500">Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileSignature className="w-12 h-12 mx-auto mb-3 opacity-20" />
              Nenhuma tentativa encontrada.
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Aluno</th>
                    <th className="py-3 px-4 font-semibold">Iniciou em</th>
                    <th className="py-3 px-4 font-semibold">Finalizou em</th>
                    <th className="py-3 px-4 font-semibold text-right">Nota</th>
                    <th className="py-3 px-4 font-semibold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-800">{a.studentName}</td>
                      <td className="py-3 px-4 text-slate-600">{new Date(a.startedAt).toLocaleString('pt-BR')}</td>
                      <td className="py-3 px-4 text-slate-600">
                        {a.completedAt ? new Date(a.completedAt).toLocaleString('pt-BR') : 'Em andamento'}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-800">
                        {a.score !== undefined ? `${a.score.toFixed(1)}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium h-8">
                          Ver Respostas
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
