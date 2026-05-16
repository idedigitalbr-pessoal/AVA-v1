"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { toast } from "sonner";

export function AdminSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações do Sistema</h1>
        <p className="text-slate-500 text-sm mt-1">Ajuste os parâmetros gerais da plataforma acadêmica.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-slate-200">
          <CardHeader>
             <CardTitle>Informações da Instituição</CardTitle>
             <CardDescription>Estes dados aparecerão em documentos e recibos oficiais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Nome Oficial</label>
                 <Input defaultValue="Universidade AVA Digital" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">CNPJ</label>
                 <Input defaultValue="00.000.000/0001-00" />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700">E-mail de Contato Principal</label>
               <Input defaultValue="contato@ava.edu.br" />
             </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
             <CardTitle>Comportamento do Sistema</CardTitle>
             <CardDescription>Ative ou desative funcionalidades globais do AVA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Matrículas Abertas</h4>
                   <p className="text-sm text-slate-500">Permite que alunos se candidatem a novos cursos publicamente.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Emissão Automática de Certificados</h4>
                   <p className="text-sm text-slate-500">Gera certificado ao aluno concluir todos os módulos de um curso.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                <div>
                   <h4 className="text-sm font-bold text-slate-900">Modo de Avaliação Estrita</h4>
                   <p className="text-sm text-slate-500">Impede que alunos avancem nos módulos sem nota mínima.</p>
                </div>
                <Switch defaultChecked={false} />
             </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
           <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto" onClick={() => toast.success("Configurações salvas.")}>
              <Save className="mr-2 h-4 w-4" /> Salvar Configurações
           </Button>
        </div>
      </div>
    </div>
  );
}
