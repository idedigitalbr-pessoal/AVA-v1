"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminDataTable, AdminLoadingState, AdminEmptyState, AdminCreateButton } from "../components";
import { RoleProfile } from "@/types";
import { permissionsService } from "@/lib/api";
import { Can } from "@/lib/auth/Can";
import { useRouter } from "next/navigation";
import { Shield, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminRolesList() {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await permissionsService.listRoles();
        setRoles(data);
      } catch {
        toast.error("Erro ao carregar perfis.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const columns = [
    { header: "Perfil", accessor: (r: RoleProfile) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
           <p className="font-bold text-slate-900">{r.label}</p>
           <p className="text-xs text-slate-500 font-mono">{r.name}</p>
        </div>
      </div>
    )},
    { header: "Descrição", accessor: (r: RoleProfile) => <span className="text-slate-500">{r.description}</span> },
    { header: "Ações", className: "text-right", accessor: (r: RoleProfile) => (
       <div className="flex justify-end">
          <Can I="MANAGE_SYSTEM">
            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/perfis/${r.id}`)}>
               <Edit className="w-4 h-4 mr-2" /> Editar
            </Button>
          </Can>
       </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Gerenciamento de Perfis" 
        description="Configure os diferentes níveis de acesso e permissões do sistema."
        action={
          <Can I="MANAGE_SYSTEM">
            <AdminCreateButton label="Novo Perfil" onClick={() => router.push('/admin/perfis/novo')} />
          </Can>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        {loading ? (
          <AdminLoadingState text="Carregando perfis de acesso..." />
        ) : roles.length === 0 ? (
           <AdminEmptyState title="Nenhum perfil" description="Não há perfis customizados cadastrados." />
        ) : (
          <AdminDataTable data={roles} columns={columns} keyExtractor={(r) => r.id} />
        )}
      </div>
    </div>
  );
}
