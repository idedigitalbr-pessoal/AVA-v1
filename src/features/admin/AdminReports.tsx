"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, BookOpen, Activity, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function AdminReports() {
  const reports = [
    { title: "Desempenho de Alunos", description: "Relatório de notas, médias gerais e aprovação por curso.", icon: Activity, href: "/admin/relatorios/notas" },
    { title: "Frequência e Evasão", description: "Análise de presença e estimativa de evasão por turma.", icon: Users, href: "/admin/relatorios/frequencia" },
    { title: "Engajamento em Disciplinas", description: "Métricas de acessos, submissões e tempo na plataforma.", icon: BookOpen, href: "#" },
    { title: "Receitas e Inadimplência", description: "Estatísticas financeiras e pagamentos atrasados.", icon: TrendingUp, href: "#" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Relatórios Base</h1>
        <p className="text-slate-500 text-sm mt-1">Extraia dados analíticos da plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => {
          const Icon = report.icon;
          return (
            <Card key={idx} className="border-slate-200">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                   <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="mt-1">{report.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col sm:flex-row gap-3">
                 <Link href={report.href} className="w-full">
                    <Button variant="outline" className="w-full">
                       Visualizar
                    </Button>
                 </Link>
                 <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => toast.success("Download iniciado.")}>
                    <Download className="mr-2 h-4 w-4" /> CSV
                 </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
