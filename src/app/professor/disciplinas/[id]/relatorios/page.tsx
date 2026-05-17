import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Info } from "lucide-react";

export default async function RelatoriosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Relatórios de Desempenho</h2>
          <p className="text-slate-500 text-sm mt-1">Acompanhe as métricas de engajamento e as estatísticas da turma.</p>
        </div>
      </div>

      <Card className="border-dashed shadow-none bg-slate-50">
        <CardHeader className="items-center text-center pb-2">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-2">
            <BarChart className="w-8 h-8" />
          </div>
          <CardTitle className="text-lg">Dashboard Analítico</CardTitle>
          <CardDescription>
            Gráficos detalhados sobre visualizações de aulas, média das provas e evolução da turma.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-8">
          <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium bg-indigo-50 px-4 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            Recurso planejado para a próxima versão
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
