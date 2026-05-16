"use client";

import { Course, Activity } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StudentGradesProps {
  courses: Course[];
  activities: Activity[];
}

export function StudentGrades({ courses, activities }: StudentGradesProps) {
  // Vamos agrupar as notas por curso para exibir o boletim
  const courseGrades = courses.map(course => {
    const courseActivities = activities.filter(a => a.courseId === course.id);
    const totalScore = courseActivities.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const totalMax = courseActivities.reduce((acc, curr) => acc + (curr.maxScore || 10), 0);
    
    // Calcula média mockada se não houver atividades para não ficar tudo vazio
    const courseNum = parseInt(course.id.replace(/\D/g, '') || '0');
    const fallbackAvg = 7 + (courseNum % 4) * 0.5; // Valores determinísticos (7.0 a 8.5)
    const average = courseActivities.length > 0 ? (totalScore / courseActivities.length) : fallbackAvg;
    
    // Frequencia mockada
    const attendance = Math.floor(80 + (courseNum % 21)); // 80 a 100%

    return {
      course,
      average: Number(average.toFixed(1)),
      attendance,
      activities: courseActivities,
      status: average >= 7 && attendance >= 75 ? 'APROVADO' : average < 5 ? 'REPROVADO' : 'EXAME'
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Boletim Escolar</h1>
        <p className="text-slate-500 text-sm mt-1">Acompanhe seu desempenho acadêmico e frequência.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {courseGrades.map((cg) => (
          <Card key={cg.course.id} className="border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Lado esquerdo (Descrição e Status) */}
              <div className="bg-slate-50 p-6 md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{cg.course.title}</h3>
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">2026/1</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 items-end justify-between">
                   <div>
                     <p className="text-xs text-slate-500 mb-1 font-medium">Média Final</p>
                     <span className={`text-3xl font-black ${cg.average >= 7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                       {cg.average.toFixed(1).replace('.', ',')}
                     </span>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1 font-medium">Frequência</p>
                      <span className="text-xl font-bold text-slate-700">{cg.attendance}%</span>
                   </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                   <Badge 
                     variant={cg.status === 'APROVADO' ? 'success' : cg.status === 'REPROVADO' ? 'destructive' : 'warning'}
                     className={`w-full justify-center text-sm py-1 font-bold ${
                       cg.status === 'APROVADO' ? 'bg-emerald-100 text-emerald-800' :
                       cg.status === 'REPROVADO' ? 'bg-red-100 text-red-800' :
                       'bg-amber-100 text-amber-800'
                     }`}
                    >
                     {cg.status === 'APROVADO' ? 'APROVADO' : cg.status === 'REPROVADO' ? 'REPROVADO' : 'EM EXAME'}
                   </Badge>
                </div>
              </div>

              {/* Lado direito (Provas e Trabalhos) */}
              <div className="p-6 md:w-2/3">
                 <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Avaliações</h4>
                 
                 {cg.activities.length > 0 ? (
                   <div className="space-y-4">
                     {cg.activities.map(act => (
                       <div key={act.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                          <div className="flex-1">
                             <p className="font-medium text-slate-900">{act.title}</p>
                             <p className="text-xs text-slate-500">{act.type === 'QUIZ' ? 'Prova' : 'Trabalho'}</p>
                          </div>
                          <div className="text-right font-bold text-slate-700">
                             {act.score?.toFixed(1).replace('.', ',')} <span className="text-slate-400 font-normal text-xs">/ {act.maxScore || 10}</span>
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="space-y-4">
                     {/* Notas mockadas pra não ficar vazio */}
                     {[1, 2].map((i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                          <div className="flex-1">
                             <p className="font-medium text-slate-900">Avaliação Parcial {i}</p>
                             <p className="text-xs text-slate-500">Prova</p>
                          </div>
                          <div className="text-right font-bold text-slate-700">
                             {(cg.average - (i * 0.5 - 0.25)).toFixed(1).replace('.', ',')} <span className="text-slate-400 font-normal text-xs">/ 10</span>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
