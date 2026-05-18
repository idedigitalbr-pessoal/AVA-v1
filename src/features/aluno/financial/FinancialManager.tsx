"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, Copy, CheckCircle2, Clock, AlertCircle, Calendar, RefreshCcw, Handshake, MoreHorizontal, FileText, FileDown, Check } from "lucide-react";
import { useStudentFinancial } from "@/hooks/use-queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { studentFinancialService } from "@/lib/api/services/student-financial.service";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function getStatusConfig(status: string) {
  switch (status) {
    case "PENDING":
      return { label: "Em Aberto", color: "bg-blue-100 text-blue-800 border-none", icon: <Clock className="w-3.5 h-3.5" /> };
    case "PAID":
      return { label: "Pago", color: "bg-emerald-100 text-emerald-800 border-none", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    case "LATE":
      return { label: "Atrasado", color: "bg-red-100 text-red-800 border-none", icon: <AlertCircle className="w-3.5 h-3.5" /> };
    case "NEGOTIATED":
      return { label: "Negociado", color: "bg-amber-100 text-amber-800 border-none", icon: <Handshake className="w-3.5 h-3.5" /> };
    default:
      return { label: status, color: "bg-slate-100 text-slate-700 border-none", icon: <FileText className="w-3.5 h-3.5" /> };
  }
}

export function FinancialManager() {
  const { data: financialData, isLoading } = useStudentFinancial();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const openDetails = async (id: string) => {
    // using mock data already in memory, or use service
    const invoice = await studentFinancialService.getInvoiceDetails(id);
    if(invoice) {
      setSelectedInvoice(invoice);
      setIsModalOpen(true);
    }
  };

  const handleCopyPix = (id: string) => {
    navigator.clipboard.writeText(`00020126360014BR.GOV.BCB.PIX011400000000000000${id}`);
    setCopiedId(id);
    toast.success("Código Pix copiado com sucesso!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadBoleto = async (id: string) => {
    setIsDownloading(id);
    toast.info("Baixando boleto...");
    await studentFinancialService.simulateDownloadInvoice(id);
    setTimeout(() => {
       setIsDownloading(null);
       toast.success("Download concluído.");
    }, 1500);
  };

  const handleDownloadReceipt = async (id: string) => {
    setIsDownloading(id);
    toast.info("Baixando recibo...");
    setTimeout(() => {
       setIsDownloading(null);
       toast.success("Recibo baixado com sucesso.");
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
         </div>
         <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (!financialData) {
    return <div className="p-8 text-center text-slate-500">Erro ao carregar dados financeiros.</div>;
  }

  const { invoices = [], status, nextBill } = financialData;

  // Estado local para Date.now() para evitar re-render puro com impure function
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
  }, []);

  const currentMonthInvoice = invoices.find(i => i.status === "PENDING" && new Date(i.dueDate).getTime() >= now && now !== 0);
  const openInvoices = invoices.filter(i => i.status === "PENDING" || i.status === "LATE");
  const totalOpen = openInvoices.reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie suas mensalidades e pagamentos.</p>
      </div>
      
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Mensalidade Atual */}
        <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm relative overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between h-full relative z-10">
            <h3 className="text-sm font-semibold text-indigo-800 opacity-80 uppercase tracking-wider mb-2">Mensalidade Atual</h3>
            {currentMonthInvoice ? (
               <div>
                  <p className="text-3xl font-black text-indigo-900">{formatCurrency(currentMonthInvoice.amount)}</p>
                  <p className="text-xs text-indigo-700 font-medium mt-1">{currentMonthInvoice.competency}</p>
               </div>
            ) : (
               <div className="flex items-center gap-2 text-indigo-700">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  <span className="font-semibold text-sm">Sem mensalidade pendente no mês atual</span>
               </div>
            )}
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10 text-indigo-600">
            <DollarSign className="w-24 h-24" />
          </div>
        </Card>

        {/* Próximo Vencimento */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
               <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Próximo Vencimento</h3>
               <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div>
               <p className="text-2xl font-bold text-slate-800">
                 {nextBill ? new Date(nextBill.dueDate).toLocaleDateString() : 'Nenhum'}
               </p>
               <p className="text-xs text-slate-500 font-medium mt-1 text-truncate">
                 {nextBill ? nextBill.description : 'Sua situação está regular'}
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Total em Aberto */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
               <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total em Aberto</h3>
               <DollarSign className="w-4 h-4 text-slate-400" />
            </div>
            <div>
               <p className={`text-2xl font-bold ${totalOpen > 0 ? "text-amber-600" : "text-slate-800"}`}>
                 {formatCurrency(totalOpen)}
               </p>
               <p className="text-xs text-slate-500 font-medium mt-1">
                 {openInvoices.length} fatura(s) pendente(s)
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Situação Financeira */}
        <Card className={`border-none shadow-sm ${status === 'REGULAR' ? 'bg-emerald-600 text-white' : status === 'NEGOTIATED' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white/20 rounded-md">
                {status === 'REGULAR' ? <CheckCircle2 className="w-4 h-4" /> : status === 'NEGOTIATED' ? <Handshake className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              </div>
              <h3 className="font-semibold text-sm opacity-90 uppercase tracking-wider">Situação Financeira</h3>
            </div>
            <p className="text-2xl font-bold">
              {status === 'REGULAR' ? 'Regular' : status === 'NEGOTIATED' ? 'Regularizada' : 'Inadimplente'}
            </p>
            <p className="text-xs opacity-80 mt-1 font-medium">{status === 'REGULAR' ? "Nenhuma pendência ativa" : status === 'NEGOTIATED' ? "Acordo ativo em andamento" : "Taxas em atraso detectadas"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Cobranças */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
         <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle className="text-lg">Extrato e Pagamentos</CardTitle>
            <CardDescription>Acompanhe e gerencie todas as faturas.</CardDescription>
         </CardHeader>
         <CardContent className="p-0">
           {invoices.length > 0 ? (
             <div className="overflow-x-auto">
               <Table>
                  <TableHeader>
                     <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                       <TableHead className="font-medium text-slate-500 min-w-[200px]">Competência</TableHead>
                       <TableHead className="font-medium text-slate-500 whitespace-nowrap">Vencimento</TableHead>
                       <TableHead className="font-medium text-slate-500 whitespace-nowrap">Valor</TableHead>
                       <TableHead className="font-medium text-slate-500 whitespace-nowrap">Status</TableHead>
                       <TableHead className="font-medium text-slate-500 whitespace-nowrap">Pagamento</TableHead>
                       <TableHead className="text-right font-medium text-slate-500 whitespace-nowrap">Ações</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {invoices.map((invoice) => {
                       const statusConf = getStatusConfig(invoice.status);
                       return (
                          <TableRow key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                             <TableCell className="font-medium text-slate-800">
                                <span className="flex flex-col">
                                   <span className="whitespace-nowrap">{invoice.competency}</span>
                                   <span className="text-xs text-slate-400 font-normal truncate max-w-[200px]">{invoice.description}</span>
                                </span>
                             </TableCell>
                             <TableCell className="text-slate-600 whitespace-nowrap">
                                {new Date(invoice.dueDate).toLocaleDateString()}
                             </TableCell>
                             <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                                {formatCurrency(invoice.amount)}
                             </TableCell>
                             <TableCell className="whitespace-nowrap">
                                <Badge className={`text-xs gap-1 font-semibold ${statusConf.color}`}>
                                   {statusConf.icon} {statusConf.label}
                                </Badge>
                             </TableCell>
                             <TableCell className="text-slate-500 text-sm whitespace-nowrap">
                                {invoice.paymentMethod || "-"}
                             </TableCell>
                             <TableCell className="text-right whitespace-nowrap">
                                <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                         <span className="sr-only">Abrir menu</span>
                                         <MoreHorizontal className="h-4 w-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                                      </Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end" className="w-[200px]">
                                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => openDetails(invoice.id)}>
                                         <FileText className="mr-2 h-4 w-4" /> Ver Detalhes
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      
                                      {(invoice.status === "PENDING" || invoice.status === "LATE" || invoice.status === "NEGOTIATED") && (
                                         <>
                                         <DropdownMenuItem onClick={() => handleCopyPix(invoice.id)}>
                                            {copiedId === invoice.id ? <Check className="mr-2 h-4 w-4 text-emerald-500" /> : <Copy className="mr-2 h-4 w-4" />} Copiar Pix
                                         </DropdownMenuItem>
                                         <DropdownMenuItem onClick={() => handleDownloadBoleto(invoice.id)} disabled={isDownloading === invoice.id}>
                                            {isDownloading === invoice.id ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin text-slate-500" /> : <FileDown className="mr-2 h-4 w-4" />} Baixar Boleto
                                         </DropdownMenuItem>
                                         </>
                                      )}
                                      {invoice.status === "PAID" && (
                                         <DropdownMenuItem onClick={() => handleDownloadReceipt(invoice.id)} disabled={isDownloading === invoice.id}>
                                            {isDownloading === invoice.id ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin text-slate-500" /> : <Download className="mr-2 h-4 w-4" />} Baixar Recibo
                                         </DropdownMenuItem>
                                      )}
                                   </DropdownMenuContent>
                                </DropdownMenu>
                             </TableCell>
                          </TableRow>
                       )
                     })}
                  </TableBody>
               </Table>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <FileText className="h-12 w-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">Nenhuma fatura encontrada</h3>
                <p className="text-slate-500 mt-1 max-w-sm">Você não possui histórico financeiro ou cobranças registradas no momento.</p>
             </div>
           )}
         </CardContent>
      </Card>

      {/* Modal de Detalhes da Cobrança */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Fatura</DialogTitle>
            <DialogDescription>
              Informações completas sobre esta cobrança.
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 py-4">
               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-sm font-medium text-slate-500">Status</span>
                  <Badge className={`${getStatusConfig(selectedInvoice.status).color} font-bold text-xs`}>
                     {getStatusConfig(selectedInvoice.status).label}
                  </Badge>
               </div>
               
               <div className="space-y-3 px-1">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                     <span className="text-sm text-slate-500">Competência</span>
                     <span className="text-sm font-medium text-slate-900">{selectedInvoice.competency}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                     <span className="text-sm text-slate-500">Descrição</span>
                     <span className="text-sm font-medium text-slate-900">{selectedInvoice.description}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                     <span className="text-sm text-slate-500">Vencimento</span>
                     <span className="text-sm font-medium text-slate-900">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</span>
                  </div>
                  {selectedInvoice.paidAt && (
                     <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-sm text-slate-500">Data de Pagamento</span>
                        <span className="text-sm font-medium text-slate-900">{new Date(selectedInvoice.paidAt).toLocaleDateString()}</span>
                     </div>
                  )}
                  {selectedInvoice.paymentMethod && (
                     <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-sm text-slate-500">Forma de Pagamento</span>
                        <span className="text-sm font-medium text-slate-900">{selectedInvoice.paymentMethod}</span>
                     </div>
                  )}
                  <div className="flex justify-between pt-2">
                     <span className="font-semibold text-slate-900">Total</span>
                     <span className="text-xl font-bold text-indigo-700">{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
               </div>

               {(selectedInvoice.status === "PENDING" || selectedInvoice.status === "LATE" || selectedInvoice.status === "NEGOTIATED") && (
                  <div className="pt-4 flex flex-col gap-2">
                     <Button className="w-full" onClick={() => handleCopyPix(selectedInvoice.id)}>
                        {copiedId === selectedInvoice.id ? <Check className="mr-2 h-4 w-4 text-emerald-500" /> : <Copy className="mr-2 h-4 w-4" />} {copiedId === selectedInvoice.id ? "Código Pix Copiado" : "Copiar Código Pix"}
                     </Button>
                     <Button variant="outline" className="w-full" onClick={() => handleDownloadBoleto(selectedInvoice.id)} disabled={isDownloading === selectedInvoice.id}>
                        {isDownloading === selectedInvoice.id ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />} Baixar Boleto Bancário
                     </Button>
                  </div>
               )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
