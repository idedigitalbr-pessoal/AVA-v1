import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Info } from "lucide-react";

export default async function QuizzesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Provas e Quizzes</h2>
          <p className="text-slate-500 text-sm mt-1">Gerencie as avaliações objetivas da disciplina.</p>
        </div>
      </div>

      <Card className="border-dashed shadow-none bg-slate-50">
        <CardHeader className="items-center text-center pb-2">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-2">
            <FileQuestion className="w-8 h-8" />
          </div>
          <CardTitle className="text-lg">Editor de Quizzes</CardTitle>
          <CardDescription>
            A criação de provas e o banco de questões específico desta disciplina estarão disponíveis na próxima atualização.
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
