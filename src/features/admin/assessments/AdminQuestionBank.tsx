"use client";

import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { AdminPageHeader, AdminCreateButton, AdminFilterBar, AdminSearchInput, AdminEmptyState } from "../components";
import { AdminAssessmentsTabs } from "./AdminAssessmentsTabs";
import { Can } from "@/lib/auth/Can";
import { useState } from "react";

export function AdminQuestionBank() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Banco de Questões" 
        description="Repositório central de questões para quizzes e provas." 
        action={
          <Can I="CREATE_CONTENT">
            <AdminCreateButton 
              label="Nova Questão" 
              onClick={() => toast.success("Abertura do formulário de questão")} 
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
            placeholder="Buscar pelo enunciado da questão..." 
          />
        </AdminFilterBar>

        <AdminEmptyState 
          title="Nenhuma questão encontrada"
          description="O repositório está vazio ou a busca não retornou resultados."
          action={<AdminCreateButton label="Nova Questão" onClick={() => toast.success("Nova Questão")} />}
        />
      </div>
    </div>
  );
}
