"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { subjectsService } from "@/lib/api";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { Subject } from "@/types";

export function AdminSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await subjectsService.getAll();
        setSubjects(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Disciplinas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie o catálogo de disciplinas.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Disciplina
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por código ou nome..." className="pl-9" />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Carregando...</TableCell>
                </TableRow>
              ) : subjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhuma disciplina encontrada</TableCell>
                </TableRow>
              ) : subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-bold text-slate-700">{subject.code}</TableCell>
                  <TableCell className="font-medium text-slate-900">{subject.name}</TableCell>
                  <TableCell className="text-slate-500">{subject.workload}h</TableCell>
                  <TableCell className="text-slate-500">{subject.description || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteModal 
                       onConfirm={() => console.log('Apagar disciplina', subject.id)}
                       title="Excluir disciplina"
                       description={`Deseja excluir a disciplina ${subject.name}?`}
                    >
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ConfirmDeleteModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
