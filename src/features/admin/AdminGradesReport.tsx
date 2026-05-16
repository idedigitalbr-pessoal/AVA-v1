"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

export function AdminGradesReport() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = [
    { id: '1', name: 'Ana Souza', course: 'Engenharia de Software', subject: 'Lógica de Programação', p1: 8.5, p2: 7.0, proj: 9.0, final: 8.3, status: 'APROVADO' },
    { id: '2', name: 'Bruno Mendes', course: 'Engenharia de Software', subject: 'Lógica de Programação', p1: 6.0, p2: 5.5, proj: 7.5, final: 6.5, status: 'EXAME' },
    { id: '3', name: 'Carla Dias', course: 'Ciência da Computação', subject: 'Banco de Dados', p1: 9.5, p2: 10.0, proj: 10.0, final: 9.8, status: 'APROVADO' },
    { id: '4', name: 'Daniel Costa', course: 'Sistemas de Informação', subject: 'Redes de Computadores', p1: 4.5, p2: 3.5, proj: 6.0, final: 4.8, status: 'REPROVADO' },
    { id: '5', name: 'Eduarda Lima', course: 'Engenharia de Software', subject: 'Estrutura de Dados', p1: 7.5, p2: 8.0, proj: 8.5, final: 8.0, status: 'APROVADO' },
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
          <h1 className="text-2xl font-bold text-slate-900">Relatório de Notas</h1>
          <p className="text-slate-500 text-sm mt-1">Visão geral do desempenho e situação acadêmica dos alunos.</p>
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
            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={() => toast.success("Download do relatório CSV iniciado.")}>
                <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
               <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Curso / Disciplina</TableHead>
                  <TableHead className="text-center">Avaliações</TableHead>
                  <TableHead className="text-center">Média Final</TableHead>
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
                   <TableCell className="text-center">
                      <div className="text-xs text-slate-500 space-y-1">
                         <div>P1: <span className="font-medium text-slate-700">{d.p1.toFixed(1)}</span></div>
                         <div>P2: <span className="font-medium text-slate-700">{d.p2.toFixed(1)}</span></div>
                         <div>Proj: <span className="font-medium text-slate-700">{d.proj.toFixed(1)}</span></div>
                      </div>
                   </TableCell>
                   <TableCell className="text-center">
                      <span className={`text-lg font-bold ${
                         d.final >= 7 ? 'text-emerald-600' : 
                         d.final >= 5 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                         {d.final.toFixed(1)}
                      </span>
                   </TableCell>
                   <TableCell>
                      <Badge variant="outline" className={
                        d.status === 'APROVADO' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 
                        d.status === 'EXAME' ? 'text-amber-600 border-amber-200 bg-amber-50' : 
                        'text-red-600 border-red-200 bg-red-50'
                      }>
                         {d.status}
                      </Badge>
                   </TableCell>
                 </TableRow>
               ))}
               {filteredData.length === 0 && (
                 <TableRow>
                   <TableCell colSpan={5} className="text-center py-8">
                     <EmptyState 
                       title="Nenhum resultado encontrado" 
                       description="Tente ajustar os filtros de busca para encontrar o aluno ou disciplina."
                     />
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
