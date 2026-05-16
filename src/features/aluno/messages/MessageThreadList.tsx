"use client";

import { useMessages } from "./MessagesContext";
import { MessageThreadItem } from "./MessageThreadItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquareOff } from "lucide-react";

export function MessageThreadList() {
  const { threads } = useMessages();

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
      <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0 w-full">
        <h2 className="font-bold text-lg text-slate-800">Mensagens</h2>
      </div>
      <ScrollArea className="flex-1 w-full relative">
        <div className="w-full">
          {threads.map(thread => (
            <MessageThreadItem key={thread.id} thread={thread} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
