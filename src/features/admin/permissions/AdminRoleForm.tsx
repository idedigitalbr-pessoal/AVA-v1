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

// Available permission groups
const PERMISSION_GROUPS = [
  { group: 'Usuários e Perfis', keys: ['MANAGE_USERS', 'MANAGE_SYSTEM'] },
  { group: 'Instituição (Alunos, Professores)', keys: ['students.read', 'students.create', 'students.update', 'students.delete', 'teachers.read'] },
  { group: 'Cursos e Turmas', keys: ['courses.manage', 'classes.manage', 'subjects.manage', 'MANAGE_COURSES'] },
  { group: 'Matrículas', keys: ['enrollments.manage'] },
  { group: 'AVA e Conteúdo', keys: ['ava.manage', 'CREATE_CONTENT', 'SUBMIT_ASSIGNMENTS'] },
  { group: 'Avaliações e Notas', keys: ['assessments.manage', 'grades.manage', 'MANAGE_GRADES'] },
  { group: 'Certificação', keys: ['certificates.manage'] },
  { group: 'Relatórios', keys: ['reports.read'] },
  { group: 'Visibilidade de Dashboard', keys: ['VIEW_DASHBOARD', 'VIEW_ADMIN_DASHBOARD', 'VIEW_TEACHER_DASHBOARD', 'VIEW_STUDENT_DASHBOARD'] },
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
          setDescription(role.description);
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
      setSelectedPermissions(prev => prev.filter(p => !keys.includes(p)));
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
        <Button variant="outline" size="icon" onClick={() => router.push('/admin/perfis')} className="h-10 w-10">
           <ArrowLeft className="h-4 w-4" />
        </Button>
        <AdminPageHeader 
          title={id ? "Editar Perfil" : "Novo Perfil"} 
          description={id ? "Edite as permissões associadas a este perfil." : "Crie um novo nível de acesso ao sistema."}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Configurações básicas */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 lg:col-span-1 space-y-6 h-fit">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
               <ShieldCheck className="w-5 h-5 text-indigo-600" />
               <h2 className="font-bold text-slate-900">Detalhes do Perfil</h2>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome de Exibição</label>
                  <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex: Financeiro Sênior" disabled={!!id} />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Código (Identificador)</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: FINANCEIRO" className="uppercase font-mono" disabled={!!id} />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva brevemente o propósito deste perfil." />
               </div>
            </div>

            <Button className="w-full" onClick={handleSave} disabled={saving}>
               {saving ? "Salvando..." : <><Save className="w-4 h-4 mr-2" /> Salvar Perfil</>}
            </Button>
         </div>

         {/* Permissões */}
         <div className="bg-white p-6 rounded-xl border border-slate-200 lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
               <div>
                  <h2 className="font-bold text-slate-900">Matriz de Autorização</h2>
                  <p className="text-sm text-slate-500 mt-1">Marque as visões e ações que este perfil pode realizar.</p>
               </div>
               <div className="text-sm border border-slate-200 bg-slate-50 px-3 py-1 rounded-md text-slate-600 font-medium">
                  {selectedPermissions.length} permissões selecionadas
               </div>
            </div>

            <div className="space-y-6">
               {PERMISSION_GROUPS.map((group, idx) => {
                  const allSelected = group.keys.every(k => selectedPermissions.includes(k as Permission));
                  return (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                       <div className="bg-slate-50 p-3 px-4 flex items-center justify-between border-b border-slate-200">
                          <span className="font-semibold text-slate-800">{group.group}</span>
                          <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => selectGroup(group.keys)}>
                             {allSelected ? 'Desmarcar Todos' : 'Marcar Todos'}
                          </Button>
                       </div>
                       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {group.keys.map(key => {
                            const isChecked = selectedPermissions.includes(key as Permission);
                            return (
                               <label key={key} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${isChecked ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                                  <input 
                                    type="checkbox" 
                                    className="mt-1 flex-shrink-0 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-600"
                                    checked={isChecked}
                                    onChange={() => togglePermission(key as Permission)}
                                  />
                                  <span className={`text-sm ${isChecked ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>{key}</span>
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
