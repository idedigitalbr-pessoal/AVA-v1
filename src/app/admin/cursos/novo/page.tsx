import { AdminPageHeader } from "@/features/admin/components";
import { CourseForm } from "@/features/admin/courses";

export default function NovoCursoPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Novo Curso" 
        description="Preencha as informações para criar um novo curso." 
      />
      <CourseForm />
    </div>
  );
}
