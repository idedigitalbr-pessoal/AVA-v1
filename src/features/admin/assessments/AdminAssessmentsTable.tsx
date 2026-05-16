"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Assessment } from "@/types";
import { assessmentsService } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Eye, Ban, CheckCircle, FileText, CheckSquare, ListChecks } from "lucide-react";
import { AdminDataTable, AdminStatusBadge, AdminEmptyState } from "../components";

interface AdminAssessmentsTableProps {
  type: 'ASSIGNMENT' | 'QUIZ' | 'EXAM';
  data: Assessment[];
  refetch: () => void;
}

export function AdminAssessmentsTable({ type, data, refetch }: AdminAssessmentsTableProps) {
  
  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      await action();
      toast.success(successMsg);
      refetch();
    } catch {
      toast.error("Erro ao executar ação.");
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'ASSIGNMENT': return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'QUIZ': return <ListChecks className="w-4 h-4 text-emerald-600" />;
      case 'EXAM': return <CheckSquare className="w-4 h-4 text-emerald-600" />;
    }
  }

  const renderStatus = (s: Assessment) => {
    if (s.status === 'DRAFT') return <AdminStatusBadge status="Rascunho" variant="warning" />;
    if (s.status === 'ARCHIVED') return <AdminStatusBadge status="Arquivado" variant="destructive" />;
    return <AdminStatusBadge status="Publicado" variant="success" />;
  };

  const renderActionMenu = (a: Assessment) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => toast.info(`Detalhes: ${a.title}`)}>
            <Eye className="mr-2 h-4 w-4" /> Detalhes & Tentativas
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info(`Editar: ${a.title}`)}>
            <Edit className="mr-2 h-4 w-4" /> Editar Avaliação
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => toast.info(`Correções Pendentes de ${a.title}`)}>
            <FileText className="mr-2 h-4 w-4" /> Correções Pendentes
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {a.status === 'PUBLISHED' ? (
            <DropdownMenuItem onClick={() => handleAction(() => assessmentsService.unpublishAssessment(a.id), "Avaliação despublicada.")}>
              <Ban className="mr-2 h-4 w-4 text-amber-600" /> Despublicar
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleAction(() => assessmentsService.publishAssessment(a.id), "Avaliação publicada.")}>
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" /> Publicar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Título", accessor: (a: Assessment) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center flex-shrink-0">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium text-slate-900 cursor-pointer hover:underline" onClick={() => toast.info('Abrir detalhes')}>{a.title}</p>
          <p className="text-xs text-slate-500">{a.description || 'Sem descrição'}</p>
        </div>
      </div>
    )},
    { header: "Vencimento", accessor: (a: Assessment) => <span className="text-slate-500">{a.dueDate ? new Date(a.dueDate).toLocaleDateString('pt-BR') : '-'}</span> },
    { header: "Valor", accessor: (a: Assessment) => <span className="font-mono text-slate-600">{a.maxScore} pts</span> },
    { header: "Status", accessor: (a: Assessment) => renderStatus(a) },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  if (data.length === 0) {
    return (
      <AdminEmptyState 
        title="Nenhuma avaliação encontrada"
        description="Ainda não há avaliações cadastradas com os filtros selecionados."
      />
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <AdminDataTable 
        columns={columns}
        data={data}
        keyExtractor={(a) => a.id}
        renderMobileCard={(a) => (
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-slate-900 text-sm">{a.title}</p>
                <p className="text-xs text-slate-500 mt-1">{a.dueDate ? new Date(a.dueDate).toLocaleDateString('pt-BR') : '-'}</p>
              </div>
              {renderStatus(a)}
            </div>
            <div className="flex justify-end mt-2 pt-2 border-t border-slate-100">
              {renderActionMenu(a)}
            </div>
          </div>
        )}
      />
    </div>
  );
}
