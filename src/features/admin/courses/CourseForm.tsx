"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Course } from "@/types";
import { coursesService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CourseFormProps {
  initialData?: Course;
  isEdit?: boolean;
}

export function CourseForm({ initialData, isEdit }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>(initialData || {
    title: "",
    code: "",
    description: "",
    modality: "ONLINE",
    degree: "LIVRE",
    workload: 0,
    status: "DRAFT"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'workload' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && initialData?.id) {
        await coursesService.updateCourse(initialData.id, formData);
        toast.success("Curso atualizado com sucesso!");
        router.push(`/admin/cursos/${initialData.id}`);
      } else {
        const created = await coursesService.createCourse(formData);
        toast.success("Curso criado com sucesso!");
        router.push(`/admin/cursos/${created.id}`);
      }
    } catch (error) {
      toast.error(isEdit ? "Erro ao atualizar curso." : "Erro ao criar curso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Título do Curso</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Ex: Ciência da Computação" 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Código</label>
          <Input 
            name="code" 
            value={formData.code} 
            onChange={handleChange} 
            placeholder="Ex: CC01" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Modalidade</label>
          <select 
            name="modality" 
            value={formData.modality} 
            onChange={handleChange}
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="ONLINE">Online</option>
            <option value="PRESENCIAL">Presencial</option>
            <option value="HIBRIDO">Híbrido</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Grau</label>
          <select 
            name="degree" 
            value={formData.degree} 
            onChange={handleChange}
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="LIVRE">Livre</option>
            <option value="EXTENSAO">Extensão</option>
            <option value="GRADUACAO">Graduação</option>
            <option value="POS_GRADUACAO">Pós-Graduação</option>
            <option value="CERTIFICACAO">Certificação</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Carga Horária (h)</label>
          <Input 
            name="workload" 
            type="number"
            value={formData.workload} 
            onChange={handleChange} 
            placeholder="Ex: 3200" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="DRAFT">Rascunho</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Arquivado</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Descrição</label>
        <Textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Descrição detalhada do curso..." 
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
          {loading ? "Salvando..." : isEdit ? "Atualizar Curso" : "Criar Curso"}
        </Button>
      </div>
    </form>
  );
}
