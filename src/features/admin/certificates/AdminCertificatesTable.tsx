"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Certificate } from "@/types";
import { certificatesService } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Copy, Ban, Eye, Award } from "lucide-react";
import { AdminDataTable, AdminStatusBadge, AdminEmptyState, AdminCreateButton } from "../components";

interface AdminCertificatesTableProps {
  data: Certificate[];
  refetch: () => void;
}

export function AdminCertificatesTable({ data, refetch }: AdminCertificatesTableProps) {
  
  const handleAction = async (action: () => Promise<any>, successMsg: string) => {
    try {
      await action();
      toast.success(successMsg);
      refetch();
    } catch {
      toast.error("Erro ao executar ação.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copiado para a área de transferência.");
  };

  const renderStatus = (s: Certificate) => {
    if (s.status === 'EXPIRED') return <AdminStatusBadge status="Expirado" variant="destructive" />;
    if (s.status === 'REVOKED') return <AdminStatusBadge status="Revogado" variant="destructive" />;
    return <AdminStatusBadge status="Emitido" variant="success" />;
  };

  const renderActionMenu = (c: Certificate) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => toast.info(`Pré-visualizando certificado ${c.code}`)}>
            <Eye className="mr-2 h-4 w-4" /> Visualizar Certificado
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copyToClipboard(c.url)}>
            <Copy className="mr-2 h-4 w-4" /> Copiar Link de Validação
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />

          {c.status === 'ISSUED' && (
            <DropdownMenuItem onClick={() => handleAction(() => certificatesService.revokeCertificate(c.id), "Certificado revogado.")}>
              <Ban className="mr-2 h-4 w-4 text-red-600" /> Revogar Certificado
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Código", accessor: (c: Certificate) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <Award className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="font-mono text-slate-900 font-medium">{c.code}</p>
          <p className="text-xs text-slate-500">Aluno: {c.studentId}</p>
        </div>
      </div>
    )},
    { header: "Curso", accessor: (c: Certificate) => <span className="text-slate-500">{"Curso " + c.courseId}</span> },
    { header: "Emissão", accessor: (c: Certificate) => <span className="text-slate-500">{new Date(c.issueDate).toLocaleDateString('pt-BR')}</span> },
    { header: "Status", accessor: (c: Certificate) => renderStatus(c) },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  if (data.length === 0) {
    return (
      <AdminEmptyState 
        title="Nenhum certificado emitido"
        description="Ainda não há certificados emitidos com os filtros selecionados."
        action={<AdminCreateButton label="Emitir Manualmente" onClick={() => toast.success("Emitir")} />}
      />
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <AdminDataTable 
        columns={columns}
        data={data}
        keyExtractor={(c) => c.id}
        renderMobileCard={(c) => (
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold font-mono text-slate-900 text-sm">{c.code}</p>
                <p className="text-xs text-slate-500 mt-1">{"Curso " + c.courseId}</p>
              </div>
              {renderStatus(c)}
            </div>
            <div className="flex justify-end mt-2 pt-2 border-t border-slate-100">
              {renderActionMenu(c)}
            </div>
          </div>
        )}
      />
    </div>
  );
}
