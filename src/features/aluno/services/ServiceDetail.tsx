"use client";

import { notFound } from "next/navigation";
import { mockProtocols as MOCK_PROTOCOLS } from "@/mocks/student.mock";
import { getStatusConfig } from "./ServiceList";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, User, MessageCircle } from "lucide-react";

export function ServiceDetail({ id }: { id: string }) {
  const protocol = MOCK_PROTOCOLS.find(p => p.id === id);

  if (!protocol) {
    notFound();
  }

  const config = getStatusConfig(protocol.status);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="bg-slate-50 p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-1">{protocol.serviceName}</h2>
               <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                 <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">#{protocol.number}</span>
                 <span>•</span>
                 <span>Aberto em {protocol.openedAt}</span>
               </div>
            </div>
            <Badge variant="outline" className={`px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider text-xs font-bold shadow-sm ${config.color}`}>
               {config.icon} {config.label}
             </Badge>
          </div>
          <CardContent className="p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Contexto da Solicitação</h3>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-5">
              <p className="text-slate-700 whitespace-pre-wrap">{protocol.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <div className="bg-white p-6 border-b border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> Histórico de Movimentações
             </h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               
               {protocol.history.slice().reverse().map((item, index) => {
                 const isLatest = index === 0;
                 const itemConfig = getStatusConfig(item.status);
                 
                 return (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${itemConfig.color.replace('border-', 'ring-1 ring-')}`}>
                        {itemConfig.icon}
                      </div>

                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm transition-colors hover:border-indigo-100">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className={`text-[10px] uppercase font-bold border-transparent ${itemConfig.color.replace('border-', '')}`}>
                            {itemConfig.label}
                          </Badge>
                          <span className="text-xs text-slate-400 font-medium">{item.date}</span>
                        </div>
                        <p className="text-sm text-slate-700 mt-2">{item.comment}</p>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500 font-medium">
                          <User className="w-3.5 h-3.5" />
                          Responsável: {item.actor}
                        </div>
                      </div>
                    </div>
                 );
               })}

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
         <Card className="border-slate-200 shadow-sm bg-indigo-50/50">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-indigo-200 mx-auto mb-4" />
              <h3 className="font-bold text-indigo-900 mb-2">Dúvidas sobre o protocolo?</h3>
              <p className="text-sm text-indigo-700 mb-4">
                Se precisar de mais informações sobre esta solicitação, você pode enviar uma mensagem vinculada a este número.
              </p>
              <button disabled={protocol.status === "CANCELADO"} className="w-full bg-white border border-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Nova Mensagem
              </button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
