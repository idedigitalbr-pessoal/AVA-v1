"use client";

import { Course } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Users, PlusCircle } from "lucide-react";
import Image from "next/image";

interface TeacherCoursesProps {
  courses: Course[];
}

export function TeacherCourses({ courses }: TeacherCoursesProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Minhas Disciplinas</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os cursos e turmas que você ministra.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Disciplina
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
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
              <div className="flex gap-4 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.totalStudents} Alunos</span>
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {course.totalModules} Módulos</span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 bg-slate-50 pt-4">
              <Link href={`/professor/disciplinas/${course.id}`} className="w-full">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Gerenciar Disciplina
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
