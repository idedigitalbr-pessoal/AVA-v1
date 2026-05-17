"use client";

import { ExtendedModule } from "@/features/ava-management/types";
import { ContentManager } from "@/features/ava-management/ContentManager";

export function TeacherCourseContent({ classSubjectId, initialModules }: { classSubjectId: string, initialModules: ExtendedModule[] }) {
  // O ContentManager é um componente flexível que pode ser usado pelo admin e pelo professor.
  // Como as funcionalidades são idênticas (reordenar, criar, duplicar), aproveitamos a base dele e 
  // no futuro os métodos de save podem conectar numa prop "onSave" se necessário, em vez de 
  // lidar com estado apenas. Por enquanto ele lida com estado local para os mocks.
  return (
    <ContentManager courseId={classSubjectId} initialModules={initialModules} />
  );
}

