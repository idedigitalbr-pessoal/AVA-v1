"use client";

import { useStudentCourseDetails, useStudentModules } from "@/hooks/use-queries";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { PlayCircle, CheckCircle2, ChevronLeft, FileText, Clock, File, Megaphone, CheckSquare, MessageSquare, GraduationCap, LinkIcon, Lock, Circle } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

interface CourseDetailsProps {
  courseId: string;
}

export function CourseDetails({ courseId }: CourseDetailsProps) {
  const { data: course, isLoading: isLoadingCourse } = useStudentCourseDetails(courseId);
  const { data: modules, isLoading: isLoadingModules } = useStudentModules(courseId);

  if (isLoadingCourse || isLoadingModules) {
    return (
      <div className="space-y-8 animate-pulse">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (!course) {
    return <EmptyState icon={<FileText className="w-10 h-10 text-slate-300" />} title="Disciplina não encontrada" description="Não foi possível carregar os dados desta disciplina." />;
  }

  const progress = course.progress || 0;
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="h-48 w-full md:w-72 relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-slate-100 flex-shrink-0">
          {course.thumbnailUrl ? (
            <Image 
              src={course.thumbnailUrl} 
              alt={course.name} 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-indigo-200">
              <FileText size={56} />
             </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-center space-y-4">
          <Link href="/portal/aluno/disciplinas" className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 w-fit">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para Disciplinas
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{course.name}</h1>
            <p className="text-slate-600 mt-2 font-medium">Prof. {course.teacherName}</p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 md:gap-8 text-sm text-slate-500">
             <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span>{course.totalModules || 0} Módulos</span>
             </div>
             <div className="flex items-center gap-1.5">
                <PlayCircle className="h-4 w-4 text-indigo-400" />
                <span>{course.totalLessons || 0} Aulas</span>
             </div>
             {course.courseCode && (
               <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">{course.courseCode}</span>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-semibold text-slate-900">Seu Progresso</h3>
            <p className="text-sm text-slate-500">Você concluiu {course.completedLessons || 0} de {course.totalLessons || 0} aulas.</p>
          </div>
          <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="conteudo" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-slate-200 rounded-none h-auto p-0 flex flex-nowrap">
          <TabsTrigger value="conteudo" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
            <FileText className="w-4 h-4 mr-2" /> Conteúdo
          </TabsTrigger>
          <TabsTrigger value="atividades" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
            <CheckSquare className="w-4 h-4 mr-2" /> Atividades
          </TabsTrigger>
          <TabsTrigger value="materiais" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
             <File className="w-4 h-4 mr-2" /> Materiais Extras
          </TabsTrigger>
          <TabsTrigger value="avisos" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
             <Megaphone className="w-4 h-4 mr-2" /> Avisos
          </TabsTrigger>
          <TabsTrigger value="forum" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
             <MessageSquare className="w-4 h-4 mr-2" /> Fórum
          </TabsTrigger>
          <TabsTrigger value="notas" className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none bg-transparent hover:bg-slate-50 px-6 py-3 font-medium">
             <GraduationCap className="w-4 h-4 mr-2" /> Notas
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="conteudo" className="space-y-6">
            {!modules || modules.length === 0 ? (
              <EmptyState icon={<FileText className="w-8 h-8 text-slate-300" />} title="Sem módulos" description="Esta disciplina ainda não possui conteúdo cadastrado." />
            ) : (
              modules.map((module) => (
                <div key={module.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">{module.title}</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {module.lessons && module.lessons.map((lesson) => {
                       // Simulated status UI: COMPLETED, PENDING, BLOCKED (based on order if not COMPLETED and previous isn't)
                       const isCompleted = lesson.status === 'COMPLETED';
                       const inProgress = lesson.status === 'IN_PROGRESS';
                       const isLocked = !isCompleted && !inProgress && lesson.order > 1; // Simplified logic just for UI display
                       
                       return (
                         <div key={lesson.id} className={`flex flex-col sm:flex-row justify-between sm:items-center px-6 py-4 hover:bg-slate-50 transition-colors group ${isLocked ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-4">
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                              ) : inProgress ? (
                                <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                              ) : isLocked ? (
                                <Lock className="h-5 w-5 text-slate-300 flex-shrink-0" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                              )}
                              <div>
                                <p className={`font-medium ${isCompleted ? 'text-slate-600' : 'text-slate-900'}`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    {lesson.type === 'VIDEO' ? <PlayCircle className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                                    {lesson.type === 'VIDEO' ? 'Vídeo' : lesson.type === 'PDF' ? 'PDF' : lesson.type === 'QUIZ' ? 'Quiz' : 'Texto'}
                                  </span>
                                  {lesson.duration && (
                                     <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {lesson.duration} min</span>
                                     </>
                                  )}
                                  {isLocked && (
                                     <>
                                        <span>•</span>
                                        <span className="text-red-500 font-medium tracking-tight">BLOQUEADA</span>
                                     </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {!isLocked && (
                              <Link href={`/portal/aluno/disciplinas/${course.id}/aulas/${lesson.id}`} className="mt-4 sm:mt-0 w-full sm:w-auto">
                                <Button variant={isCompleted ? "outline" : "default"} size="sm" className={`w-full ${!isCompleted ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}>
                                  {isCompleted ? 'Revisar' : 'Acessar'}
                                </Button>
                              </Link>
                            )}
                         </div>
                       )
                    })}
                    {(!module.lessons || module.lessons.length === 0) && (
                      <div className="px-6 py-4 text-sm text-slate-500 text-center">Nenhuma aula disponível neste módulo.</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="atividades">
            <EmptyState icon={<CheckSquare className="w-8 h-8 text-slate-300" />} title="Gestão de Atividades" description="Aqui você verá as listas, quizzes e trabalhos da disciplina." />
          </TabsContent>
          
          <TabsContent value="materiais">
            <EmptyState icon={<File className="w-8 h-8 text-slate-300" />} title="Arquivos da Disciplina" description="PDFs, planilhas e slides de apoio às aulas." />
          </TabsContent>
          
          <TabsContent value="avisos">
            <EmptyState icon={<Megaphone className="w-8 h-8 text-slate-300" />} title="Avisos do Professor" description="Comunicados importantes sobre a turma." />
          </TabsContent>
          
          <TabsContent value="forum">
            <EmptyState icon={<MessageSquare className="w-8 h-8 text-slate-300" />} title="Fórum de Dúvidas" description="Interaja com outros alunos e com a tutoria." />
          </TabsContent>

          <TabsContent value="notas">
             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                      <GraduationCap className="h-6 w-6" />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900 text-lg">Boletim Consolidado</h3>
                      <p className="text-sm text-slate-500">Avaliações oficiais desta disciplina</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                     <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Média Parcial</span>
                     <span className="text-2xl font-black text-slate-900">-</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                     <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Faltas</span>
                     <span className="text-2xl font-black text-slate-900">0</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                     <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Situação</span>
                     <span className="text-sm font-black text-blue-600 uppercase">Em Andamento</span>
                   </div>
                </div>

                <div className="text-center py-8">
                   <p className="text-slate-500 text-sm">Nenhuma avaliação cadastrada ainda no sistema acadêmico para este período.</p>
                </div>
             </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
