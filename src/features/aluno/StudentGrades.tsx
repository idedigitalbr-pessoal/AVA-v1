"use client";

import { StudentGradebookEntry } from "@/types/student";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";

interface StudentGradesProps {
  gradebook: StudentGradebookEntry[];
}

export function StudentGrades({ gradebook }: StudentGradesProps) {
  const [semester, setSemester] = useState("2026.1");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mockDownloadPdf = () => {
    toast.success("Baixando PDF do Boletim...");
    setTimeout(() => {
       toast.info("Download concluído (simulação).");
    }, 1500);
  };

  const calculateOverall = () => {
    if (gradebook.length === 0) return { avgGrade: 0, avgAttendance: 0, passed: 0, atRisk: 0 };
    let sumGrades = 0, sumAttendance = 0, passed = 0, atRisk = 0;
    gradebook.forEach(g => {
       sumGrades += g.finalGrade;
       sumAttendance += g.attendancePercentage;
       if (g.status === 'APROVADO') passed++;
       if (g.status === 'RECUPERACAO' || g.status === 'REPROVADO') atRisk++;
       if (g.status === 'EM_ANDAMENTO' && g.finalGrade < 70) atRisk++;
    });
    return {
       avgGrade: (sumGrades / gradebook.length).toFixed(1),
       avgAttendance: (sumAttendance / gradebook.length).toFixed(1),
       passed,
       atRisk
    };
  };

  const stats = calculateOverall();

  const getBimScore = (grades: any[], type: string) => {
    const grade = grades.find(g => g.type === type);
    return grade ? grade.score : null;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meu Boletim</h1>
          <p className="text-slate-500 text-sm mt-1">Acompanhe seu desempenho acadêmico, notas e histórico.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
           <Select value={semester} onValueChange={setSemester}>
             <SelectTrigger className="w-[160px] bg-white border-slate-200">
               <SelectValue placeholder="Semestre" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="2026.1">2026.1</SelectItem>
               <SelectItem value="2025.2">2025.2</SelectItem>
               <SelectItem value="2025.1">2025.1</SelectItem>
             </SelectContent>
           </Select>
           <Button onClick={mockDownloadPdf} variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100">
             <Download className="w-4 h-4 mr-2" /> Baixar PDF
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-indigo-800 opacity-80 mb-2">Média Geral</h3>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <p className="text-3xl font-bold text-indigo-900">{(Number(stats.avgGrade) / 10).toFixed(1).replace('.', ',')}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-emerald-800 opacity-80 mb-2">Freq. Geral</h3>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <p className="text-3xl font-bold text-emerald-900">{stats.avgAttendance}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-blue-800 opacity-80 mb-2">Aprovadas</h3>
            <p className="text-3xl font-bold text-blue-900">{stats.passed}</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-amber-50/50 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <h3 className="text-sm font-medium text-amber-800 opacity-80 mb-2">Em Risco</h3>
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${stats.atRisk > 0 ? "text-amber-500" : "text-amber-300"}`} />
              <p className="text-3xl font-bold text-amber-900">{stats.atRisk}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
         <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle className="text-lg">Disciplinas do Período</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
           <div className="overflow-x-auto">
             <Table>
                <TableHeader>
                   <TableRow className="bg-slate-50 hover:bg-slate-50">
                     <TableHead className="w-[200px]">Disciplina</TableHead>
                     <TableHead className="w-[120px]">Professor</TableHead>
                     <TableHead className="text-center">Bim 1</TableHead>
                     <TableHead className="text-center">Bim 2</TableHead>
                     <TableHead className="text-center">Rec/Final</TableHead>
                     <TableHead className="text-center">Média</TableHead>
                     <TableHead className="text-center">Freq.</TableHead>
                     <TableHead className="text-center">Situação</TableHead>
                     <TableHead className="w-[50px]"></TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {gradebook.map((g) => {
                     const isExpanded = expandedId === g.subjectId;
                     const b1 = getBimScore(g.grades, 'B1');
                     const b2 = getBimScore(g.grades, 'B2');
                     const rec = getBimScore(g.grades, 'REC') || getBimScore(g.grades, 'FINAL');
                     
                     return (
                        <div key={g.subjectId} className="contents">
                           <TableRow className={`cursor-pointer hover:bg-slate-50 transition-colors ${isExpanded ? 'bg-slate-50' : ''}`} onClick={() => setExpandedId(isExpanded ? null : g.subjectId)}>
                              <TableCell className="font-semibold text-slate-900 truncate max-w-[200px]" title={g.subjectName}>{g.subjectName}</TableCell>
                              <TableCell className="text-sm text-slate-500 truncate max-w-[120px]">{g.teacherName.replace('Prof. ', '').replace('Profa. ', '')}</TableCell>
                              <TableCell className="text-center font-medium text-slate-700">{b1 !== null ? (b1/10).toFixed(1) : '-'}</TableCell>
                              <TableCell className="text-center font-medium text-slate-700">{b2 !== null ? (b2/10).toFixed(1) : '-'}</TableCell>
                              <TableCell className="text-center font-medium text-slate-500">{rec !== null ? (rec/10).toFixed(1) : '-'}</TableCell>
                              <TableCell className={`text-center font-bold ${(g.finalGrade/10) >= 7 ? 'text-emerald-600' : 'text-amber-600'}`}>{(g.finalGrade/10).toFixed(1)}</TableCell>
                              <TableCell className={`text-center font-bold ${g.attendancePercentage >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{g.attendancePercentage}%</TableCell>
                              <TableCell className="text-center">
                                <Badge 
                                  variant={g.status === 'APROVADO' ? 'success' : g.status === 'REPROVADO' ? 'destructive' : 'warning'}
                                  className={`text-xs ${
                                    g.status === 'APROVADO' ? 'bg-emerald-100 text-emerald-800 border-none' :
                                    g.status === 'REPROVADO' ? 'bg-red-100 text-red-800 border-none' :
                                    g.status === 'RECUPERACAO' ? 'bg-orange-100 text-orange-800 border-none' :
                                    'bg-indigo-100 text-indigo-800 border-none'
                                  }`}
                                 >
                                  {g.status === 'APROVADO' ? 'Aprovado' : g.status === 'REPROVADO' ? 'Reprovado' : g.status === 'EM_ANDAMENTO' ? 'Cursando' : 'Rec'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                 <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                   {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                 </Button>
                              </TableCell>
                           </TableRow>
                           {isExpanded && (
                             <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                                <TableCell colSpan={9} className="p-0">
                                   <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 animate-in slide-in-from-top-2">
                                      {/* Notas */}
                                      <div>
                                         <h4 className="font-semibold text-slate-900 mb-4 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-500" /> Detalhamento de Notas</h4>
                                         <div className="space-y-3">
                                            {g.grades.length > 0 ? g.grades.map(grade => (
                                              <div key={grade.assessmentId} className="flex flex-col p-3 border border-slate-200 rounded-lg bg-white">
                                                 <div className="flex justify-between items-center mb-2">
                                                    <span className="font-medium text-slate-800 text-sm">{grade.assessmentName} {grade.type && <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold">{grade.type}</span>}</span>
                                                    <span className="font-bold text-slate-900">{(grade.score/10).toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ {(grade.maxScore/10).toFixed(1)}</span></span>
                                                 </div>
                                                 {grade.feedback && (
                                                   <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 italic">&quot; {grade.feedback} &quot;</p>
                                                 )}
                                              </div>
                                            )) : <p className="text-sm text-slate-500 text-center py-4">Nenhuma nota lançada.</p>}
                                         </div>
                                      </div>
                                      {/* Frequência */}
                                      <div>
                                         <h4 className="font-semibold text-slate-900 mb-4 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-500" /> Detalhamento de Frequência</h4>
                                         <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
                                               <p className="text-3xl font-black text-rose-500 mb-1">{g.totalAbsences || 0}</p>
                                               <p className="text-xs text-slate-600 font-medium">Faltas Computadas</p>
                                            </div>
                                            <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
                                               <p className="text-3xl font-black text-emerald-500 mb-1">{g.attendancePercentage}%</p>
                                               <p className="text-xs text-slate-600 font-medium">Taxa de Presença</p>
                                            </div>
                                         </div>
                                         <p className="text-xs text-slate-500 mt-4 text-center">Limite de ausências: 25% da carga horária.</p>
                                      </div>
                                   </div>
                                </TableCell>
                             </TableRow>
                           )}
                        </div>
                     )
                   })}
                   {gradebook.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={9} className="h-32 text-center text-slate-500">Nenhum dado encontrado para o semestre selecionado.</TableCell>
                     </TableRow>
                   )}
                </TableBody>
             </Table>
           </div>
         </CardContent>
      </Card>
    </div>
  );
}

