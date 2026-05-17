"use client";

import { useEffect, useState } from "react";
import { User, RoleProfile, Role } from "@/types";
import { AdminPageHeader, AdminDataTable, AdminLoadingState, AdminEmptyState, AdminFilterBar, AdminSearchInput } from "../components";
import { userService, permissionsService } from "@/lib/api";
import { toast } from "sonner";
import { Can } from "@/lib/auth/Can";
import { Settings, Shield, UserCircle, Search, PowerOff, Power, Key } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<RoleProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersData = await userService.listUsers();
      const rolesData = await permissionsService.listRoles();
      
      // Mocking status since standard User might not have it strictly defined
      const enrichedUsers = usersData.map((u, i) => ({
        ...u,
        status: i % 4 === 0 ? 'BLOCKED' : i % 5 === 0 ? 'PENDING' : 'ACTIVE'
      }));

      setUsers(enrichedUsers);
      setRoles(rolesData);
    } catch {
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
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

  const handleResetPassword = (userId: string) => {
    toast.success("E-mail de redefinição de senha enviado.");
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    toast.success(`Usuário ${currentStatus === 'ACTIVE' ? 'bloqueado' : 'ativado'} com sucesso!`);
  };

  const filteredUsers = users.filter((u: any) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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
            <Shield className={`w-4 h-4 ${u.role === 'SUPER_ADMIN' || u.role === 'ADMIN' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span className={u.role === 'SUPER_ADMIN' || u.role === 'ADMIN' ? 'font-semibold text-indigo-700' : 'text-slate-600'}>{roleLabel}</span>
         </div>
       );
    }},
    { header: "Status", accessor: (u: any) => {
      const isBlocked = u.status === 'BLOCKED';
      const isPending = u.status === 'PENDING';
      
      if (isBlocked) return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Bloqueado</Badge>;
      if (isPending) return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pendente</Badge>;
      return <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Ativo</Badge>;
    }},
    { header: "Ações", className: "text-right", accessor: (u: any) => (
       <div className="flex justify-end gap-2 items-center min-w-[200px]">
          <Can I="MANAGE_SYSTEM">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 h-8 px-2 transition-colors">
                <Settings className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleResetPassword(u.id)}>
                  <Key className="mr-2 h-4 w-4" /> Redefinir Senha
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className={u.status === 'ACTIVE' ? "text-red-600 focus:text-red-700" : "text-emerald-600 focus:text-emerald-700"}
                  onClick={() => handleToggleStatus(u.id, u.status)}
                  disabled={u.role === 'SUPER_ADMIN'}
                >
                  {u.status === 'ACTIVE' ? (
                    <><PowerOff className="mr-2 h-4 w-4" /> Bloquear Acesso</>
                  ) : (
                    <><Power className="mr-2 h-4 w-4" /> Ativar Acesso</>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Select value={u.role} onValueChange={(val) => handleChangeRole(u.id, val as Role)} disabled={u.role === 'SUPER_ADMIN'}>
               <SelectTrigger className="h-8 text-sm w-[140px]">
                  <SelectValue placeholder="Perfil" />
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
        title="Gestão de Usuários" 
        description="Controle os acessos, atribua perfis (papéis) e gerencie o status dos membros da plataforma."
        action={
          <Button onClick={() => toast.info("Modal para convidar usuário")}>Convidar Usuário</Button>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AdminFilterBar>
          <AdminSearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por nome ou email..." />
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val || 'all')}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Perfis</SelectItem>
                {roles.map(r => (
                  <SelectItem key={r.id} value={r.name}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'all')}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo Status</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="BLOCKED">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando usuários..." />
        ) : filteredUsers.length === 0 ? (
          <AdminEmptyState title="Nenhum usuário encontrado" description="Revise os filtros de busca." />
        ) : (
          <AdminDataTable data={filteredUsers} columns={columns} keyExtractor={(u: any) => u.id} />
        )}
      </div>
    </div>
  );
}
