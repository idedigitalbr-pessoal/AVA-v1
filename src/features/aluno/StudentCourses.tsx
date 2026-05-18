"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BookOpen, Search, ArrowRight, Clock, CheckCircle2, PlayCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useStudentCourses } from "@/hooks/use-queries";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = 'ALL' | 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED' | 'PENDING';

export function StudentCourses() {
  const { data: courses, isLoading, error } = useStudentCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    
    let result = courses;

    // Filter by type
    if (activeFilter === 'IN_PROGRESS') {
      result = result.filter(c => c.status === 'IN_PROGRESS');
    } else if (activeFilter === 'NOT_STARTED') {
      result = result.filter(c => c.status === 'NOT_STARTED');
    } else if (activeFilter === 'COMPLETED') {
      result = result.filter(c => c.status === 'COMPLETED');
    } else if (activeFilter === 'PENDING') {
      result = result.filter(c => (c.pendingActivities || 0) > 0);
    }

    // Filter by search
    if (searchTerm) {
      const lowerReq = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lowerReq) || 
        c.teacherName.toLowerCase().includes(lowerReq) || 
        (c.courseCode && c.courseCode.toLowerCase().includes(lowerReq))
      );
    }

    return result;
  }, [courses, searchTerm, activeFilter]);

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
        Erro ao carregar disciplinas. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Disciplinas</h1>
          <p className="text-slate-500 text-sm mt-1">Acesse o conteúdo e acompanhe seu progresso atual.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nome, código ou professor..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        <Button 
          variant={activeFilter === 'ALL' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('ALL')}
          className={activeFilter === 'ALL' ? "bg-indigo-600 hover:bg-indigo-700" : "text-slate-600"}
        >
          Todas
        </Button>
        <Button 
          variant={activeFilter === 'IN_PROGRESS' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('IN_PROGRESS')}
          className={activeFilter === 'IN_PROGRESS' ? "bg-blue-600 hover:bg-blue-700" : "text-slate-600"}
        >
           Em Andamento
        </Button>
        <Button 
          variant={activeFilter === 'NOT_STARTED' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('NOT_STARTED')}
          className={activeFilter === 'NOT_STARTED' ? "bg-slate-700 hover:bg-slate-800" : "text-slate-600"}
        >
           Não Iniciadas
        </Button>
        <Button 
          variant={activeFilter === 'COMPLETED' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('COMPLETED')}
          className={activeFilter === 'COMPLETED' ? "bg-emerald-600 hover:bg-emerald-700" : "text-slate-600"}
        >
           Concluídas
        </Button>
         <Button 
          variant={activeFilter === 'PENDING' ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter('PENDING')}
          className={activeFilter === 'PENDING' ? "bg-amber-600 hover:bg-amber-700" : "text-slate-600"}
        >
           Com Pendências
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
             <Card key={i} className="flex flex-col overflow-hidden h-[450px]">
                <Skeleton className="h-40 w-full" />
                <CardHeader className="flex-1">
                   <Skeleton className="h-6 w-3/4 mb-2" />
                   <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
             </Card>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const { 
              status = 'IN_PROGRESS', 
              progress, 
              name, 
              teacherName, 
              courseCode, 
              period, 
              pendingActivities,
              nextLesson 
            } = course;

            return (
              <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 w-full relative bg-slate-200">
                  {course.thumbnailUrl ? (
                    <Image 
                      src={course.thumbnailUrl} 
                      alt={name} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-indigo-50 to-slate-100">
                      <BookOpen size={48} className="text-indigo-200" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {status === 'COMPLETED' && <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none"><CheckCircle2 className="w-3 h-3 mr-1" /> Concluída</Badge>}
                    {status === 'IN_PROGRESS' && <Badge className="bg-blue-500 hover:bg-blue-600 border-none"><PlayCircle className="w-3 h-3 mr-1" /> Em Andamento</Badge>}
                    {status === 'NOT_STARTED' && <Badge className="bg-slate-700 hover:bg-slate-800 border-none"><Clock className="w-3 h-3 mr-1" /> Não Iniciada</Badge>}
                  </div>
                  
                  {/* Pendencies Badge */}
                  {(pendingActivities || 0) > 0 && (
                     <div className="absolute top-4 right-4 flex gap-2">
                         <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm">
                           <AlertCircle className="w-3 h-3 mr-1" /> {pendingActivities} pendente{(pendingActivities || 0) > 1 ? 's' : ''}
                         </Badge>
                     </div>
                  )}
                </div>
                
                <CardHeader className="flex-1 pb-2">
                  <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-semibold text-indigo-600 tracking-wider flex items-center gap-2">
                        {courseCode && <span>{courseCode}</span>}
                        {courseCode && period && <span>•</span>}
                        {period && <span>{period}</span>}
                      </p>
                  </div>
                  <CardTitle className="line-clamp-2 leading-tight">{name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 mt-2 text-sm text-slate-600">
                    <span className="shrink-0 font-medium">✏️</span> {teacherName}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4 space-y-5">
                   {/* Próxima Aula */}
                   <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 h-16 flex items-center">
                      {nextLesson ? (
                         <div className="flex items-start gap-3 w-full">
                           <div className="mt-0.5 shrink-0">
                              <PlayCircle className="w-5 h-5 text-indigo-500" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-500 font-medium mb-0.5">Continuar de onde parou:</p>
                              <p className="text-sm text-slate-900 font-semibold truncate leading-tight">{nextLesson.title}</p>
                           </div>
                         </div>
                      ) : (
                         <div className="w-full text-center text-sm text-slate-500">
                           {status === 'COMPLETED' ? 'Todas as aulas concluídas!' : 'Nenhuma aula iniciada.'}
                         </div>
                      )}
                   </div>

                   {/* Progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600 font-semibold tracking-wide">
                      <span>PROGRESSO</span>
                      <span className={status === 'COMPLETED' ? "text-emerald-600" : "text-indigo-600"}>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" indicatorClassName={status === 'COMPLETED' ? "bg-emerald-500" : "bg-indigo-600"} />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-slate-100 bg-white pt-4">
                  <Link href={`/portal/aluno/disciplinas/${course.id}`} className="w-full">
                    <Button variant={status === 'NOT_STARTED' ? "outline" : "default"} className={`w-full ${status !== 'NOT_STARTED' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>
                      {status === 'NOT_STARTED' ? 'Iniciar Disciplina' : 'Acessar Ambiente'} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState 
           icon={<BookOpen className="w-10 h-10 text-slate-300" />} 
           title="Nenhuma disciplina encontrada" 
           description={searchTerm ? "Tente buscar com outros termos." : "Nenhuma disciplina corresponde a este filtro no momento."} 
        />
      )}
    </div>
  );
}

