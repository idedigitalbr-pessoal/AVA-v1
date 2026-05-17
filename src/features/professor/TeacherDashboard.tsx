import { TeacherDashboardData } from "@/types";
import { Button } from "@/components/ui/button";
import { Users, FileText, CheckSquare, Calendar, PlayCircle, Clock, BookOpen, AlertCircle } from "lucide-react";
import Link from "next/link";
import { TeacherStatCard } from "./components/TeacherStatCard";
import { TeacherPendingTasks } from "./components/TeacherPendingTasks";
import { TeacherTodaySchedule } from "./components/TeacherTodaySchedule";
import { TeacherAlertsPanel } from "./components/TeacherAlertsPanel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TeacherDashboardProps {
  data: TeacherDashboardData;
}

export function TeacherDashboard({ data }: TeacherDashboardProps) {
  const { stats, nextClass, todaySchedule, pendingTasks, alerts, coursesProgress } = data;

  // Assume o professor atual para o Mock (isso viria do AuthContext ou Header no Next)
  const teacherName = "Prof. Carlos Mendes";
  
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-6">
      {/* 1. Welcome Card */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg shadow-indigo-200/50">
        <div className="mb-4 sm:mb-0">
          <p className="text-indigo-200 text-sm font-medium mb-1 capitalize">{today}</p>
          <h1 className="text-2xl sm:text-3xl font-bold">Olá, {teacherName}!</h1>
          <p className="mt-2 text-indigo-100 max-w-xl">
            Bem-vindo de volta! Você tem <span className="font-bold text-white">{pendingTasks.length} pendências</span> hoje e <span className="font-bold text-white">{todaySchedule.length} aulas agendadas</span>.
          </p>
          {nextClass && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-4 inline-flex items-center gap-3 border border-white/20">
              <Clock className="w-5 h-5 text-indigo-200" />
              <div>
                <p className="text-xs text-indigo-200 font-medium tracking-wide uppercase">Próxima Aula • {nextClass.time}</p>
                <p className="text-sm font-semibold">{nextClass.title} - {nextClass.className}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 min-w-[200px]">
          <Link href="/professor/disciplinas">
            <Button variant="secondary" className="w-full text-indigo-700 font-semibold hover:bg-indigo-50 shadow-md">
              Ver Minhas Disciplinas
            </Button>
          </Link>
          <Button variant="outline" className="w-full border-indigo-400 text-indigo-100 hover:bg-indigo-700 hover:text-white">
            Abrir Agenda Completa
          </Button>
        </div>
      </div>

      {/* 6. Alerts Panel */}
      <TeacherAlertsPanel alerts={alerts} />

      {/* 2. Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Turmas Ativas" value={stats.activeClasses} icon={Users} iconColor="text-blue-600" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Total de Alunos" value={stats.totalStudents} icon={Users} iconColor="text-emerald-600" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="A avaliar (Provas)" value={stats.pendingGrades} icon={CheckSquare} iconColor="text-amber-600" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="A avaliar (Quizzes)" value={stats.pendingQuizzes} icon={CheckSquare} iconColor="text-orange-500" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Aulas Publicadas" value={stats.publishedClasses} icon={PlayCircle} iconColor="text-indigo-600" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Rascunhos" value={stats.draftClasses} icon={FileText} iconColor="text-slate-400" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Frequências Pend." value={stats.pendingAttendance} icon={AlertCircle} iconColor="text-rose-600" /></div>
        <div className="col-span-2 lg:col-span-2"><TeacherStatCard title="Aulas Hoje" value={stats.upcomingLectures} icon={Calendar} iconColor="text-purple-600" /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Pending Tasks */}
        <div className="lg:col-span-2">
          <TeacherPendingTasks tasks={pendingTasks} />
        </div>
        {/* 4. Today's Schedule */}
        <div className="lg:col-span-1">
          <TeacherTodaySchedule schedule={todaySchedule} />
        </div>
      </div>

      {/* 5. My Courses / Disciplinas em Andamento */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Acompanhamento das Disciplinas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesProgress.map(course => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base line-clamp-1">{course.courseName}</CardTitle>
                <CardDescription className="text-sm font-medium">{course.className}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Conteúdo Publicado</span>
                      <span>{course.publishedClasses}/{course.totalClasses} aulas</span>
                    </div>
                    <Progress value={(course.publishedClasses / course.totalClasses) * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Alunos</p>
                      <p className="font-semibold text-slate-900">{course.totalStudents}</p>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <p className="text-xs text-slate-500">Média</p>
                      <p className="font-semibold text-emerald-600">{course.averageGrade.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Pendentes</p>
                      <p className={`font-semibold ${course.pendingSubmissions > 0 ? 'text-amber-600' : 'text-slate-900'}`}>{course.pendingSubmissions}</p>
                    </div>
                  </div>

                  <Link href={`/professor/disciplinas/${course.id}`} className="block">
                    <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                      Gerenciar Disciplina
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
