"use client";

import { useEffect, useState } from "react";
import { User, RoleProfile, Role } from "@/types";
import { AdminPageHeader, AdminDataTable, AdminLoadingState, AdminEmptyState, AdminFilterBar, AdminSearchInput } from "../components";
import { userService, permissionsService } from "@/lib/api";
import { toast } from "sonner";
import { Can } from "@/lib/auth/Can";
import { Settings, Shield, UserCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AdminUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<RoleProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersData = await userService.listUsers();
      const rolesData = await permissionsService.listRoles();
      setUsers(usersData);
      setRoles(rolesData);
    } catch {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRole = async (userId: string, newRole: Role) => {
    try {
      await userService.updateUserRole(userId, newRole);
      toast.success("Perfil de acesso atualizado com sucesso.");
      fetchData(); // reload
    } catch {
      toast.error("Erro ao atualizar o perfil do usuário.");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Usuário", accessor: (u: User) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
          <UserCircle className="w-6 h-6 text-slate-400" />
        </div>
        <div>
           <p className="font-bold text-slate-900">{u.name}</p>
           <p className="text-xs text-slate-500">{u.email}</p>
        </div>
      </div>
    )},
    { header: "Perfil Atribuído", accessor: (u: User) => {
       const roleLabel = roles.find(r => r.name === u.role)?.label || u.role;
       return (
         <div className="flex items-center gap-2">
            <Shield className={`w-4 h-4 ${u.role === 'SUPER_ADMIN' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className={u.role === 'SUPER_ADMIN' ? 'font-semibold text-indigo-700' : 'text-slate-600'}>{roleLabel}</span>
         </div>
       );
    }},
    { header: "Alterar Perfil", className: "text-right", accessor: (u: User) => (
       <div className="flex justify-end min-w-[200px]">
          <Can I="MANAGE_SYSTEM">
            <Select value={u.role} onValueChange={(val) => handleChangeRole(u.id, val as Role)} disabled={u.role === 'SUPER_ADMIN'}>
               <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Selecione um perfil" />
               </SelectTrigger>
               <SelectContent>
                  {roles.map(r => (
                    <SelectItem key={r.id} value={r.name}>{r.label}</SelectItem>
                  ))}
               </SelectContent>
            </Select>
          </Can>
       </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Gerenciamento de Usuários e Perfis" 
        description="Atribua papéis e níveis de acesso aos usuários da plataforma."
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por nome ou email..." />
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando usuários..." />
        ) : filteredUsers.length === 0 ? (
          <AdminEmptyState title="Nenhum usuário encontrado" description="Revise os filtros de busca." />
        ) : (
          <AdminDataTable data={filteredUsers} columns={columns} keyExtractor={(u) => u.id} />
        )}
      </div>
    </div>
  );
}
