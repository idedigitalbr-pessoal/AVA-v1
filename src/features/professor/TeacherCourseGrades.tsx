"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Save, Download, FileSpreadsheet, Filter } from "lucide-react";
import { TeacherGradebook, GradebookAssessment, StudentGrade } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ApiService } from "@/lib/api";

type SituationTheme = {
  label: string;
  color: string;
};

const getSituationTheme = (situation: string): SituationTheme => {
  switch (situation) {
    case 'APROVADO': return { label: 'Aprovado', color: 'bg-emerald-100 text-emerald-700' };
    case 'RECUPERACAO': return { label: 'Recuperação', color: 'bg-amber-100 text-amber-700' };
    case 'REPROVADO': return { label: 'Reprovado', color: 'bg-red-100 text-red-700' };
    case 'EM_ANDAMENTO': return { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700' };
    default: return { label: 'Desconhecido', color: 'bg-slate-100 text-slate-700' };
  }
};

export function TeacherCourseGrades({ classSubjectId, initialGradebook }: { classSubjectId: string, initialGradebook: TeacherGradebook }) {
  const [gradebook, setGradebook] = useState(initialGradebook);
  const [search, setSearch] = useState("");
  const [situationFilter, setSituationFilter] = useState("ALL");
  const [isSaving, setIsSaving] = useState(false);

  const calculateFinalAndSituation = (studentArgs: StudentGrade): StudentGrade => {
    const student = { ...studentArgs };
    let totalScore = 0;
    let totalWeight = 0;
    let hasPending = false;

    gradebook.assessments.forEach(ass => {
      const grade = student.grades[ass.id];
      if (grade !== undefined && grade !== null && grade >= 0) {
        totalScore += (grade / ass.maxGrade) * 10 * ass.weight;
        totalWeight += ass.weight;
      } else {
        hasPending = true;
      }
    });

    const finalGrade = totalWeight > 0 ? (totalScore / totalWeight) : 0;
    student.finalGrade = parseFloat(finalGrade.toFixed(1));

    if (hasPending) {
      student.situation = 'EM_ANDAMENTO';
    } else {
      if (student.finalGrade >= 7.0) student.situation = 'APROVADO';
      else if (student.finalGrade >= 4.0) student.situation = 'RECUPERACAO';
      else student.situation = 'REPROVADO';
    }

    return student;
  };

  const handleGradeChange = (studentId: string, assessmentId: string, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    
    setGradebook(prev => {
      const newStudents = prev.students.map(s => {
        if (s.studentId === studentId) {
          const updatedS = { ...s, grades: { ...s.grades, [assessmentId]: numValue } };
          return calculateFinalAndSituation(updatedS);
        }
        return s;
      });
      return { ...prev, students: newStudents };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await ApiService.teachers.saveGradebook(classSubjectId, gradebook);
      toast.success("Notas salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar notas.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    toast.info("Iniciando exportação CSV...");
    try {
      const url = await ApiService.teachers.exportGradebook(classSubjectId);
      // Simulate download
      setTimeout(() => {
        toast.success("Planilha exportada com sucesso.");
      }, 500);
    } catch(err) {
      toast.error("Erro ao exportar.");
    }
  };

  const filteredStudents = gradebook.students.filter(s => {
    const matchesSearch = s.studentName.toLowerCase().includes(search.toLowerCase()) || 
                          s.email.toLowerCase().includes(search.toLowerCase());
    const matchesSituation = situationFilter === "ALL" || s.situation === situationFilter;
    return matchesSearch && matchesSituation;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Diário de Notas</h2>
          <p className="text-sm text-slate-500 mt-1">Gerencie as avaliações e lance as notas da disciplina.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} className="text-slate-600 font-medium border-slate-200">
            <Download className="mr-2 h-4 w-4 text-slate-400" /> Exportar .csv
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm">
            <Save className="mr-2 h-4 w-4" /> {isSaving ? "Salvando..." : "Salvar Notas"}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex-1 w-full max-w-sm">
          <Input 
            placeholder="Buscar por nome ou e-mail do aluno..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 shadow-sm"
          />
        </div>
        <div className="w-[200px]">
          <Select value={situationFilter} onValueChange={(val) => setSituationFilter(val || 'ALL')}>
            <SelectTrigger className="border-slate-200 shadow-sm font-medium text-slate-700">
              <SelectValue placeholder="Situação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas as situações</SelectItem>
              <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
              <SelectItem value="APROVADO">Aprovado</SelectItem>
              <SelectItem value="RECUPERACAO">Recuperação</SelectItem>
              <SelectItem value="REPROVADO">Reprovado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200 rounded-t-xl">
            <TableRow>
              <TableHead className="w-[250px] font-semibold text-slate-700">Aluno</TableHead>
              {gradebook.assessments.map(ass => (
                <TableHead key={ass.id} className="min-w-[120px]">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-800">{ass.name}</span>
                    <span className="text-[11px] font-medium text-slate-500">Peso {ass.weight} • Máx. {ass.maxGrade}</span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[120px] text-right font-semibold text-slate-700">Média Final</TableHead>
              <TableHead className="w-[140px] text-center font-semibold text-slate-700">Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={gradebook.assessments.length + 3} className="text-center py-8 text-slate-500">
                  Nenhum aluno encontrado para os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : filteredStudents.map((s) => {
              const sitTheme = getSituationTheme(s.situation);
              return (
                <TableRow key={s.studentId} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <div className="font-medium text-slate-900">{s.studentName}</div>
                    <div className="text-xs text-slate-500">{s.email}</div>
                  </TableCell>
                  {gradebook.assessments.map(ass => (
                    <TableCell key={ass.id}>
                      <Input 
                        type="number" 
                        min="0" max={ass.maxGrade} step="0.5" 
                        placeholder="-"
                        className="w-20 text-center font-medium border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 h-9"
                        value={s.grades[ass.id] ?? ''} 
                        onChange={(e) => handleGradeChange(s.studentId, ass.id, e.target.value)} 
                      />
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <span className="font-bold text-lg text-slate-900 tabular-nums">
                      {s.finalGrade.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold ${sitTheme.color}`}>
                      {sitTheme.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
