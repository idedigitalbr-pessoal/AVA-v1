"use client";

import { useState } from "react";
import { TeacherClassSubject } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Search, Users, BookOpen, Layers, CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface TeacherCoursesProps {
  classSubjects: TeacherClassSubject[];
}

export function TeacherCourses({ classSubjects }: TeacherCoursesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredSubjects = classSubjects.filter(cs => {
    const matchesSearch = 
      cs.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.className.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "ALL" || cs.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Ativa</Badge>;
      case 'ARCHIVED': return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Encerrada</Badge>;
      case 'DRAFT': return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Rascunho</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Disciplinas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie suas turmas, conteúdos e avaliações.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Buscar por disciplina, curso ou turma..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todas</SelectItem>
              <SelectItem value="ACTIVE">Ativas</SelectItem>
              <SelectItem value="ARCHIVED">Encerradas</SelectItem>
              <SelectItem value="DRAFT">Rascunho</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubjects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-100 shadow-sm">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-900 mb-1">Nenhuma disciplina encontrada</p>
            <p>Tente ajustar os filtros ou termo de busca.</p>
          </div>
        ) : (
          filteredSubjects.map((cs) => (
            <Card key={cs.id} className="flex flex-col hover:shadow-md transition-all border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs bg-white text-indigo-700 border-indigo-200">
                    {cs.academicYear}
                  </Badge>
                  {getStatusBadge(cs.status)}
                </div>
                <CardTitle className="text-xl line-clamp-1">{cs.subjectName}</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-700 mt-1">
                  {cs.courseName} • {cs.className}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-4 flex-1">
                <div className="space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <Users className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                      <p className="text-xs text-slate-500">Alunos</p>
                      <p className="font-semibold text-slate-900">{cs.totalStudents}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                      <p className="text-xs text-slate-500">Média</p>
                      <p className="font-semibold text-emerald-600">{cs.averageGrade.toFixed(1)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <Layers className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                      <p className="text-xs text-slate-500">Módulos</p>
                      <p className="font-semibold text-slate-900">{cs.totalModules}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
                      <AlertCircle className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                      <p className="text-xs text-amber-600">Pendentes</p>
                      <p className="font-semibold text-amber-700">{cs.pendingActivities}</p>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Aulas publicadas</span>
                      <span>{cs.publishedClasses} de {cs.publishedClasses + cs.draftClasses}</span>
                    </div>
                    <Progress value={cs.progressPercentage} className="h-2 bg-slate-100" />
                    {cs.draftClasses > 0 && (
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {cs.draftClasses} aulas em rascunho
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2 mt-auto rounded-b-xl">
                 <Link href={`/professor/disciplinas/${cs.id}`} className="col-span-2">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                    Acessar Sala de Aula
                  </Button>
                </Link>
                <Link href={`/professor/disciplinas/${cs.id}/conteudo`}>
                  <Button variant="outline" size="sm" className="w-full border-slate-200">Conteúdo</Button>
                </Link>
                <Link href={`/professor/disciplinas/${cs.id}/atividades`}>
                  <Button variant="outline" size="sm" className="w-full border-slate-200 relative">
                    Avaliações
                    {cs.pendingActivities > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                        {cs.pendingActivities}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
