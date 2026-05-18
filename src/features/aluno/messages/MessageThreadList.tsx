"use client";

import { useMessages } from "./MessagesContext";
import { MessageThreadItem } from "./MessageThreadItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquareOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function MessageThreadList() {
  const { threads, isLoading } = useMessages();
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  if (isLoading) {
     return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 shadow-sm z-10 w-full overflow-hidden">
           <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0 w-full space-y-3">
              <Skeleton className="h-6 w-32" />
              <div className="flex bg-slate-200/50 p-1 rounded-lg">
                 <Skeleton className="h-8 flex-1 mr-1" />
                 <Skeleton className="h-8 flex-1" />
              </div>
           </div>
           <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                 <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
           </div>
        </div>
     );
  }

  const filteredThreads = threads.filter(t => filter === 'ALL' || t.unreadCount > 0);

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full bg-white text-center">
        <MessageSquareOff className="w-12 h-12 text-slate-200 mb-4" />
        <p className="text-slate-500 font-medium">Nenhuma mensagem encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 shadow-sm z-10 w-full overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0 w-full space-y-3">
        <h2 className="font-bold text-lg text-slate-800">Mensagens</h2>
        <div className="flex bg-slate-200/50 p-1 rounded-lg">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex-1 h-8 text-xs font-semibold ${filter === 'ALL' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}
            onClick={() => setFilter('ALL')}
          >
            Todas
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`flex-1 h-8 text-xs font-semibold ${filter === 'UNREAD' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}
            onClick={() => setFilter('UNREAD')}
          >
            Não lidas
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 w-full relative">
        <div className="w-full">
          {filteredThreads.map(thread => (
             <MessageThreadItem key={thread.id} thread={thread} />
          ))}
          {filteredThreads.length === 0 && (
             <div className="p-8 text-center text-sm text-slate-500">
               Nenhuma conversa com o filtro selecionado.
             </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
