"use client";

import { Course, Module, Lesson, Enrollment } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { PlayCircle, CheckCircle2, ChevronLeft, FileText, Clock } from "lucide-react";
import Image from "next/image";

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

interface CourseDetailsProps {
  course: Course;
  modules: ModuleWithLessons[];
  enrollment?: Enrollment;
}

export function CourseDetails({ course, modules, enrollment }: CourseDetailsProps) {
  const progress = enrollment?.progress || 0;
  
  // Calcula quantidade de aulas
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = modules.reduce((acc, m) => {
    return acc + m.lessons.filter(l => l.completed).length;
  }, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="h-48 w-full md:w-72 relative rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          {course.thumbnailUrl ? (
            <Image 
              src={course.thumbnailUrl} 
              alt={course.title} 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-slate-400">
              <FileText size={48} />
             </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-center space-y-4">
          <Link href="/portal/aluno/disciplinas" className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 w-fit">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para Disciplinas
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{course.title}</h1>
            <p className="text-slate-600 mt-2">{course.description}</p>
          </div>
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 md:flex md:gap-8 text-sm text-slate-500">
             <div className="flex items-center gap-1.5 hidden md:flex">
                <FileText className="h-4 w-4" />
                <span>{modules.length} Módulos</span>
             </div>
             <div className="flex items-center gap-1.5">
                <PlayCircle className="h-4 w-4" />
                <span>{totalLessons} Aulas</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{12} Horas</span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-semibold text-slate-900">Seu Progresso</h3>
            <p className="text-sm text-slate-500">Você concluiu {completedLessons} de {totalLessons} aulas.</p>
          </div>
          <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Conteúdo do Curso</h2>
        <div className="space-y-6">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">{module.title}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {module.lessons.map((lesson) => (
                  <Link 
                    key={lesson.id} 
                    href={`/portal/aluno/disciplinas/${course.id}/aulas/${lesson.id}`}
                    className="flex justify-between items-center px-6 py-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                         <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex-shrink-0 group-hover:border-indigo-400 transition-colors" />
                      )}
                      <div>
                        <p className={`font-medium ${lesson.completed ? 'text-slate-600' : 'text-slate-900'}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" /> Vídeo / Texto</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {lesson.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hidden sm:flex group-hover:text-indigo-600">
                      Acessar Aula
                    </Button>
                  </Link>
                ))}
                {module.lessons.length === 0 && (
                  <div className="px-6 py-4 text-sm text-slate-500 text-center">Nenhuma aula disponível neste módulo.</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
