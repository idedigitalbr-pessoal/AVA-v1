"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { coursesService } from "@/lib/api";
import { Course } from "@/types";
import { AdminPageHeader, AdminLoadingState, AdminEmptyState } from "@/features/admin/components";
import { CourseForm } from "@/features/admin/courses";

export default function EditarCursoPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await coursesService.getById(id as string);
        if (data) setCourse(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <AdminLoadingState text="Carregando curso..." />;
  if (!course) return <AdminEmptyState title="Curso não encontrado" description="O curso solicitado não existe." />;

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title={`Editar: ${course.title}`} 
        description="Altere as informações do curso abaixo." 
      />
      <CourseForm initialData={course} isEdit />
    </div>
  );
}
