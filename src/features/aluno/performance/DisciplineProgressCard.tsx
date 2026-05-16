import { DisciplinePerformance, PerformanceStatus } from "./types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, TrendingDown, AlertTriangle, AlertCircle, FileText } from "lucide-react";

export function DisciplineProgressCard({ discipline }: { discipline: DisciplinePerformance }) {
  const getStatusConfig = (status: PerformanceStatus) => {
    switch (status) {
      case "EXCELENTE": return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: <TrendingUp className="w-4 h-4" /> };
      case "BOM": return { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: <TrendingUp className="w-4 h-4" /> };
      case "ATENCAO": return { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: <AlertTriangle className="w-4 h-4" /> };
      case "CRITICO": return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: <AlertCircle className="w-4 h-4" /> };
    }
  };

  const config = getStatusConfig(discipline.status);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-slate-800 line-clamp-1">{discipline.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{discipline.professor}</p>
        </div>
        <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px] ${config.bg} ${config.color} ${config.border}`}>
          {config.icon} {discipline.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-500 font-medium mb-1">Média Atual</span>
          <span className={`text-2xl font-black ${discipline.grade < 7 ? 'text-red-600' : 'text-slate-800'}`}>
            {discipline.grade.toFixed(1)}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-500 font-medium mb-1">Frequência</span>
          <span className={`text-2xl font-black ${discipline.attendance < 75 ? 'text-red-600' : 'text-slate-800'}`}>
            {discipline.attendance}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>Andamento</span>
            <span>{discipline.progress}%</span>
          </div>
          <Progress value={discipline.progress} className="h-2 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Atividades
          </span>
          <span className="font-medium">
            <span className="text-emerald-600">{discipline.completedActivities} concluídas</span>
            <span className="mx-1">•</span>
            <span className={discipline.pendingActivities > 0 ? "text-amber-600" : "text-slate-400"}>
              {discipline.pendingActivities} pendentes
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
