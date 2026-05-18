"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtocolStatus } from "./types";
import { mockProtocols as MOCK_PROTOCOLS } from "@/mocks/student.mock";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, FileText, Clock, CheckCircle2, XCircle, AlertCircle, Eye } from "lucide-react";

export function getStatusConfig(status: ProtocolStatus) {
  switch (status) {
    case "ABERTO": return { label: "Aberto", color: "bg-slate-100 text-slate-700 border-slate-200", icon: <FileText className="w-3.5 h-3.5" /> };
    case "AGUARDANDO_ANALISE": return { label: "Aguardando Análise", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Clock className="w-3.5 h-3.5" /> };
    case "EM_ANDAMENTO": return { label: "Em Andamento", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <AlertCircle className="w-3.5 h-3.5" /> };
    case "DEFERIDO": return { label: "Deferido", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    case "INDEFERIDO": return { label: "Indeferido", color: "bg-red-100 text-red-700 border-red-200", icon: <XCircle className="w-3.5 h-3.5" /> };
    case "CANCELADO": return { label: "Cancelado", color: "bg-slate-100 text-slate-500 border-slate-200", icon: <XCircle className="w-3.5 h-3.5" /> };
    default: return { label: status, color: "bg-slate-100 text-slate-700", icon: <FileText className="w-3.5 h-3.5" /> };
  }
}

export function ServiceList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProtocols = MOCK_PROTOCOLS.filter(p => 
    p.number.includes(searchTerm) || 
    p.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Buscar por número ou serviço..." 
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Link href="/portal/aluno/servicos/novo">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" /> Nova Solicitação
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProtocols.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
             <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <h3 className="text-slate-500 font-medium">Nenhuma solicitação encontrada</h3>
          </div>
        ) : (
          filteredProtocols.map(protocol => {
            const config = getStatusConfig(protocol.status);
            return (
              <Card key={protocol.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-bold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                         #{protocol.number}
                       </span>
                       <Badge variant="outline" className={`flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold ${config.color}`}>
                         {config.icon} {config.label}
                       </Badge>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{protocol.serviceName}</h3>
                    <p className="text-sm text-slate-500 line-clamp-1">{protocol.description}</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end justify-between sm:h-full gap-4 sm:gap-0 shrink-0">
                    <div className="text-xs text-slate-500 sm:text-right space-y-1">
                      <p>Aberto em: <span className="font-medium text-slate-700">{protocol.openedAt}</span></p>
                      <p>Atualizado em: <span className="font-medium text-slate-700">{protocol.updatedAt}</span></p>
                    </div>
                    <Link href={`/portal/aluno/servicos/${protocol.id}`} className="mt-2 sm:mt-0">
                      <Button variant="secondary" className="w-full sm:w-auto text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100">
                        <Eye className="w-4 h-4 mr-2" /> Acompanhar Protocolo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
