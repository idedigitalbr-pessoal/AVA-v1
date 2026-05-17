"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminDataTable, AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { classesService } from "@/lib/api";
import { Class } from "@/types";
import { Plus } from "lucide-react";

export function CourseClassesTab({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real scenario, we might have a specific endpoint or we filter
    classesService.listClasses().then((data: Class[]) => {
      // filtering mock data that matches this course
      const filtered = data.filter(c => c.courseId === courseId);
      setClasses(filtered);
      setLoading(false);
    });
  }, [courseId]);

  const columns = [
    { header: "Nome", accessor: (c: Class) => <span className="font-medium cursor-pointer hover:underline" onClick={() => router.push(`/admin/turmas/${c.id}`)}>{c.name}</span> },
    { header: "Status", accessor: (c: Class) => c.status || 'Ativa' },
    { header: "Ano Letivo", accessor: (c: Class) => c.academicYear || '-' },
    { header: "Alunos", accessor: (c: Class) => c.studentsCount || 0 },
  ];

  if (loading) return <AdminLoadingState text="Carregando turmas..." />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Turmas do Curso</h3>
          <p className="text-sm text-slate-500">Gerencie as turmas vinculadas a este curso.</p>
        </div>
        <Button onClick={() => router.push('/admin/turmas/novo')}>
          <Plus className="mr-2 h-4 w-4" /> Nova Turma
        </Button>
      </div>

      <AdminDataTable 
        columns={columns} 
        data={classes} 
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma turma encontrada para este curso."
        onEdit={(item) => router.push(`/admin/turmas/${item.id}/editar`)}
        onView={(item) => router.push(`/admin/turmas/${item.id}`)}
      />
    </div>
  );
}
