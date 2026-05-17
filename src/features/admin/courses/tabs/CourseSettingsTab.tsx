"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function CourseSettingsTab({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(true);
  const [published, setPublished] = useState(false);
  const [allowEnrollment, setAllowEnrollment] = useState(true);
  const [autoCertificate, setAutoCertificate] = useState(false);

  useEffect(() => {
    // get course config here
    setTimeout(() => {
      setPublished(true);
      setLoading(false);
    }, 500);
  }, []);

  const handleSave = () => {
    toast.success("Configurações atualizadas com sucesso!");
  };

  if (loading) return <AdminLoadingState text="Carregando configurações..." />;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações Avançadas</h3>
        <p className="text-sm text-slate-500">Ajuste regras de visibilidade e automações do curso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ciclo de Vida do Curso</CardTitle>
            <CardDescription>Gerencie disponibilidade na plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Publicado para consulta</Label>
                <div className="text-sm text-slate-500">Course page fica acessível a todos.</div>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Matrículas Abertas</Label>
                <div className="text-sm text-slate-500">Alunos podem se autoinstruir ou a secretaria matricular livremente.</div>
              </div>
              <Switch checked={allowEnrollment} onCheckedChange={setAllowEnrollment} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automações e Emissões</CardTitle>
            <CardDescription>Facilite o trabalho na conclusão.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Emitir Certificado Automático</Label>
                <div className="text-sm text-slate-500">Ao cumprir Média 7.0 e 75% Frequência, liberar PDF e Badge.</div>
              </div>
              <Switch checked={autoCertificate} onCheckedChange={setAutoCertificate} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </div>
    </div>
  );
}
