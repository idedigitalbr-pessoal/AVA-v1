import { SupportTicket, TicketStatus } from "./types";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TicketListProps {
  tickets: SupportTicket[];
  selectedTicketId?: string | null;
  onSelectTicket: (ticket: SupportTicket) => void;
}

export function TicketList({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) {
  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "OPEN":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Aberto</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Em Atendimento</Badge>;
      case "CLOSED":
        return <Badge variant="outline" className="text-slate-500 bg-slate-50">Fechado</Badge>;
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case "OPEN":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "IN_PROGRESS":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "CLOSED":
        return <CheckCircle2 className="w-4 h-4 text-slate-400" />;
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-200 h-full">
        <MessageSquare className="w-8 h-8 text-slate-300 mb-3" />
        <h3 className="text-sm font-bold text-slate-800">Nenhum chamado</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">Você ainda não abriu nenhum chamado de atendimento.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 pb-6 px-1">
        {tickets.map(ticket => (
          <button
            key={ticket.id}
            onClick={() => onSelectTicket(ticket)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedTicketId === ticket.id
                ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500/20'
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(ticket.status)}
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {ticket.id}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{ticket.updatedAt}</span>
            </div>
            
            <h4 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
              {ticket.subject}
            </h4>
            
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline" className="text-[10px] uppercase text-slate-500 border-slate-200 bg-slate-50">
                {ticket.department}
              </Badge>
              {getStatusBadge(ticket.status)}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
