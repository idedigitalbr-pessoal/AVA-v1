import { PerformanceManager } from "@/features/aluno/performance/PerformanceManager";
import { Target } from "lucide-react";

export default function DesempenhoPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center">
          <Target className="w-8 h-8 mr-3 text-indigo-500" /> Meu Desempenho
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Acompanhe seu progresso acadêmico, notas, frequências e recomendações personalizadas.
        </p>
      </div>

      <PerformanceManager />
    </div>
  );
}
