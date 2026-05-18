"use client";

import { useState, useEffect } from "react";
import { SupportTicket, SupportDepartment } from "./types";
import { TicketList } from "./TicketList";
import { TicketChat } from "./TicketChat";
import { Headset, Plus, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useStudentSupportTickets } from "@/hooks/use-queries";
import { Skeleton } from "@/components/ui/skeleton";

export function SupportManager() {
  const { data: ticketsData, isLoading } = useStudentSupportTickets();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  
  useEffect(() => {
    if (ticketsData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTickets(ticketsData as any);
    }
  }, [ticketsData]);

  // New ticket form state
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newDepartment, setNewDepartment] = useState<SupportDepartment | "">("");
  const [newFirstMessage, setNewFirstMessage] = useState("");

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isLoading) {
    return (
      <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
        <div className="shrink-0 flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-[140px]" />
        </div>
        <div className="flex-1 min-h-0 flex gap-6 bg-slate-50/50 rounded-2xl border border-slate-200 p-2 sm:p-4">
           <Skeleton className="w-80 h-full rounded-xl" />
           <Skeleton className="flex-1 h-full rounded-xl" />
        </div>
      </div>
    );
  }

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || null;

  const handleSendMessage = (ticketId: string, text: string) => {
    setTickets(current => current.map(ticket => {
      if (ticket.id === ticketId) {
        const now = new Date();
        const timestamp = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}`;
        return {
          ...ticket,
          updatedAt: timestamp,
          messages: [
            ...ticket.messages,
            {
              id: `msg-${Date.now()}`,
              sender: "STUDENT",
              text,
              timestamp
            }
          ]
        };
      }
      return ticket;
    }));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newDepartment || !newFirstMessage) return;

    const now = new Date();
    const timestamp = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}`;
    const newTicket: SupportTicket = {
      id: `tk-${now.getFullYear()}-00${tickets.length + 1}`,
      subject: newSubject,
      department: newDepartment as SupportDepartment,
      status: "OPEN",
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "STUDENT",
          text: newFirstMessage,
          timestamp
        }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setIsNewTicketOpen(false);
    setSelectedTicketId(newTicket.id);
    setNewSubject("");
    setNewDepartment("");
    setNewFirstMessage("");
  };

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center">
            <Headset className="w-6 h-6 mr-2 text-indigo-500" /> Atendimento Online
          </h1>
          <p className="text-slate-500 mt-1">
            Abra chamados para secretaria, financeiro ou suporte TI.
          </p>
        </div>

        <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" /> Novo Chamado
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Abrir Novo Chamado</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select value={newDepartment} onValueChange={(val: any) => setNewDepartment(val)}>
                  <SelectTrigger id="department" className="bg-slate-50">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SECRETARIA">Secretaria</SelectItem>
                    <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
                    <SelectItem value="TI">Suporte TI</SelectItem>
                    <SelectItem value="COORDENACAO">Coordenação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input 
                  id="subject" 
                  placeholder="Ex: Dúvida sobre rematrícula" 
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem Inicial</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva sua solicitação com detalhes..." 
                  value={newFirstMessage}
                  onChange={e => setNewFirstMessage(e.target.value)}
                  className="min-h-[120px] bg-slate-50"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="button" variant="outline" className="mr-2" onClick={() => setIsNewTicketOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={!newSubject || !newDepartment || !newFirstMessage}>
                  Abrir Chamado
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex gap-6 bg-slate-50/50 rounded-2xl border border-slate-200 p-2 sm:p-4">
        {/* Left Column - List */}
        <div className={`flex flex-col min-h-0 transition-all ${isDesktop ? 'w-80 shrink-0' : (!selectedTicket ? 'w-full' : 'hidden')}`}>
          <div className="mb-3 px-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Meus Chamados</h3>
            <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-full">{tickets.length}</span>
          </div>
          <div className="flex-1 min-h-0">
            <TicketList 
              tickets={tickets} 
              selectedTicketId={selectedTicketId}
              onSelectTicket={(ticket) => setSelectedTicketId(ticket.id)}
            />
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className={`flex-1 flex flex-col min-h-0 ${isDesktop ? '' : (selectedTicket ? 'w-full' : 'hidden')}`}>
          {selectedTicket ? (
            <div className="flex flex-col h-full w-full relative">
              {!isDesktop && (
                <div className="absolute top-4 right-4 z-10 block lg:hidden">
                  <Button variant="outline" size="sm" onClick={() => setSelectedTicketId(null)} className="h-8 shadow-sm">
                    Voltar à lista
                  </Button>
                </div>
              )}
              <TicketChat 
                ticket={selectedTicket} 
                onSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <div className="h-full bg-white rounded-xl border border-slate-200 border-dashed flex items-center justify-center p-8 text-center hidden lg:flex flex-col">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <MessagesSquare className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum chamado selecionado</h3>
              <p className="text-slate-500 max-w-sm">
                Selecione um chamado na lista ao lado para ver o histórico ou enviar uma nova mensagem.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
