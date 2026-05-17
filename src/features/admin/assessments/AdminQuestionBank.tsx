"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminCreateButton, AdminFilterBar, AdminSearchInput, AdminDataTable } from "../components";
import { AdminAssessmentsTabs } from "./AdminAssessmentsTabs";
import { Can } from "@/lib/auth/Can";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Copy, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for question bank
const mockQuestions = [
  {
    id: "q1",
    text: "O que é React?",
    type: "Múltipla Escolha",
    difficulty: "Fácil",
    subject: "Desenvolvimento Web",
    tags: ["Frontend", "React"],
  },
  {
    id: "q2",
    text: "Explique a diferença entre let e const.",
    type: "Dissertativa",
    difficulty: "Médio",
    subject: "Lógica de Programação",
    tags: ["JavaScript", "Fundamentos"],
  },
  {
    id: "q3",
    text: "Qual padrão arquitetural separa dados, interface e controle?",
    type: "Múltipla Escolha",
    difficulty: "Difícil",
    subject: "Engenharia de Software",
    tags: ["Arquitetura", "MVC"],
  }
];

export function AdminQuestionBank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const filteredQuestions = mockQuestions.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = difficultyFilter === "all" || q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAction = (msg: string) => toast.success(msg);

  const columns = [
    { header: "Enunciado", accessor: (q: any) => (
      <div>
        <p className="font-medium text-slate-900 truncate max-w-sm">{q.text}</p>
        <p className="text-xs text-slate-500 mt-1">{q.subject}</p>
      </div>
    )},
    { header: "Tipo", accessor: (q: any) => <span className="text-slate-600 text-sm">{q.type}</span> },
    { header: "Dificuldade", accessor: (q: any) => (
      <Badge variant="outline" className={
        q.difficulty === 'Fácil' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
        q.difficulty === 'Médio' ? 'text-amber-600 border-amber-200 bg-amber-50' :
        'text-red-600 border-red-200 bg-red-50'
      }>
        {q.difficulty}
      </Badge>
    )},
    { header: "Tags", accessor: (q: any) => (
      <div className="flex gap-1 flex-wrap">
        {q.tags.map((t: string) => (
          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
        ))}
      </div>
    )},
    { header: "Ações", className: "text-right", accessor: (q: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500 ml-auto">
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAction("Visualização da questão e alternativas")}>
            <Eye className="mr-2 h-4 w-4" /> Detalhes da Questão
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Editar questão")}>
            <Edit className="mr-2 h-4 w-4" /> Editar Questão
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Questão duplicada com sucesso!")}>
            <Copy className="mr-2 h-4 w-4" /> Duplicar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("Questão arquivada.")} className="text-red-600 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Banco de Questões" 
        description="Repositório central de questões para testes, provas e exercícios." 
        action={
          <Can I="CREATE_CONTENT">
            <AdminCreateButton 
              label="Nova Questão" 
              onClick={() => toast.success("Abertura do formulário de criação da questão")} 
            />
          </Can>
        } 
      />

      <AdminAssessmentsTabs />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar pelo enunciado..." 
          />
          <div className="w-[200px]">
             <Select value={difficultyFilter} onValueChange={(val) => setDifficultyFilter(val || '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as dificuldades</SelectItem>
                  <SelectItem value="fácil">Fácil</SelectItem>
                  <SelectItem value="médio">Médio</SelectItem>
                  <SelectItem value="difícil">Difícil</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </AdminFilterBar>

        <AdminDataTable 
          columns={columns}
          data={filteredQuestions}
          keyExtractor={(q) => q.id}
        />
      </div>
    </div>
  );
}
