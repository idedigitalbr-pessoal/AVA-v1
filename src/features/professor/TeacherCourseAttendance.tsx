"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export function TeacherCourseAttendance({ courseId, students }: { courseId: string, students: any[] }) {
  const [attendance, setAttendance] = useState(students);

  const togglePresence = (studentId: string, present: boolean) => {
    setAttendance(attendance.map(s => s.id === studentId ? { ...s, present } : s));
  };

  const updateJustification = (studentId: string, justification: string) => {
    setAttendance(attendance.map(s => s.id === studentId ? { ...s, justification } : s));
  };

  const markAll = (present: boolean) => {
    setAttendance(attendance.map(s => ({ ...s, present, justification: '' })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-lg font-bold text-slate-900">Lançamento de Frequência</h2>
        <div className="flex gap-4 items-center">
          <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-auto" />
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="mr-2 h-4 w-4" /> Salvar Chamada
          </Button>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white overflow-x-auto">
         <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => markAll(true)}>Todos Presentes</Button>
            <Button variant="outline" size="sm" onClick={() => markAll(false)}>Todos Ausentes</Button>
         </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead className="w-[200px] text-center">Status</TableHead>
              <TableHead className="w-[300px]">Justificativa (Falta)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="font-medium text-slate-900">{s.name}</div>
                  <div className="text-xs text-slate-500">{s.email}</div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-3">
                     <span className={`text-sm ${!s.present ? 'font-bold text-red-500' : 'text-slate-400'}`}>Falta</span>
                     <Switch 
                       checked={s.present} 
                       onCheckedChange={(c) => togglePresence(s.id, c)} 
                     />
                     <span className={`text-sm ${s.present ? 'font-bold text-emerald-500' : 'text-slate-400'}`}>Presença</span>
                  </div>
                </TableCell>
                <TableCell>
                  {!s.present ? (
                    <Input 
                      placeholder="Ex: Atestado médico" 
                      value={s.justification || ''}
                      onChange={(e) => updateJustification(s.id, e.target.value)}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span className="text-sm text-slate-300 italic">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
