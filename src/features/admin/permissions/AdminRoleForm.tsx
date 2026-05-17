"use client";

import { useEffect, useState } from "react";
import { RoleProfile, Permission } from "@/types";
import { AdminPageHeader, AdminLoadingState } from "../components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { permissionsService } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { Can } from "@/lib/auth/Can";

// Available permission groups modeled towards RBAC
const PERMISSION_GROUPS = [
  { group: 'Dashboard', module: 'dashboard', keys: ['dashboard.view'] },
  { group: 'Usuários e Perfis', module: 'users', keys: ['users.view', 'users.create', 'users.edit', 'users.delete', 'users.manage'] },
  { group: 'Configurações', module: 'settings', keys: ['settings.view', 'settings.manage'] },
  { group: 'Alunos', module: 'students', keys: ['students.view', 'students.create', 'students.edit', 'students.delete', 'students.export'] },
  { group: 'Professores', module: 'teachers', keys: ['teachers.view', 'teachers.create', 'teachers.edit', 'teachers.delete'] },
  { group: 'Cursos', module: 'courses', keys: ['courses.view', 'courses.create', 'courses.edit', 'courses.delete', 'courses.manage'] },
  { group: 'Turmas', module: 'classes', keys: ['classes.view', 'classes.create', 'classes.edit', 'classes.delete'] },
  { group: 'Disciplinas', module: 'subjects', keys: ['subjects.view', 'subjects.create', 'subjects.edit', 'subjects.delete'] },
  { group: 'Matrículas', module: 'enrollments', keys: ['enrollments.view', 'enrollments.create', 'enrollments.edit', 'enrollments.delete'] },
  { group: 'Avaliações', module: 'assessments', keys: ['assessments.view', 'assessments.create', 'assessments.edit', 'assessments.delete', 'assessments.grade'] },
  { group: 'Certificados', module: 'certificates', keys: ['certificates.view', 'certificates.issue', 'certificates.manage'] },
  { group: 'Relatórios', module: 'reports', keys: ['reports.view', 'reports.export'] },
];

export function AdminRoleForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [label, setLabel] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    async function load() {
      if (id) {
        try {
          const role = await permissionsService.getRoleById(id);
          setLabel(role.label);
          setName(role.name);
          setDescription(role.description || "");
          
          // Using existing permissions if it matches the legacy format, but allow expansion
          setSelectedPermissions(role.permissions);
        } catch {
          toast.error("Erro ao carregar perfil.");
          router.push('/admin/perfis');
        }
      }
      setLoading(false);
    }
    load();
  }, [id, router]);

  const togglePermission = (perm: Permission) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(prev => prev.filter(p => p !== perm));
    } else {
      setSelectedPermissions(prev => [...prev, perm]);
    }
  };

  const selectGroup = (keys: string[]) => {
    const allSelected = keys.every(k => selectedPermissions.includes(k as Permission));
    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(p => !keys.includes(p as Permission)));
    } else {
      const newPerms = [...selectedPermissions];
      keys.forEach(k => {
        if (!newPerms.includes(k as Permission)) newPerms.push(k as Permission);
      });
      setSelectedPermissions(newPerms);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await permissionsService.updateRolePermissions(id, selectedPermissions);
        toast.success("Permissões atualizadas com sucesso!");
      } else {
        await permissionsService.createRole({ label, name: name as any, description, permissions: selectedPermissions });
        toast.success("Perfil criado com sucesso!");
        router.push("/admin/perfis");
      }
    } catch {
      toast.error("Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingState text="Carregando dados..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/admin/perfis')} className="h-10 w-10 shrink-0">
           <ArrowLeft className="h-4 w-4" />
        </Button>
        <AdminPageHeader 
          title={id ? "Editar Perfil" : "Novo Perfil"} 
          description={id ? "Edite as permissões associadas a este perfil." : "Crie um novo nível de acesso ao sistema."}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
         {/* Configurações básicas */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 xl:col-span-1 space-y-6 h-fit sticky top-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
               <ShieldCheck className="w-5 h-5 text-indigo-600" />
               <h2 className="font-bold text-slate-900">Detalhes do Perfil</h2>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome de Exibição</label>
                  <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Secretaria" disabled={!!id} />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Código (Identificador)</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: SECRETARY" className="uppercase font-mono" disabled={!!id} />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva brevemente o propósito deste perfil." className="resize-none h-24" />
               </div>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={saving}>
               {saving ? "Salvando..." : <><Save className="w-4 h-4 mr-2" /> Salvar Perfil</>}
            </Button>
         </div>

         {/* Permissões */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
               <div>
                  <h2 className="font-bold text-slate-900">Matriz de Permissões</h2>
                  <p className="text-sm text-slate-500 mt-1">Marque as ações de CRUD por módulo que este perfil pode realizar.</p>
               </div>
               <div className="text-xs border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-md text-indigo-700 font-medium">
                  {selectedPermissions.length} selecionadas
               </div>
            </div>

            <div className="space-y-6">
               {PERMISSION_GROUPS.map((group, idx) => {
                  const allSelected = group.keys.every(k => selectedPermissions.includes(k as Permission));
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                       <div className="bg-slate-50 p-3 px-4 flex items-center justify-between border-b border-slate-200">
                          <span className="font-semibold text-slate-800">{group.group}</span>
                          <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 font-medium" onClick={() => selectGroup(group.keys)}>
                             {allSelected ? 'Desmarcar Actions' : 'Marcar Actions'}
                          </Button>
                       </div>
                       <div className="p-4 flex flex-wrap gap-3">
                          {group.keys.map(key => {
                            const isChecked = selectedPermissions.includes(key as Permission);
                            const actionName = key.split('.')[1] || key; // e.g. "view", "create"
                            
                            // Transform action keyword into human readable action for better UX
                            const actionMap: Record<string, string> = {
                              'view': 'Visualizar',
                              'create': 'Criar',
                              'edit': 'Editar',
                              'delete': 'Excluir',
                              'export': 'Exportar',
                              'manage': 'Gerenciar',
                              'issue': 'Emitir',
                              'grade': 'Dar Notas'
                            };

                            const labelName = actionMap[actionName] || actionName;

                            return (
                               <label key={key} className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-md cursor-pointer transition-colors select-none ${isChecked ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                                  <input 
                                    type="checkbox" 
                                    className="hidden" // hide default checkbox since we're making it look like a toggle button
                                    checked={isChecked}
                                    onChange={() => togglePermission(key as Permission)}
                                  />
                                  <span className={`text-sm font-medium`}>{labelName}</span>
                               </label>
                            );
                          })}
                       </div>
                    </div>
                  );
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
