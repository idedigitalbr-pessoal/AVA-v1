"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { coursesService } from "@/lib/api";
import { Can } from "@/lib/auth/Can";
import { Course } from "@/types";

export function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await coursesService.getAll();
        setCourses(data);
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
          <h1 className="text-2xl font-bold text-slate-900">Cursos</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os cursos de graduação e pós oferecidos.</p>
        </div>
        <Can I="MANAGE_COURSES">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Curso
          </Button>
        </Can>
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
                <TableHead>Nome do Curso</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Total Módulos</TableHead>
                <TableHead>Total Alunos</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Carregando...</TableCell>
                </TableRow>
              ) : courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhum curso encontrado</TableCell>
                </TableRow>
              ) : courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-bold text-slate-700">{course.title}</TableCell>
                  <TableCell className="text-slate-500 max-w-xs truncate">{course.description}</TableCell>
                  <TableCell className="text-slate-500">{course.totalModules}</TableCell>
                  <TableCell className="text-slate-500">{course.totalStudents}</TableCell>
                  <TableCell className="text-right">
                    <Can I="MANAGE_COURSES">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Can>
                    <Can I="DELETE_COURSES">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Can>
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
