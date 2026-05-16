import { ExamDashboard } from "@/features/aluno/exams/ExamDashboard";
import { Laptop } from "lucide-react";

export default function ProvasOnlinePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center">
          <Laptop className="w-8 h-8 mr-3 text-indigo-500" /> Provas Online
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Consulte suas avaliações agendadas, realize as provas disponíveis e veja seus resultados.
        </p>
      </div>

      <ExamDashboard />
    </div>
  );
}
