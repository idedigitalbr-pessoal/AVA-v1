"use client";

import { Course, Enrollment } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";

interface StudentCoursesProps {
  courses: Course[];
  enrollments: (Enrollment | undefined)[];
}

export function StudentCourses({ courses, enrollments }: StudentCoursesProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Disciplinas</h1>
          <p className="text-slate-500 text-sm mt-1">Acesse o conteúdo e acompanhe seu progresso.</p>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const enrollment = enrollments[index];
            const progress = enrollment?.progress || 0;

            return (
              <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 w-full relative bg-slate-200">
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
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 font-medium tracking-wide">
                      <span>PROGRESSO</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-100 bg-slate-50 pt-4">
                  <Link href={`/portal/aluno/disciplinas/${course.id}`} className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Acessar Disciplina
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={<BookOpen className="w-8 h-8 text-slate-400" />} title="Nenhuma disciplina" description="Você ainda não está matriculado em nenhuma disciplina." />
      )}
    </div>
  );
}

