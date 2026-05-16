"use client";

import { ActivityDetail, ActivitySubmission } from "./types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Link as LinkIcon, Download, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TeacherSubmissionsViewProps {
  activity: ActivityDetail;
  submissions: ActivitySubmission[];
  onBack: () => void;
  onGrade: (submission: ActivitySubmission) => void;
}

export function TeacherSubmissionsView({ activity, submissions, onBack, onGrade }: TeacherSubmissionsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubmissions = submissions.filter(s => 
    s.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Entregas: {activity.title}</h2>
            <p className="text-sm text-slate-500">Valor máximo: {activity.maxScore} pontos</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar aluno..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Anexo / Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium text-slate-900">{sub.studentName}</TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {new Date(sub.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {sub.fileUrl ? (
                       <a href="#" className="flex items-center text-sm text-indigo-600 hover:underline">
                         <Download className="h-3 w-3 mr-1" /> Arquivo
                       </a>
                    ) : sub.content.startsWith('http') ? (
                       <a href={sub.content} target="_blank" rel="noreferrer" className="flex items-center text-sm text-blue-600 hover:underline">
                         <LinkIcon className="h-3 w-3 mr-1" /> Link
                       </a>
                    ) : (
                       <span className="text-sm text-slate-500 flex items-center">
                         <FileText className="h-4 w-4 mr-1 text-slate-400" /> Texto
                       </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sub.status === 'GRADED' ? 'success' : sub.status === 'SUBMITTED' ? 'warning' : 'destructive'} className="text-[10px]">
                      {sub.status === 'GRADED' ? 'Corrigido' : sub.status === 'SUBMITTED' ? 'Enviado' : 'Atrasado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700">
                    {sub.grade !== undefined ? `${sub.grade} / ${activity.maxScore}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => onGrade(sub)} variant="ghost" size="sm" className="text-indigo-600">
                       {sub.status === 'GRADED' ? 'Revisar Nota' : 'Corrigir'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredSubmissions.length === 0 && (
                <TableRow>
                   <TableCell colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                      Nenhuma entrega encontrada.
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
