"use client";

import { useState } from "react";
import { mockAvailableServices as MOCK_AVAILABLE_SERVICES } from "@/mocks/student.mock";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, FolderSync, GraduationCap, DollarSign, FileText, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ServiceNew() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredServices = MOCK_AVAILABLE_SERVICES.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedService = MOCK_AVAILABLE_SERVICES.find(s => s.id === selectedServiceId);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/portal/aluno/servicos");
      }, 2000);
    }, 1500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "DOCUMENTOS": return <FolderSync className="w-5 h-5 text-blue-500" />;
      case "ACADEMICO": return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case "FINANCEIRO": return <DollarSign className="w-5 h-5 text-emerald-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl border border-emerald-200 p-8 text-center animate-in zoom-in fade-in duration-500 shadow-xl shadow-emerald-500/10">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-emerald-900 mb-2">Solicitação Enviada!</h2>
        <p className="text-emerald-700 mb-6">
          Seu protocolo foi gerado com sucesso. Você pode acompanhar o andamento na área de serviços.
        </p>
        <div className="bg-slate-50 rounded-lg p-4 mb-6 inline-block">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Número do Protocolo</span>
          <span className="font-mono font-bold text-xl text-slate-800">2026105882</span>
        </div>
        <div>
          <Button onClick={() => router.push("/portal/aluno/servicos")} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
            Ver Meus Protocolos
          </Button>
        </div>
      </div>
    );
  }

  if (selectedService) {
    return (
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedServiceId(null)} className="mb-6 -ml-4 text-slate-500">
          Voltar para a lista
        </Button>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4 pb-6 border-b border-slate-100 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                {getCategoryIcon(selectedService.category)}
              </div>
              <div>
                <Badge variant="outline" className="mb-2 bg-slate-50 text-slate-500 border-slate-200 text-[10px] uppercase font-bold tracking-wider">
                  {selectedService.category}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900">{selectedService.name}</h2>
                <p className="text-slate-600 mt-1">{selectedService.description}</p>
                <p className="text-sm font-medium text-slate-500 mt-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Prazo estimado: <span className="text-slate-800">{selectedService.estimatedDays} dias úteis</span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Justificativa ou Observações (Opcional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Se necessário, adicione mais detalhes sobre a sua solicitação..." 
                  className="min-h-[120px] bg-white resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-slate-500">Dependendo do serviço, a secretaria pode entrar em contato para solicitar documentos adicionais.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedServiceId(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                  {isSubmitting ? "Enviando..." : "Confirmar Solicitação"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Qual serviço você precisa?..." 
          className="pl-9 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map(service => (
          <Card 
            key={service.id} 
            className="border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-200 group"
            onClick={() => setSelectedServiceId(service.id)}
          >
            <CardContent className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-50 group-hover:bg-indigo-50 transition-colors rounded-lg flex items-center justify-center shrink-0">
                  {getCategoryIcon(service.category)}
                </div>
                <Badge variant="outline" className="bg-transparent text-slate-500 border-slate-200 text-[10px] uppercase font-bold tracking-wider">
                  {service.category}
                </Badge>
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-indigo-700 transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">
                {service.description}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Prazo: {service.estimatedDays} {service.estimatedDays === 1 ? 'dia' : 'dias'}</span>
                <span className="flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Solicitar <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
