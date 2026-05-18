"use client";

import { useState, useEffect } from "react";
import { StudentNotification, NotificationType } from "./types";
import { NotificationCard } from "./NotificationCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStudentNotifications } from "@/hooks/use-queries";
import { Skeleton } from "@/components/ui/skeleton";

export function NotificationManager() {
  const { data: notificationsData, isLoading } = useStudentNotifications();
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [filterType, setFilterType] = useState<NotificationType | "ALL">("ALL");
  const [filterRead, setFilterRead] = useState<"ALL" | "UNREAD" | "READ">("ALL");

  useEffect(() => {
    if (notificationsData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotifications(notificationsData as any);
    }
  }, [notificationsData]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(current => 
      current.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(current => current.map(n => ({...n, isRead: true})));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-[180px]" />
          <Skeleton className="h-9 w-[200px]" />
        </div>
        <div className="space-y-4">
           {[1,2,3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  const filteredNotifs = notifications.filter(notif => {
    const matchesType = filterType === "ALL" || notif.type === filterType;
    const matchesReadStatus = filterRead === "ALL" || 
                              (filterRead === "READ" ? notif.isRead : !notif.isRead);
    return matchesType && matchesReadStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const groupedNotifs = filteredNotifs.reduce((acc, notif) => {
    const key = notif.date.includes("Hoje") ? "Hoje" 
             : notif.date.includes("Ontem") ? "Ontem" 
             : notif.date.split(',')[0].trim();
             
    if (!acc[key]) acc[key] = [];
    acc[key].push(notif);
    return acc;
  }, {} as Record<string, StudentNotification[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-indigo-500" /> Notificações
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">{unreadCount} não lidas</Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1">
            Gerencie seus alertas e atualizações do portal.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead} className="shrink-0 text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700">
            <CheckCheck className="w-4 h-4 mr-2" /> Marcar todas como lidas
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
          <SelectTrigger className="w-[180px] h-9 border-slate-200 bg-slate-50">
            <SelectValue placeholder="Qualquer Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Qualquer Tipo</SelectItem>
            <SelectItem value="ATIVIDADE">Atividades</SelectItem>
            <SelectItem value="QUIZ">Quizzes</SelectItem>
            <SelectItem value="PROVA">Provas / Notas</SelectItem>
            <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
            <SelectItem value="AVISO">Avisos</SelectItem>
            <SelectItem value="MENSAGEM">Mensagens</SelectItem>
            <SelectItem value="CERTIFICADO">Certificados</SelectItem>
            <SelectItem value="SISTEMA">Sistema</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex bg-slate-100 rounded-md p-1 border border-slate-200">
          <button 
            onClick={() => setFilterRead("ALL")}
            className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${filterRead === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Todas
          </button>
          <button 
            onClick={() => setFilterRead("UNREAD")}
            className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${filterRead === 'UNREAD' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Não Lidas
          </button>
          <button 
            onClick={() => setFilterRead("READ")}
            className={`px-3 py-1 text-sm font-medium rounded-sm transition-colors ${filterRead === 'READ' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Lidas
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(groupedNotifs).length === 0 ? (
          <div className="bg-white border text-center p-10 border-slate-200 border-dashed rounded-xl">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-sm mx-auto">
               <Bell className="w-8 h-8" />
             </div>
             <h3 className="text-lg font-bold text-slate-700 mb-2">Sem notificações</h3>
             <p className="text-slate-500">Nenhum alerta encontrado para os filtros selecionados.</p>
          </div>
        ) : (
          Object.entries(groupedNotifs).map(([dateLabel, group]) => (
            <div key={dateLabel} className="space-y-3">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{dateLabel}</h3>
              <div className="space-y-4">
                {group.map(notif => (
                  <NotificationCard 
                    key={notif.id} 
                    notification={notif}
                    onMarkAsRead={handleMarkAsRead}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
