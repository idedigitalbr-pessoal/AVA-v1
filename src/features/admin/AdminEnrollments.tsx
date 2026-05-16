"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { studentsService } from "@/lib/api";

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const users = await studentsService.getAll();
        const allEnrolls = [];
        for (const user of users) {
           const studentEnrolls = await studentsService.getEnrollments(user.id);
           allEnrolls.push(...studentEnrolls.map(e => ({
              ...e,
              studentName: user.name
           })));
        }
        setEnrollments(allEnrolls);
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
          <h1 className="text-2xl font-bold text-slate-900">Matrículas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie as matrículas de alunos em cursos e disciplinas.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Matrícula
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por aluno ou curso..." className="pl-9" />
          </div>
          <select className="border border-slate-200 rounded-md text-sm px-3 py-2 bg-white flex-1 max-w-[200px] outline-none focus:ring-2 focus:ring-indigo-500">
             <option value="">Status: Todos</option>
             <option value="Confirmada">Confirmada</option>
             <option value="Pendente">Pendente</option>
             <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Curso ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações Rápidas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Carregando...</TableCell>
                </TableRow>
              ) : enrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-4">Nenhuma matrícula encontrada</TableCell>
                </TableRow>
              ) : enrollments.map((enr) => (
                <TableRow key={enr.id}>
                  <TableCell className="font-medium text-slate-900">{enr.studentName}</TableCell>
                  <TableCell className="text-slate-500">{enr.courseId}</TableCell>
                  <TableCell className="text-slate-500">{new Date(enr.enrolledAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={enr.status === 'ACTIVE' ? 'success' : enr.status === 'PENDING' ? 'warning' : 'destructive'}>
                      {enr.status === 'ACTIVE' ? 'Confirmada' : enr.status === 'CANCELLED' ? 'Cancelada' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {enr.status === 'PENDING' && (
                      <>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
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
