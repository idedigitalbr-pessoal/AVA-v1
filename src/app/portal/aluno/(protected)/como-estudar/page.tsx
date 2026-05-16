import { StudyGuideManager } from "@/features/aluno/study-guide/StudyGuideManager";
import { Lightbulb } from "lucide-react";

export default function ComoEstudarPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8 text-center sm:text-left">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center justify-center sm:justify-start">
          <Lightbulb className="w-8 h-8 mr-3 text-amber-500" /> Como Estudar
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg max-w-3xl">
          Siga o nosso guia passo a passo e descubra as melhores práticas de uso da plataforma e métodos eficientes de estudo.
        </p>
      </div>

      <StudyGuideManager />
    </div>
  );
}
