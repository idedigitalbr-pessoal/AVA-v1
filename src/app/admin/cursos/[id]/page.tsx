"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { coursesService } from "@/lib/api";
import { Course } from "@/types";
import { AdminLoadingState, AdminEmptyState } from "@/features/admin/components";
import { CourseDetailView } from "@/features/admin/courses";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage() {
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
    <div className="space-y-4">
      <div>
        <Link href="/admin/cursos">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 -ml-4 mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
          </Button>
        </Link>
      </div>
      <CourseDetailView course={course} />
    </div>
  );
}
