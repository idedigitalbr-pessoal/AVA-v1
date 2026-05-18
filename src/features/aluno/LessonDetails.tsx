"use client";

import { useStudentCourseDetails, useStudentModules, useStudentLesson } from "@/hooks/use-queries";
import { studentLessonsService } from "@/lib/api/services/student-lessons.service";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, FileText, Download, Lock, MessageCircle, Send, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { StudentModule, StudentLesson } from "@/types/student";

interface LessonDetailsProps {
  courseId: string;
  lessonId: string;
}

export function LessonDetails({ courseId, lessonId }: LessonDetailsProps) {
  const { user } = useAuth();
  const router = useRouter();
  
  const { data: course, isLoading: loadingCourse } = useStudentCourseDetails(courseId);
  const { data: initialModules, isLoading: loadingModules } = useStudentModules(courseId);
  const { data: initialLesson, isLoading: loadingLesson } = useStudentLesson(courseId, lessonId);
  
  // Deriving initial state if possible, though since React Query returns undefined first,
  // we cannot just set it in useState initially.
  // Instead of syncing with useEffect, we just use the fetched data as a base
  // and maintain local overrides for optimism.
  const [modulesOverride, setModulesOverride] = useState<Record<string, StudentModule>>({});
  const [lessonStatusOverride, setLessonStatusOverride] = useState<Record<string, string>>({});
  
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    if (initialLesson?.id) {
      let isMounted = true;
      studentLessonsService.getLessonComments(initialLesson.id).then(qs => {
        if (isMounted) {
          setQuestions(qs);
          setLoadingQuestions(false);
        }
      });
      return () => { isMounted = false; };
    }
  }, [initialLesson?.id]);
  
  const currentLesson = useMemo(() => {
    if (!initialLesson) return null;
    return {
       ...initialLesson,
       status: lessonStatusOverride[initialLesson.id] || initialLesson.status
    };
  }, [initialLesson, lessonStatusOverride]);

  const modules = useMemo(() => {
    if (!initialModules) return [];
    return initialModules.map(m => {
       const modOverride = modulesOverride[m.id] || m;
       return {
         ...modOverride,
         lessons: modOverride.lessons.map(l => ({
           ...l,
           status: lessonStatusOverride[l.id] || l.status
         }))
       };
    });
  }, [initialModules, modulesOverride, lessonStatusOverride]);

  const allLessons = useMemo(() => modules.flatMap(m => m.lessons), [modules]);
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = currentLesson?.status === 'COMPLETED';
  
  const handleComplete = async () => {
    if (!currentLesson) return;
    
    const newStatus = isCompleted ? 'PENDING' : 'COMPLETED';
    setLessonStatusOverride(prev => ({ ...prev, [currentLesson.id]: newStatus }));

    try {
      if (isCompleted) {
        await studentLessonsService.uncompleteLesson(currentLesson.id);
        toast.info("Aula marcada como não concluída.");
      } else {
        await studentLessonsService.completeLesson(currentLesson.id);
        toast.success("Aula concluída com sucesso!");
      }
    } catch {
      toast.error("Erro ao atualizar status da aula.");
    }
  };

  const handleLessonChange = (id: string) => {
    router.push(`/portal/aluno/disciplinas/${courseId}/aulas/${id}`);
  };
  
  const handlePostQuestion = async () => {
    if(!newQuestion.trim() || !currentLesson) return;
    
    try {
      const q = await studentLessonsService.createLessonQuestion(currentLesson.id, { text: newQuestion });
      setQuestions([q, ...questions]);
      setNewQuestion("");
      toast.success("Dúvida enviada! O professor será notificado.");
    } catch {
      toast.error("Erro ao enviar dúvida.");
    }
  };

  const calculateModuleProgress = (moduleLessons: StudentLesson[]) => {
    if (moduleLessons.length === 0) return 0;
    const completed = moduleLessons.filter(l => l.status === 'COMPLETED').length;
    return Math.round((completed / moduleLessons.length) * 100);
  };

  if (loadingCourse || loadingModules || loadingLesson) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 animate-pulse p-4">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
        <Skeleton className="w-full lg:w-80 xl:w-96 h-[600px] rounded-2xl" />
      </div>
    );
  }

  if (!course || !currentLesson) return <div className="p-8 text-center text-slate-500">Aula não encontrada.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Box de Conteúdo Principal */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 font-medium">
          <Link href="/portal/aluno/disciplinas" className="hover:text-indigo-600 transition-colors">Minhas Disciplinas</Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300" />
          <Link href={`/portal/aluno/disciplinas/${course.id}`} className="hover:text-indigo-600 transition-colors truncate max-w-[150px] sm:max-w-xs">{course.name}</Link>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300" />
          <span className="text-slate-800 line-clamp-1">{currentLesson.title}</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 leading-tight">{currentLesson.title}</h1>
          
          {/* Video Player Mock Melhorado */}
          <div className="bg-black aspect-video w-full rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 relative mb-6 border border-slate-800">
            {currentLesson.videoUrl ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={currentLesson.videoUrl} 
                title={currentLesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                <PlayCircle className="w-16 h-16 text-slate-700 mb-4" />
                <p className="text-slate-400 font-medium text-lg">Conteúdo em texto ou material complementar.</p>
                <p className="text-slate-500 text-sm mt-2">Esta aula não possui vídeo.</p>
              </div>
            )}
            {/* Fake progress bar overlay if it was video */}
            {currentLesson.videoUrl && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-indigo-500 w-[45%]" />
              </div>
            )}
          </div>

          {/* Navegação Rápida Pós-Vídeo */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mb-6 border-b border-slate-100">
            <Button 
              onClick={handleComplete} 
              className={`w-full sm:w-auto font-bold transition-all ${
                isCompleted 
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
              }`}
            >
               {isCompleted ? (
                 <><CheckCircle2 className="h-4 w-4 mr-2" /> Aula Concluída</>
               ) : (
                 <><Check className="h-4 w-4 mr-2" /> Marcar como concluída</>
               )}
            </Button>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {prevLesson && (
                <Button variant="outline" size="sm" onClick={() => handleLessonChange(prevLesson.id)} className="flex-1 sm:flex-none hover:bg-slate-50">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                </Button>
              )}
              {nextLesson && (
                <Button variant="outline" size="sm" onClick={() => handleLessonChange(nextLesson.id)} className="flex-1 sm:flex-none hover:bg-slate-50">
                  Próxima <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Texto Mock */}
          {currentLesson.content && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content.replace(/\n/g, '<br/>') || '<p>Conteúdo da aula não disponível.</p>' }} />
            </div>
          )}
        </div>

        {/* Anexos */}
        {(currentLesson.attachments?.length ?? 0) > 0 && (
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <FileText className="h-5 w-5 text-indigo-500" /> Material de Apoio
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {currentLesson.attachments?.map((file, idx) => (
                 <a key={idx} href={file.url || "#"} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-colors group">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 truncate mr-3">{file.name}</span>
                    <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                 </a>
               ))}
               {/* Sempre exibe extras de mock para exemplificar */}
               {!currentLesson.attachments && (
                  <>
                     <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-colors group">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 truncate mr-3">Apostila em PDF</span>
                        <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                     </a>
                     <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-colors group">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 truncate mr-3">Slides da Aula</span>
                        <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                     </a>
                  </>
               )}
             </div>
           </div>
        )}

        {/* Área de Dúvidas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-indigo-500" /> Dúvidas e Discussões
            </h3>
            <p className="text-sm text-slate-500 mt-1">Interaja com professores e colegas sobre o conteúdo desta aula.</p>
          </div>
          
          <div className="p-6">
            <div className="flex gap-4 mb-8">
              <Avatar className="h-10 w-10 border border-slate-200 shrink-0">
                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                   {user?.name?.substring(0,2).toUpperCase() || 'AL'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="Escreva sua dúvida aqui..." 
                  className="min-h-[100px] resize-y mb-3 focus-visible:ring-indigo-500"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handlePostQuestion} disabled={!newQuestion.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Send className="h-4 w-4 mr-2" /> Enviar Dúvida
                  </Button>
                </div>
              </div>
            </div>

            {loadingQuestions ? (
               <div className="flex justify-center p-4">
                  <span className="text-slate-400 text-sm">Carregando discussões...</span>
               </div>
            ) : questions.length === 0 ? (
               <div className="text-center py-8">
                  <p className="text-slate-500">Nenhuma dúvida enviada ainda. Seja o primeiro!</p>
               </div>
            ) : (
                <div className="space-y-6">
                  {questions.map(q => (
                    <div key={q.id} className="space-y-4">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border border-slate-200 shrink-0 mt-1">
                          <AvatarFallback className="bg-slate-100 text-slate-600 font-semibold">{q.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-slate-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-sm text-slate-900">{q.user}</span>
                            <span className="text-xs text-slate-400">{q.time}</span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{q.text}</p>
                        </div>
                      </div>
                      
                      {/* Respostas */}
                      {q.replies && q.replies.map((r: any) => (
                        <div key={r.id} className="flex gap-4 ml-12">
                          <Avatar className="h-8 w-8 border border-slate-200 shrink-0 mt-1">
                            <AvatarFallback className={`font-semibold text-xs ${r.isTeacher ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                              {r.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 rounded-2xl rounded-tl-none p-4 border ${r.isTeacher ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm text-slate-900">{r.user}</span>
                              {r.isTeacher && <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Professor(a)</span>}
                              <span className="text-xs text-slate-400 ml-auto">{r.time}</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">{r.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar de Módulos e Aulas */}
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden sticky top-6 shadow-sm">
          <div className="bg-slate-900 px-5 py-5 text-white">
            <h3 className="font-bold text-lg leading-tight mb-2">Conteúdo do Curso</h3>
            {/* Progresso Geral Mocks */}
            {(() => {
              const totalLessons = allLessons.length;
              const completedLessons = allLessons.filter(l => l.status === 'COMPLETED').length;
              const progressCourse = Math.round((completedLessons / (totalLessons || 1)) * 100);
              return (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>{progressCourse}% concluído</span>
                    <span>{completedLessons}/{totalLessons} aulas</span>
                  </div>
                  <Progress value={progressCourse} className="h-1.5 bg-slate-700" />
                </div>
              )
            })()}
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar pb-4">
             {modules.map((module, mIdx) => {
               const progress = calculateModuleProgress(module.lessons);
               return (
                <div key={module.id} className="border-b border-slate-100 last:border-0">
                  <div className="px-5 py-4 bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-slate-800 leading-snug">Módulo {mIdx + 1}: {module.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="h-1 flex-1 bg-slate-200" />
                      <span className="text-[10px] text-slate-500 font-semibold w-8 text-right">{progress}%</span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-50">
                    {module.lessons.map((l, lIdx) => {
                      const isCurrent = currentLesson.id === l.id;
                      
                      // Simulando bloqueio: só libera a aula se for a primeira ou se a anterior do curso todo estiver concluída
                      // Para facilitar na UI de mock, vamos fingir que apenas aulas além da próxima incompleta estão bloqueadas
                      const globalIndex = allLessons.findIndex(al => al.id === l.id);
                      const isLocked = globalIndex > 0 && (allLessons[globalIndex - 1].status !== 'COMPLETED') && globalIndex > currentIndex; 
                      
                      const isComp = l.status === 'COMPLETED';

                      return (
                        <button 
                          key={l.id} 
                          onClick={() => !isLocked && handleLessonChange(l.id)}
                          disabled={isLocked}
                          className={`w-full text-left flex justify-between items-start px-5 py-3.5 transition-colors group relative
                            ${isCurrent ? 'bg-indigo-50/70' : 'hover:bg-slate-50'}
                            ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          {isCurrent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r"></div>}
                          
                          <div className="flex items-start gap-3 w-full pr-2">
                            <div className="mt-0.5 shrink-0">
                              {isComp ? (
                                <CheckCircle2 className={`h-4 w-4 ${isCurrent ? 'text-indigo-600' : 'text-emerald-500'}`} />
                              ) : isLocked ? (
                                <Lock className="h-4 w-4 text-slate-400" />
                              ) : (
                                <div className={`h-4 w-4 rounded-full border-2 ${isCurrent ? 'border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'} transition-colors`} />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium line-clamp-2 leading-snug
                                ${isCurrent ? 'text-indigo-900 font-bold' : isLocked ? 'text-slate-500' : 'text-slate-700 group-hover:text-indigo-700'}
                              `}>
                                {lIdx + 1}. {l.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 text-[11px] font-medium">
                                <span className={isCurrent ? 'text-indigo-600/70' : 'text-slate-500 shrink-0 flex items-center'}>
                                  {l.type === 'VIDEO' ? <PlayCircle className="w-3 h-3 mr-1 inline" /> : <FileText className="w-3 h-3 mr-1 inline" />} {l.duration ? `${l.duration} min` : 'Leitura'}
                                </span>
                                {(l.attachments?.length ?? 0) > 0 && !isLocked && (
                                  <span className="text-slate-400 flex items-center shrink-0">
                                    <FileText className="w-3 h-3 mr-1 inline" /> {(l.attachments?.length ?? 0)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
               )
             })}
          </div>
        </div>
      </div>
    </div>
  );
}
