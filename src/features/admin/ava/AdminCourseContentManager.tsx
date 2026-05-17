"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course, Module, Lesson } from "@/types";
import { courseService } from "@/lib/api/services/course.service";
import { avaService } from "@/lib/api/services/ava.service";
import { Button } from "@/components/ui/button";
import { AdminLoadingState, AdminEmptyState, AdminPageHeader } from "../components";
import { ArrowLeft, Plus } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { ModuleFormModal } from "./ModuleFormModal";

interface AdminCourseContentManagerProps {
  courseId: string;
}

export function AdminCourseContentManager({ courseId }: AdminCourseContentManagerProps) {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | undefined>();

  useEffect(() => {
    fetchData();
  }, [courseId]);

  async function fetchData() {
    setLoading(true);
    try {
      const [_course, _modules] = await Promise.all([
        courseService.getCourseById(courseId),
        avaService.listModulesByCourse(courseId)
      ]);
      setCourse(_course || null);
      setModules(_modules || []);
    } catch (e) {
      toast.error("Erro ao carregar dados do curso");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateModule = async (data: Partial<Module>) => {
    try {
      await avaService.createModule(courseId, { ...data, order: modules.length });
      toast.success("Módulo criado com sucesso");
      fetchData();
      setIsModuleFormOpen(false);
    } catch (e) {
      toast.error("Erro ao criar módulo");
    }
  };

  const handleUpdateModule = async (id: string, data: Partial<Module>) => {
    try {
      await avaService.updateModule(id, data);
      toast.success("Módulo atualizado");
      fetchData();
      setIsModuleFormOpen(false);
      setEditingModule(undefined);
    } catch (e) {
      toast.error("Erro ao atualizar módulo");
    }
  };

  const handleDeleteModule = async (id: string) => {
    try {
      await avaService.deleteModule(id);
      toast.success("Módulo excluído");
      fetchData();
    } catch (e) {
      toast.error("Erro ao excluir módulo");
    }
  };

  const handleMoveModule = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === modules.length - 1)
    ) return;

    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newModules[index];
    newModules[index] = newModules[targetIndex];
    newModules[targetIndex] = temp;

    // Update order prop
    const updatedOrder = newModules.map((m, i) => ({ ...m, order: i }));
    setModules(updatedOrder);

    try {
      await avaService.reorderModules(courseId, updatedOrder.map(m => m.id));
      toast.success("Ordem atualizada");
    } catch (e) {
      toast.error("Erro ao reordenar");
      fetchData(); // revert
    }
  };

  if (loading) return <AdminLoadingState text="Carregando conteúdo..." />;
  if (!course) return <AdminEmptyState title="Curso não encontrado" description="O curso não existe ou foi removido." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/cursos/${courseId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o Curso
        </Button>
      </div>

      <AdminPageHeader 
        title={`Conteúdo: ${course.title}`} 
        description="Gerencie os módulos e aulas do curso."
        action={
          <Button onClick={() => { setEditingModule(undefined); setIsModuleFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Módulo
          </Button>
        }
      />

      <div className="space-y-4">
        {modules.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
            <h3 className="text-lg font-medium text-slate-900">Nenhum módulo criado</h3>
            <p className="text-slate-500 mt-1">Este curso ainda não possui conteúdo.</p>
            <Button className="mt-4" onClick={() => setIsModuleFormOpen(true)}>
              Criar o primeiro módulo
            </Button>
          </div>
        ) : (
          modules.map((module, index) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              isFirst={index === 0}
              isLast={index === modules.length - 1}
              onMoveUp={() => handleMoveModule(index, 'up')}
              onMoveDown={() => handleMoveModule(index, 'down')}
              onEdit={() => { setEditingModule(module); setIsModuleFormOpen(true); }}
              onDelete={() => handleDeleteModule(module.id)}
            />
          ))
        )}
      </div>

      <ModuleFormModal 
        isOpen={isModuleFormOpen} 
        onClose={() => { setIsModuleFormOpen(false); setEditingModule(undefined); }}
        module={editingModule}
        onSubmit={editingModule ? 
          (data) => handleUpdateModule(editingModule.id, data) : 
          handleCreateModule
        }
      />
    </div>
  );
}
