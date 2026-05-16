"use client";

import { Activity } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function StudentCalendar({ activities }: { activities: Activity[] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // Maio 2026 para os testes baterem
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Mapear atividades por dia
  const activitiesByDay: Record<number, Activity[]> = {};
  activities.forEach(activity => {
    if (activity.dueDate) {
      const date = new Date(activity.dueDate);
      // Verifica se é o mesmo mês e ano atual do calendário
      if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
        const day = date.getDate();
        if (!activitiesByDay[day]) activitiesByDay[day] = [];
        activitiesByDay[day].push(activity);
      }
    }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Calendário</h1>
        <p className="text-slate-500 text-sm mt-1">Planeje sua rotina acadêmica e não perca prazos.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 border-slate-200">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
               <CalendarIcon className="h-5 w-5 text-indigo-600" />
               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4 sm:p-6 bg-slate-50/50">
             <div className="grid grid-cols-7 gap-px mb-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
               {days.map(day => <div key={day} className="py-2">{day}</div>)}
             </div>
             <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
               {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                 <div key={`empty-${i}`} className="bg-slate-50 min-h-[100px] p-2 opacity-50"></div>
               ))}
               {Array.from({ length: daysInMonth }).map((_, i) => {
                 const day = i + 1;
                 const dayActivities = activitiesByDay[day] || [];
                 const isToday = 
                   day === new Date().getDate() && 
                   currentDate.getMonth() === new Date().getMonth() && 
                   currentDate.getFullYear() === new Date().getFullYear();

                 return (
                   <div key={day} className={`bg-white min-h-[100px] p-2 relative transition-colors ${isToday ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}>
                     <span className={`text-sm font-medium ${isToday ? 'text-indigo-600 font-bold bg-indigo-100 rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-700'}`}>
                        {day}
                     </span>
                     <div className="mt-2 space-y-1">
                        {dayActivities.map((act, idx) => (
                           <div key={idx} className={`text-[10px] sm:text-xs p-1 px-1.5 rounded truncate font-medium ${act.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                             {act.title}
                           </div>
                        ))}
                     </div>
                   </div>
                 );
               })}
               {Array.from({ length: 42 - (firstDayOfMonth + daysInMonth) }).map((_, i) => (
                 <div key={`empty-end-${i}`} className="bg-slate-50 min-h-[100px] p-2 opacity-50"></div>
               ))}
             </div>
          </CardContent>
        </Card>

        {/* Lado Direito: Próximos Vencimentos */}
        <div className="w-full lg:w-80 flex-shrink-0">
           <Card className="border-slate-200 sticky top-6">
             <div className="p-5 border-b border-slate-200 bg-slate-50">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                 <Clock className="h-5 w-5 text-indigo-500" /> Próximos Vencimentos
               </h3>
             </div>
             <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {activities.filter(a => a.status === 'PENDING').slice(0, 5).map(act => (
                    <div key={act.id} className="p-4 hover:bg-slate-50 transition-colors">
                       <div className="flex items-start gap-3">
                         <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                         <div>
                            <p className="text-sm font-semibold text-slate-900">{act.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{act.courseName}</p>
                            <Badge variant="outline" className="mt-2 text-xs text-slate-500 font-normal">
                               {act.dueDate ? new Date(act.dueDate).toLocaleDateString() : 'Aberto'}
                            </Badge>
                         </div>
                       </div>
                    </div>
                  ))}
                  {activities.filter(a => a.status === 'PENDING').length === 0 && (
                    <div className="p-6 text-center text-slate-500 text-sm">
                       <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                       Nenhuma atividade pendente.
                    </div>
                  )}
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
