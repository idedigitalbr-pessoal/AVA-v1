import { AcademicEvent, EventCategory } from "./types";
import { Badge } from "@/components/ui/badge";
import { BookOpen, AlertCircle, Laptop, Calendar as CalendarIcon, DollarSign, FileText, CheckCircle2, Megaphone } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarEventCardProps {
  event: AcademicEvent;
  compact?: boolean;
}

export function getCategoryConfig(category: EventCategory) {
  switch (category) {
    case "AULA":
      return { icon: <BookOpen className="w-4 h-4" />, color: "bg-blue-100 text-blue-700 border-blue-200", label: "Aula" };
    case "ATIVIDADE":
      return { icon: <FileText className="w-4 h-4" />, color: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "Atividade" };
    case "PROVA":
      return { icon: <AlertCircle className="w-4 h-4" />, color: "bg-rose-100 text-rose-700 border-rose-200", label: "Prova" };
    case "FINANCEIRO":
      return { icon: <DollarSign className="w-4 h-4" />, color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Financeiro" };
    case "SERVICO":
      return { icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-amber-100 text-amber-700 border-amber-200", label: "Serviço" };
    case "LIVE_EVENT":
      return { icon: <Laptop className="w-4 h-4" />, color: "bg-violet-100 text-violet-700 border-violet-200", label: "Ao Vivo" };
    case "FERIADO":
      return { icon: <CalendarIcon className="w-4 h-4" />, color: "bg-slate-100 text-slate-700 border-slate-200", label: "Feriado" };
    case "ACADEMICO":
      return { icon: <Megaphone className="w-4 h-4" />, color: "bg-orange-100 text-orange-700 border-orange-200", label: "Aviso" };
    default:
      return { icon: <CalendarIcon className="w-4 h-4" />, color: "bg-slate-100 text-slate-700 border-slate-200", label: "Outro" };
  }
}

export function CalendarEventCard({ event, compact = false }: CalendarEventCardProps) {
  const config = getCategoryConfig(event.category);
  const start = parseISO(event.startDate);
  
  const timeString = format(start, "HH:mm");
  const hasTime = timeString !== "00:00" && timeString !== "23:59";
  const dateString = format(start, "dd 'de' MMM", { locale: ptBR });

  if (compact) {
    return (
      <div className={`p-2 rounded-md border text-xs sm:text-sm flex flex-col gap-1 transition-colors hover:bg-white/50 cursor-pointer shadow-sm ${config.color} bg-opacity-40`}>
        <div className="font-semibold line-clamp-1 truncate">{event.title}</div>
        {hasTime && (
          <div className="text-[10px] sm:text-xs opacity-80">{timeString}</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center shrink-0 border ${config.color}`}>
        <span className="text-[10px] font-bold uppercase opacity-80 -mb-1">{format(start, "MMM", { locale: ptBR })}</span>
        <span className="text-lg font-black leading-tight">{format(start, "dd")}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold ${config.color} border-opacity-50`}>
            {config.label}
          </Badge>
          {event.priority === "ALTA" && (
            <Badge variant="outline" className="text-[10px] uppercase font-bold text-red-600 border-red-200 bg-red-50">
              Alta Prioridade
            </Badge>
          )}
        </div>
        
        <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-tight">
          {event.title}
        </h4>
        
        {event.discipline && (
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {event.discipline}
          </p>
        )}
        
        {event.description && (
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-2">
            {event.description}
          </p>
        )}
        
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-2">
          {hasTime ? (
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              {timeString}
              {event.endDate && ` - ${format(parseISO(event.endDate), "HH:mm")}`}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5" />
              Dia Inteiro
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
