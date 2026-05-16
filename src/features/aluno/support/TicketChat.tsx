import { SupportTicket, SupportMessage } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Headset, CheckCircle2, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface TicketChatProps {
  ticket: SupportTicket;
  onSendMessage: (ticketId: string, text: string) => void;
}

export function TicketChat({ ticket, onSendMessage }: TicketChatProps) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive or ticket changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    onSendMessage(ticket.id, inputText);
    setInputText("");
  };

  const isClosed = ticket.status === "CLOSED";

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs uppercase bg-white shadow-sm border-slate-200 text-slate-600 font-medium">
            {ticket.department}
          </Badge>
          <span className="text-sm font-semibold text-slate-500">#{ticket.id}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-tight">
          {ticket.subject}
        </h3>
        <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
          {ticket.status === "CLOSED" ? (
            <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Resolvido em {ticket.updatedAt}</>
          ) : (
            <><Clock className="w-3.5 h-3.5 text-blue-500" /> Última atualização em {ticket.updatedAt}</>
          )}
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 pb-0" ref={scrollRef}>
        <div className="flex flex-col gap-4 pb-4">
          {ticket.messages.map((msg) => {
            if (msg.sender === "SYSTEM") {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-slate-200">
                    {msg.text} - {msg.timestamp}
                  </span>
                </div>
              );
            }

            const isStudent = msg.sender === "STUDENT";
            
            return (
              <div key={msg.id} className={`flex max-w-[85%] ${isStudent ? 'self-end flex-row-reverse' : 'self-start'} gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isStudent ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                  {isStudent ? <User className="w-4 h-4" /> : <Headset className="w-4 h-4" />}
                </div>
                
                <div className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}>
                  {!isStudent && msg.attendantName && (
                    <span className="text-xs text-slate-500 mb-1 ml-1">{msg.attendantName}</span>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    isStudent 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] text-slate-400 mt-1 ${isStudent ? 'mr-1' : 'ml-1'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        {isClosed ? (
          <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
            Este chamado foi encerrado e não pode receber novas mensagens.
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex gap-2 items-center">
            <Input 
              placeholder="Digite sua mensagem..." 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 h-11 rounded-full px-4"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!inputText.trim()}
              className="h-11 w-11 rounded-full bg-indigo-600 hover:bg-indigo-700 shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
