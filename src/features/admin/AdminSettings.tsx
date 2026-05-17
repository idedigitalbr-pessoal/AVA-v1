"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader } from "./components";

export function AdminSettings() {
  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <AdminPageHeader 
        title="Configurações do Sistema" 
        description="Ajuste os parâmetros gerais da plataforma acadêmica, identidade visual e regras de acesso."
      />

      <div className="grid gap-6">
        <Card className="border-slate-200">
          <CardHeader>
             <CardTitle>Identidade Visual e Instituição</CardTitle>
             <CardDescription>Estes dados aparecerão no portal e em documentos oficiais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex gap-6 items-end">
                <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                  Logo
                </div>
                <Button variant="outline" size="sm">
                  <UploadCloud className="w-4 h-4 mr-2" /> Alterar Logo
                </Button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Nome Oficial</label>
                 <Input defaultValue="StudUp Platform" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">CNPJ</label>
                 <Input defaultValue="00.000.000/0001-00" />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700">E-mail de Contato Principal</label>
               <Input defaultValue="contato@studup.example.com" />
             </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
             <CardTitle>Configurações Acadêmicas</CardTitle>
             <CardDescription>Parâmetros padrão para aprovação e gestão letiva.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Ano Letivo</label>
                 <Input defaultValue="2026" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Período Atual</label>
                 <Input defaultValue="1º Semestre" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Média Mínima</label>
                 <Input defaultValue="7.0" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Frequência Mín. (%)</label>
                 <Input defaultValue="75" />
               </div>
               <div className="space-y-2 lg:col-span-4 max-w-sm">
                 <label className="text-sm font-medium text-slate-700">Carga Horária Mínima (horas)</label>
                 <Input defaultValue="120" type="number" />
               </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
             <CardTitle>Comportamento do AVA</CardTitle>
             <CardDescription>Ative ou desative funcionalidades globais do ambiente virtual de aprendizagem.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Emissão Automática de Certificados</h4>
                   <p className="text-sm text-slate-500">Gera certificado quando o aluno atinge progresso e notas mínimos.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Permitir Comentários nas Aulas</h4>
                   <p className="text-sm text-slate-500">Alunos podem comentar e discutir abaixo dos vídeos.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Mensagens Privadas</h4>
                   <p className="text-sm text-slate-500">Permitir que alunos enviem mensagens diretas aos professores.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Entregas Fora do Prazo</h4>
                   <p className="text-sm text-slate-500">Permitir submissão de atividades após a data de encerramento, marcando como atrasado.</p>
                </div>
                <Switch defaultChecked={false} />
             </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4 pb-10">
           <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Salvar Configurações
           </Button>
        </div>
      </div>
    </div>
  );
}
