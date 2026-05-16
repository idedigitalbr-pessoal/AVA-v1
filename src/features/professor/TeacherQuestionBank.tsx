"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Edit2, Trash2 } from "lucide-react";

export function TeacherQuestionBank({ questions }: { questions: any[] }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Banco de Questões</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie questões para utilizar em avaliações.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar questão..." className="pl-9" />
        </div>
        <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Questão
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
             <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead className="text-right">Ação</TableHead>
             </TableRow>
          </TableHeader>
          <TableBody>
             {questions.map((q) => (
               <TableRow key={q.id}>
                 <TableCell className="font-medium text-slate-900">{q.title}</TableCell>
                 <TableCell className="text-slate-500">{q.subject}</TableCell>
                 <TableCell className="text-slate-500 text-sm">{q.type}</TableCell>
                 <TableCell>
                    <Badge variant="outline" className={
                      q.level === 'Fácil' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                      q.level === 'Médio' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                      'text-red-600 border-red-200 bg-red-50'
                    }>
                       {q.level}
                    </Badge>
                 </TableCell>
                 <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                          <Edit2 className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                 </TableCell>
               </TableRow>
             ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
