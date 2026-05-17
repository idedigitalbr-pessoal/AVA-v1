"use client";

import { AdminPageHeader } from "../components";
import { AdminCertificatesTabs } from "./AdminCertificatesTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FileSignature, CheckCircle, Clock, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AdminCertificatesDashboard() {
  const router = useRouter();

  // Mocks for dashboard
  const issuedTotal = 1450;
  const eligibleStudents = 45;
  const pendingSignatures = 12;
  const activeTemplates = 5;

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Certificados" 
        description="Gestão de certificados emitidos, alunos elegíveis e configuração de modelos (templates)."
        action={
          <Button onClick={() => toast.info("Relatório de emissão exportado com sucesso!")}>
            <FileSignature className="w-4 h-4 mr-2" /> Exportar Dados
          </Button>
        }
      />

      <AdminCertificatesTabs />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Emitidos</CardTitle>
            <Award className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{issuedTotal}</div>
            <p className="text-xs text-slate-500 mt-1">Total na plataforma</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Elegíveis</CardTitle>
            <CheckCircle className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{eligibleStudents}</div>
            <p className="text-xs text-slate-500 mt-1">Alunos aguardando emissão</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Pendências</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingSignatures}</div>
            <p className="text-xs text-slate-500 mt-1">Aguardando assinaturas/revisão</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Modelos</CardTitle>
            <Settings className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeTemplates}</div>
            <p className="text-xs text-slate-500 mt-1">Templates ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
         <h2 className="text-lg font-semibold text-slate-900 mb-4">Ações Rápidas</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/certificados/emitidos')}>
             <Award className="w-6 h-6 text-emerald-600" />
             <span>Certificados Emitidos</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/certificados/elegiveis')}>
             <CheckCircle className="w-6 h-6 text-indigo-600" />
             <span>Alunos Elegíveis</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/certificados/templates')}>
             <Settings className="w-6 h-6 text-slate-600" />
             <span>Configurar Modelos</span>
           </Button>
           <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" onClick={() => router.push('/admin/certificados/validacao')}>
             <ShieldCheck className="w-6 h-6 text-blue-600" />
             <span>Portal de Validação</span>
           </Button>
         </div>
      </div>
    </div>
  );
}
