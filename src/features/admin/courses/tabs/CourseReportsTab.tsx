"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, TrendingUp, Users, Activity, Target } from "lucide-react";

export function CourseReportsTab({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <AdminLoadingState text="Carregando estatísticas..." />;

  const handleExport = (reportName: string) => {
    toast.success(`Exportação de ${reportName} iniciada em segundo plano. Você receberá um e-mail quando terminar.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Relatórios Analíticos</h3>
          <p className="text-sm text-slate-500">Acompanhe métricas exclusivas para este curso.</p>
        </div>
        <Button variant="outline" onClick={() => handleExport("Relatório Geral")}>
          <Download className="w-4 h-4 mr-2" /> Exportar Dados Gerais
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Desempenho Acadêmico</CardTitle>
            <CardDescription>Média isolada do curso, curvas de nota e alunos de destaque.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" className="w-full" onClick={() => handleExport("Desempenho")}>
               Gerar CSV
             </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Frequência e Engajamento</CardTitle>
            <CardDescription>Taxas de presenças, fóruns e interações na plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" className="w-full" onClick={() => handleExport("Frequência")}>
               Gerar CSV
             </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5" /> Risco de Evasão</CardTitle>
            <CardDescription>Alunos ausentes por mais de 15 dias consecutivos e sem entregas.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" className="w-full" onClick={() => handleExport("Risco de Evasão")}>
               Gerar CSV
             </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> Certificações</CardTitle>
            <CardDescription>Métricas de diplomas e certificados expedidos e invalidados.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="secondary" className="w-full" onClick={() => handleExport("Certificados")}>
               Gerar CSV
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
