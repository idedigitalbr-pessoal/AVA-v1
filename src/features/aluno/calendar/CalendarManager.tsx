"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, EventCategory } from "./types";
import { CalendarEventCard, getCategoryConfig } from "./CalendarEventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 16)); // Mocking current contextual date
  const [filterCategory, setFilterCategory] = useState<EventCategory | "ALL">("ALL");

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Calendar Grid math
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const daysString = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const filteredEvents = MOCK_EVENTS.filter(e => filterCategory === "ALL" || e.category === filterCategory);

  const nextUpcomingEvents = MOCK_EVENTS
    .filter(e => parseISO(e.startDate) >= new Date(2026, 4, 16))
    .sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-6rem)] relative">
      {/* Main Calendar View */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 capitalize">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:shadow-sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-slate-600 font-medium hover:bg-white hover:shadow-sm" onClick={() => setCurrentDate(new Date(2026, 4, 16))}>
                Hoje
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:shadow-sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <Select value={filterCategory} onValueChange={(v: any) => setFilterCategory(v)}>
              <SelectTrigger className="w-[160px] h-9 bg-slate-50 border-slate-200">
                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas categorias</SelectItem>
                <SelectItem value="AULA">Aulas</SelectItem>
                <SelectItem value="ATIVIDADE">Atividades</SelectItem>
                <SelectItem value="PROVA">Provas</SelectItem>
                <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
                <SelectItem value="SERVICO">Serviços</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 shrink-0">
          {daysString.map((day, i) => (
            <div key={day} className="py-2 text-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Grid Cells */}
        <ScrollArea className="flex-1 min-h-0 bg-slate-50/20">
          <div className="grid grid-cols-7 auto-rows-fr min-h-full">
            {calendarDays.map((day, i) => {
              const dayEvents = filteredEvents.filter(e => isSameDay(parseISO(e.startDate), day));
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isTodayDate = isSameDay(day, new Date(2026, 4, 16));

              return (
                <div 
                  key={day.toISOString()} 
                  className={`min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-slate-100 flex flex-col gap-1 transition-colors hover:bg-slate-50/80 ${
                    !isCurrentMonth ? 'bg-slate-50/50 text-slate-400 opacity-60' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs sm:text-sm font-semibold flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ${
                      isTodayDate 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : isCurrentMonth ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {format(day, dateFormat)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 overflow-hidden flex-1">
                    {dayEvents.map(event => (
                      <CalendarEventCard key={event.id} event={event} compact />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Upcoming */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 shrink-0 h-full overflow-hidden">
        
        {/* Helper Box */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shrink-0 shadow-sm">
          <h3 className="font-bold text-indigo-900 mb-2">Próximos Prazos</h3>
          <p className="text-sm text-indigo-700/80 mb-4">
            Fique de olho! Você tem 2 atividades e 1 prazo financeiro próximos do vencimento.
          </p>
        </div>

        {/* List */}
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
            <h3 className="font-bold text-slate-800">Próximos Eventos</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
               {nextUpcomingEvents.length === 0 ? (
                 <p className="text-sm text-slate-500 text-center py-4">Sem eventos próximos.</p>
               ) : (
                 nextUpcomingEvents.map(event => (
                   <CalendarEventCard key={event.id} event={event} />
                 ))
               )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
