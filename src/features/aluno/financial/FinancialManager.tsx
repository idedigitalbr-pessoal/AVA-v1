"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_INVOICES, MOCK_FINANCIAL_SUMMARY, InvoiceStatus, Invoice } from "./types";
import { DollarSign, Download, Copy, CheckCircle2, Clock, AlertCircle, XCircle, FileText, Calendar, Check } from "lucide-react";

export function getStatusConfig(status: InvoiceStatus) {
  switch (status) {
    case "EM_ABERTO": return { label: "Em Aberto", color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Clock className="w-3.5 h-3.5" /> };
    case "PAGO": return { label: "Pago", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    case "VENCIDO": return { label: "Vencido", color: "bg-red-100 text-red-700 border-red-200", icon: <AlertCircle className="w-3.5 h-3.5" /> };
    case "CANCELADO": return { label: "Cancelado", color: "bg-slate-100 text-slate-500 border-slate-200", icon: <XCircle className="w-3.5 h-3.5" /> };
    default: return { label: status, color: "bg-slate-100 text-slate-700", icon: <FileText className="w-3.5 h-3.5" /> };
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const [copied, setCopied] = useState(false);
  const config = getStatusConfig(invoice.status);

  const handleCopy = () => {
    navigator.clipboard.writeText(invoice.barcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={`border-slate-200 shadow-sm transition-shadow hover:shadow-md ${invoice.status === 'VENCIDO' ? 'border-red-200 bg-red-50/10' : ''}`}>
      <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`flex items-center gap-1 uppercase tracking-wider text-[10px] font-bold ${config.color}`}>
              {config.icon} {config.label}
            </Badge>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" /> Vencimento: {invoice.dueDate}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight">{invoice.description}</h3>
            <p className="text-2xl font-black text-indigo-700 mt-1">{formatCurrency(invoice.amount)}</p>
          </div>
        </div>

        {(invoice.status === "EM_ABERTO" || invoice.status === "VENCIDO") && (
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
            <Button variant="outline" className="w-full sm:w-auto border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copiado!" : "Copiar Código"}
            </Button>
            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
              <Download className="w-4 h-4 mr-2" /> Baixar Boleto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FinancialManager() {
  const [activeTab, setActiveTab] = useState("aberto");

  const openInvoices = MOCK_INVOICES.filter(i => i.status === "EM_ABERTO" || i.status === "VENCIDO");
  const paidInvoices = MOCK_INVOICES.filter(i => i.status === "PAGO");
  const otherInvoices = MOCK_INVOICES.filter(i => i.status === "CANCELADO");

  return (
    <div className="space-y-6">
      
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className={`border-none shadow-sm ${MOCK_FINANCIAL_SUMMARY.status === 'REGULAR' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                {MOCK_FINANCIAL_SUMMARY.status === 'REGULAR' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <h3 className="font-bold text-lg opacity-90">Status Financeiro</h3>
            </div>
            <p className="text-2xl font-black mt-2">
              {MOCK_FINANCIAL_SUMMARY.status === 'REGULAR' ? 'Regular' : 'Inadimplente'}
            </p>
            <p className="text-sm opacity-80 mt-1">Situação atual da sua matrícula</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-600 text-lg">Próximo Vencimento</h3>
            </div>
            <p className="text-2xl font-black text-slate-800 mt-2">
              {MOCK_FINANCIAL_SUMMARY.nextDueDate || 'Nenhum'}
            </p>
            <p className="text-sm text-slate-500 mt-1">Data limite para o próximo pagamento</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-600 text-lg">Total em Aberto</h3>
            </div>
            <p className="text-2xl font-black text-slate-800 mt-2">
              {formatCurrency(MOCK_FINANCIAL_SUMMARY.totalOpen)}
            </p>
            <p className="text-sm text-slate-500 mt-1">Soma das mensalidades pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Cobranças */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-xl">Extrato Financeiro</CardTitle>
          <CardDescription>Acompanhe suas mensalidades e taxas</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="aberto" onValueChange={setActiveTab} className="w-full">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <TabsList className="bg-slate-200/50">
                <TabsTrigger value="aberto" className="data-[state=active]:bg-white data-[state=active]:text-indigo-700">
                  Em Aberto ({openInvoices.length})
                </TabsTrigger>
                <TabsTrigger value="pago" className="data-[state=active]:bg-white data-[state=active]:text-emerald-700">
                  Pagos ({paidInvoices.length})
                </TabsTrigger>
                <TabsTrigger value="outros" className="data-[state=active]:bg-white data-[state=active]:text-slate-700">
                  Outros ({otherInvoices.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-50/30">
              <TabsContent value="aberto" className="mt-0 space-y-4">
                {openInvoices.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-600">Tudo certo por aqui!</h3>
                    <p className="text-sm text-slate-500">Nenhuma cobrança em aberto no momento.</p>
                  </div>
                ) : (
                  openInvoices.map(invoice => <InvoiceCard key={invoice.id} invoice={invoice} />)
                )}
              </TabsContent>

              <TabsContent value="pago" className="mt-0 space-y-4">
                {paidInvoices.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-600">Nenhum histórico encontrado</h3>
                  </div>
                ) : (
                  paidInvoices.map(invoice => <InvoiceCard key={invoice.id} invoice={invoice} />)
                )}
              </TabsContent>

              <TabsContent value="outros" className="mt-0 space-y-4">
                {otherInvoices.length === 0 ? (
                  <div className="text-center py-10">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="font-medium text-slate-600">Nenhum histórico encontrado</h3>
                  </div>
                ) : (
                  otherInvoices.map(invoice => <InvoiceCard key={invoice.id} invoice={invoice} />)
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
