"use client";

import { User, DashboardStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Download, CheckCircle2, FileX, Fingerprint, CalendarDays, Edit2, Check } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface StudentProfileProps {
  user: User;
  stats: DashboardStats['student'];
}

export function StudentProfile({ user, stats }: StudentProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveContact = () => {
    setIsSaving(true);
    setTimeout(() => {
       setIsSaving(false);
       setIsEditModalOpen(false);
       toast.success("Dados de contato atualizados com sucesso!");
    }, 1000);
  };

  const mockDocuments = [
    { id: 1, name: "RG / CPF", status: "VALIDATED" },
    { id: 2, name: "Comprovante de Residência", status: "VALIDATED" },
    { id: 3, name: "Histórico Escolar Ensino Médio", status: "PENDING" },
    { id: 4, name: "Certificado de Conclusão Ensino Médio", status: "MISSING" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-slate-500 text-sm mt-1">Visualize suas informações pessoais, acadêmicas e documentação.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Lado Esquerdo - Info Principal */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Card className="overflow-hidden border-slate-200 shadow-sm relative">
             <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
             <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 border-4 border-white rounded-full bg-slate-200 h-24 w-24 overflow-hidden flex items-center justify-center text-3xl font-bold text-slate-500 group shadow-sm">
                  {user.avatarUrl ? (
                    <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
                  ) : (
                    user.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                
                <div className="mt-14">
                   <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                   <div className="flex items-center gap-2 mt-1">
                      <p className="text-slate-500 text-sm">{user.email}</p>
                      <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 font-medium">Aluno</Badge>
                   </div>
                   
                   <div className="mt-6 space-y-3">
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <GraduationCap className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-700">Sistemas de Informação</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Fingerprint className="h-4 w-4 text-slate-400" />
                        <span>RA: <span className="font-medium">202610123</span></span>
                     </div>
                     <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
                        <div className="flex items-center gap-3">
                           <Phone className="h-4 w-4 text-slate-400" />
                           <span>(11) 98765-4321</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>São Paulo, SP</span>
                     </div>
                   </div>
                   <div className="mt-6">
                      <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={() => setIsEditModalOpen(true)}>
                         <Edit2 className="w-4 h-4 mr-2" /> Editar Contato
                      </Button>
                   </div>
                </div>
             </div>
          </Card>
        </div>

        {/* Lado Direito - Detalhes */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
               <CardTitle className="text-lg flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-600" /> Dados de Matrícula</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Situação Acadêmica</p>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="font-bold text-slate-800">Matriculado Regular</span>
                     </div>
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Turma Presencial</p>
                     <p className="font-semibold text-slate-800">SINF-26A / Noturno</p>
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Polo de Apoio</p>
                     <p className="font-semibold text-slate-800">Polo Paulista - SP</p>
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Período Letivo Vigente</p>
                     <p className="font-semibold text-slate-800">1º Semestre de 2026</p>
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Data de Ingresso</p>
                     <p className="font-semibold text-slate-800">05/02/2026</p>
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-medium mb-1">Previsão de Conclusão</p>
                     <p className="font-semibold text-slate-800">Dez/2029</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
               <CardTitle className="text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-600" /> Documentação</CardTitle>
               <CardDescription>Gerencie a entrega dos seus documentos obrigatórios.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-0">
               <div className="divide-y divide-slate-100">
                  {mockDocuments.map((doc) => (
                     <div key={doc.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                           {doc.status === "VALIDATED" ? (
                              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                           ) : doc.status === "PENDING" ? (
                              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0"><CalendarDays className="w-5 h-5" /></div>
                           ) : (
                              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg shrink-0"><FileX className="w-5 h-5" /></div>
                           )}
                           <div>
                              <p className="font-medium text-slate-900">{doc.name}</p>
                              {doc.status === "VALIDATED" && <p className="text-xs text-emerald-600 font-medium mt-0.5">Validado pela secretaria</p>}
                              {doc.status === "PENDING" && <p className="text-xs text-amber-600 font-medium mt-0.5">Em análise</p>}
                              {doc.status === "MISSING" && <p className="text-xs text-rose-600 font-medium mt-0.5">Pendente de envio</p>}
                           </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                           {doc.status === "VALIDATED" && (
                              <Button variant="ghost" size="sm" className="text-slate-500"><Download className="w-4 h-4 mr-2" /> Baixar via</Button>
                           )}
                           {doc.status === "MISSING" && (
                              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Enviar Documento</Button>
                           )}
                           {doc.status === "PENDING" && (
                              <Button variant="outline" size="sm" disabled>Aguardando</Button>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Editar Informações</DialogTitle>
               <DialogDescription>
                  Atualize seus dados de contato básicos. Para alterar dados cadastrais oficiais (Nome, Documentos), abra um chamado na secretaria.
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                  <Label htmlFor="phone">Celular</Label>
                  <Input id="phone" defaultValue="(11) 98765-4321" />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="address">Endereço Residencial</Label>
                  <Input id="address" defaultValue="Rua Exemplo, 123" />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input id="zipcode" defaultValue="01000-000" />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="city">Cidade / Estado</Label>
                  <div className="flex gap-2">
                     <Input id="city" defaultValue="São Paulo" className="flex-1" />
                     <Input id="state" defaultValue="SP" className="w-20 text-center" />
                  </div>
               </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
               </DialogClose>
               <Button onClick={handleSaveContact} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}
