"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Save, Download } from "lucide-react";

export function TeacherCourseGrades({ courseId, students }: { courseId: string, students: any[] }) {
  const [grades, setGrades] = useState(students);

  const handleGradeChange = (studentId: string, field: string, value: string) => {
    setGrades(grades.map(s => {
      if (s.id === studentId) {
        return { ...s, [field]: value === '' ? null : parseFloat(value) };
      }
      return s;
    }));
  };

  const calculateFinal = (s: any) => {
    const p1 = s.p1 || 0;
    const p2 = s.p2 || 0;
    const proj = s.proj || 0;
    return ((p1 * 0.3) + (p2 * 0.3) + (proj * 0.4)).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Lançamento de Notas</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exportar Planilha
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="mr-2 h-4 w-4" /> Salvar Notas
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead className="w-[120px]">P1 (30%)</TableHead>
              <TableHead className="w-[120px]">P2 (30%)</TableHead>
              <TableHead className="w-[120px]">Projeto (40%)</TableHead>
              <TableHead className="w-[120px] text-right">Média Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="font-medium text-slate-900">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.email}</div>
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="0" max="10" step="0.1" 
                    className="w-20"
                    value={s.p1 ?? ''} 
                    onChange={(e) => handleGradeChange(s.id, 'p1', e.target.value)} 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="0" max="10" step="0.1" 
                    className="w-20"
                    value={s.p2 ?? ''} 
                    onChange={(e) => handleGradeChange(s.id, 'p2', e.target.value)} 
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    min="0" max="10" step="0.1" 
                    className="w-20"
                    value={s.proj ?? ''} 
                    onChange={(e) => handleGradeChange(s.id, 'proj', e.target.value)} 
                  />
                </TableCell>
                <TableCell className="text-right">
                  <span className={`font-bold text-lg ${parseFloat(calculateFinal(s)) >= 7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {calculateFinal(s)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
