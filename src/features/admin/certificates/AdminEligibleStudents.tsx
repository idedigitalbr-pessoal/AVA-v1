"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminFilterBar, AdminSearchInput, AdminDataTable } from "../components";
import { AdminCertificatesTabs } from "./AdminCertificatesTabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, FileSignature, XCircle, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockEligible = [
  { id: "e1", studentName: "Ana Clara Silva", courseName: "Design de Interfaces Médicas", completion: 100, finalGrade: 9.5, minCompletion: 100, minGrade: 7.0 },
  { id: "e2", studentName: "Carlos Eduardo Mendes", courseName: "Engenharia de Software de Alta Performance", completion: 100, finalGrade: 8.0, minCompletion: 100, minGrade: 7.0 },
  { id: "e3", studentName: "Julia Rocha Pereira", courseName: "Design Gráfico Contemporâneo", completion: 100, finalGrade: 10, minCompletion: 100, minGrade: 7.0 }
];

export function AdminEligibleStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const filtered = mockEligible.filter(e => {
    const matchesSearch = e.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || e.courseName.toLowerCase().includes(courseFilter.toLowerCase());
    return matchesSearch && matchesCourse;
  });

  const handleIssue = (name: string) => {
    toast.success(`Certificado emitido com sucesso para ${name}!`);
  };

  const columns = [
    { header: "Aluno", accessor: (e: any) => <span className="font-medium text-slate-900">{e.studentName}</span> },
    { header: "Curso", accessor: (e: any) => e.courseName },
    { header: "Progresso", accessor: (e: any) => (
      <Badge variant="outline" className={e.completion >= e.minCompletion ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-600"}>
        {e.completion}%
      </Badge>
    )},
    { header: "Nota Final", accessor: (e: any) => (
      <span className={e.finalGrade >= e.minGrade ? "text-emerald-600 font-medium" : "text-amber-600"}>
        {e.finalGrade.toFixed(1)}
      </span>
    )},
    { header: "Ações", className: "text-right", accessor: (e: any) => (
      <div className="flex justify-end items-center gap-2">
        <Button size="sm" variant="default" onClick={() => handleIssue(e.studentName)}>
          Emitir Certificado
        </Button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Alunos Elegíveis" 
        description="Emita certificados para alunos que concluíram os requisitos do curso." 
      />

      <AdminCertificatesTabs />

      <div className="flex flex-col gap-6">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por aluno..." 
          />
          <div className="w-[200px]">
             <Select value={courseFilter} onValueChange={(val) => setCourseFilter(val || '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Cursos</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="engenharia">Engenharia</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </AdminFilterBar>

        <AdminDataTable 
          columns={columns}
          data={filtered}
          keyExtractor={(e) => e.id}
          emptyMessage="Nenhum aluno elegível encontrado com os filtros atuais."
        />
      </div>
    </div>
  );
}
