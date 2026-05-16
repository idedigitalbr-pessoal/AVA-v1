"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminCreateButton, AdminFilterBar, AdminSearchInput, AdminLoadingState, AdminEmptyState, AdminStatusBadge, AdminDataTable } from "../components";
import { AdminCertificatesTabs } from "./AdminCertificatesTabs";
import { CertificateTemplate } from "@/types";
import { certificatesService } from "@/lib/api";
import { Can } from "@/lib/auth/Can";
import { Copy, Edit, FileText, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AdminCertificateTemplates() {
  const [data, setData] = useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const templates = await certificatesService.listCertificateTemplates();
      setData(templates);
    } catch {
      toast.error("Erro ao carregar templates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderActionMenu = (t: CertificateTemplate) => (
    <div className="flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-500">
          <span className="sr-only">Abrir menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => toast.info(`Editar: ${t.name}`)}>
            <Edit className="mr-2 h-4 w-4" /> Editar Template
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info(`Duplicar: ${t.name}`)}>
            <Copy className="mr-2 h-4 w-4" /> Duplicar Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { header: "Nome", accessor: (t: CertificateTemplate) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="font-medium text-slate-900">{t.name}</p>
          <p className="text-xs text-slate-500">{t.description || 'Sem descrição'}</p>
        </div>
      </div>
    )},
    { header: "Atualizado em", accessor: (t: CertificateTemplate) => <span className="text-slate-500">{new Date(t.updatedAt).toLocaleDateString('pt-BR')}</span> },
    { header: "Ações", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Templates de Certificado" 
        description="Personalize o layout e texto dos certificados." 
        action={
          <Can I="MANAGE_SYSTEM">
            <AdminCreateButton 
              label="Novo Template" 
              onClick={() => toast.success("Abertura do editor de template")} 
            />
          </Can>
        } 
      />

      <AdminCertificatesTabs />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por nome do template..." 
          />
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando templates..." />
        ) : filteredData.length === 0 ? (
          <AdminEmptyState 
            title="Nenhum template encontrado"
            description="Você ainda não criou nenhum template."
            action={<AdminCreateButton label="Novo Template" onClick={() => toast.success("Criar")} />}
          />
        ) : (
          <AdminDataTable 
            columns={columns}
            data={filteredData}
            keyExtractor={(t) => t.id}
            renderMobileCard={(t) => (
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(t.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-2 pt-2 border-t border-slate-100">
                  {renderActionMenu(t)}
                </div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
