"use client";

import { useEffect, useRef } from "react";
import { useMessages } from "./MessagesContext";
import { MessageComposer } from "./MessageComposer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, GraduationCap, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function MessageConversation({ threadId }: { threadId: string }) {
  const { getThread, sendMessage, markThreadAsRead } = useMessages();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const thread = getThread(threadId);

  useEffect(() => {
    if (thread && thread.unreadCount > 0) {
      markThreadAsRead(thread.id);
    }
  }, [thread, markThreadAsRead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread?.messages]);

  if (!thread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-slate-50">
        <p className="text-slate-500">Conversa não encontrada.</p>
        <Button variant="link" onClick={() => router.push("/portal/aluno/mensagens")}>
          Voltar para a caixa de entrada
        </Button>
      </div>
    );
  }

  const handleSend = (text: string) => {
    sendMessage(thread.id, text);
  };

  const currentStudentId = "st-12345"; // Mock ID
  // Find other participants for header
  const otherParticipants = thread.participants.filter(p => p.id !== currentStudentId);

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full overflow-hidden relative">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-200 shrink-0 flex items-center gap-3 shadow-sm z-10 w-full">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-500 shrink-0"
          onClick={() => router.push("/portal/aluno/mensagens")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 overflow-hidden">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {thread.subject}
            </h2>
            <Badge variant="outline" className="hidden sm:inline-flex bg-slate-50 text-[10px] shrink-0">
              {thread.category === "DISCIPLINA" ? thread.discipline : "Institucional"}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 truncate">
            {otherParticipants.map(Object.values).length > 0 
              ? otherParticipants.map(p => p.name).join(", ") 
              : "Sem participantes"
            }
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col gap-6 py-4 max-w-3xl mx-auto w-full">
          {thread.messages.map((msg, index) => {
            const isMe = msg.senderId === currentStudentId;
            const participant = thread.participants.find(p => p.id === msg.senderId);
            const showAvatar = !isMe && (index === 0 || thread.messages[index - 1].senderId !== msg.senderId);

            return (
              <div key={msg.id} className={`flex max-w-[85%] sm:max-w-[75%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'} gap-2 sm:gap-3`}>
                {!isMe && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${showAvatar ? 'bg-indigo-100 text-indigo-700' : 'opacity-0'}`}>
                     {participant?.role === "PROFESSOR" ? <GraduationCap className="w-4 h-4" /> : 
                      participant?.role === "COORDENACAO" ? <ShieldCheck className="w-4 h-4" /> : 
                      <User className="w-4 h-4" />}
                  </div>
                )}
                
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} min-w-0`}>
                  {(!isMe && showAvatar) && (
                    <span className="text-[11px] font-semibold text-slate-500 mb-1 ml-1 truncate max-w-full">
                      {participant?.name || "Usuário"}
                    </span>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm break-words whitespace-pre-wrap max-w-full ${
                    isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] text-slate-400 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Composer */}
      <MessageComposer onSend={handleSend} />
    </div>
  );
}
