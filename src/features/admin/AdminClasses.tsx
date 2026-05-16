"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Edit2, Trash2, Users } from "lucide-react";
import { classesService, coursesService } from "@/lib/api";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { Class, Course } from "@/types";

export function AdminClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [courses, setCourses] = useState<Record<string, Course>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [classesData, coursesData] = await Promise.all([
          classesService.getAll(),
          coursesService.getAll()
        ]);
        setClasses(classesData);
        
        const coursesMap: Record<string, Course> = {};
        coursesData.forEach(c => coursesMap[c.id] = c);
        setCourses(coursesMap);
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
          <h1 className="text-2xl font-bold text-slate-900">Turmas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie as turmas ativas na instituição.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Turma
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por turma ou curso..." className="pl-9" />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Turma</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Ano Letivo</TableHead>
                <TableHead>Início</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Carregando...</TableCell>
                </TableRow>
              ) : classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhuma turma encontrada</TableCell>
                </TableRow>
              ) : classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium text-slate-900">{cls.name}</TableCell>
                  <TableCell className="text-slate-500">
                     {courses[cls.courseId]?.title || 'Curso não encontrado'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-slate-600">
                      {cls.academicYear}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {cls.startDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteModal 
                       onConfirm={() => console.log('Apagar turma', cls.id)}
                       title="Excluir turma"
                       description={`Deseja excluir a turma ${cls.name}?`}
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
