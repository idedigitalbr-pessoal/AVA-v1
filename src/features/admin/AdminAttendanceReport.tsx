"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminAttendanceReport() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: '1', name: 'Ana Souza', course: 'Engenharia de Software', subject: 'Lógica de Programação', totalClasses: 40, presences: 38, absences: 2, attendanceRate: 95 },
    { id: '2', name: 'Bruno Mendes', course: 'Engenharia de Software', subject: 'Lógica de Programação', totalClasses: 40, presences: 28, absences: 12, attendanceRate: 70 },
    { id: '3', name: 'Carla Dias', course: 'Ciência da Computação', subject: 'Banco de Dados', totalClasses: 30, presences: 30, absences: 0, attendanceRate: 100 },
    { id: '4', name: 'Daniel Costa', course: 'Sistemas de Informação', subject: 'Redes de Computadores', totalClasses: 60, presences: 30, absences: 30, attendanceRate: 50 },
    { id: '5', name: 'Eduarda Lima', course: 'Engenharia de Software', subject: 'Estrutura de Dados', totalClasses: 50, presences: 40, absences: 10, attendanceRate: 80 },
  ];

  const filteredData = mockData.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/relatorios" className="text-slate-500 hover:text-indigo-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatório de Frequência e Evasão</h1>
          <p className="text-slate-500 text-sm mt-1">Acompanhe a assiduidade dos alunos e identifique riscos de evasão.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
             placeholder="Buscar por aluno, curso ou disciplina..." 
             className="pl-9" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full sm:w-auto gap-2">
           <Button variant="outline" className="w-full sm:w-auto text-slate-600">
               <Filter className="mr-2 h-4 w-4" /> Filtros
           </Button>
           <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
               <Download className="mr-2 h-4 w-4" /> Exportar CSV
           </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
             <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Curso / Disciplina</TableHead>
                <TableHead className="text-center">Aulas (Dadas)</TableHead>
                <TableHead className="text-center">Faltas</TableHead>
                <TableHead className="text-center">% Frequência</TableHead>
                <TableHead>Situação</TableHead>
             </TableRow>
          </TableHeader>
          <TableBody>
             {filteredData.map((d) => (
               <TableRow key={d.id}>
                 <TableCell className="font-medium text-slate-900">{d.name}</TableCell>
                 <TableCell>
                    <div className="text-sm font-semibold text-slate-700">{d.subject}</div>
                    <div className="text-xs text-slate-500">{d.course}</div>
                 </TableCell>
                 <TableCell className="text-center font-medium text-slate-700">{d.totalClasses}</TableCell>
                 <TableCell className="text-center font-medium text-red-600">{d.absences}</TableCell>
                 <TableCell className="text-center">
                    <span className={`text-lg font-bold ${
                       d.attendanceRate >= 75 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                       {d.attendanceRate}%
                    </span>
                 </TableCell>
                 <TableCell>
                    <Badge variant="outline" className={
                      d.attendanceRate >= 75 ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                      'text-red-600 border-red-200 bg-red-50'
                    }>
                       {d.attendanceRate >= 75 ? 'Regular' : 'Risco de Reprovação'}
                    </Badge>
                 </TableCell>
               </TableRow>
             ))}
             {filteredData.length === 0 && (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                   Nenhum resultado encontrado.
                 </TableCell>
               </TableRow>
             )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
