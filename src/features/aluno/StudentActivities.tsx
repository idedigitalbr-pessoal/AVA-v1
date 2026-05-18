"use client";

import { StudentActivityDetail } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, FileText, UploadCloud, CheckCircle, Search, Laptop, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

export function StudentActivities({ 
  activities,
  title = "Minhas Atividades",
  description = "Gerencie seus trabalhos, quizzes e provas."
}: { 
  activities: StudentActivityDetail[],
  title?: string,
  description?: string
}) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE'>('ALL');
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      const matchFilter = filter === 'ALL' || a.status === filter;
      const matchSearch = (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.courseName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [activities, filter, searchTerm]);

  const summary = useMemo(() => {
    let pending = 0, overdue = 0, graded = 0, totalScore = 0, gradesCount = 0;
    
    activities.forEach(a => {
      if (a.status === 'PENDING') pending++;
      if (a.status === 'OVERDUE') overdue++;
      if (a.status === 'GRADED') {
        graded++;
        if (a.score !== undefined && a.maxScore) {
          totalScore += (a.score / a.maxScore) * 10;
          gradesCount++;
        }
      }
    });

    const average = gradesCount > 0 ? (totalScore / gradesCount).toFixed(1) : '-';

    return { pending, overdue, graded, average };
  }, [activities]);

  const getStatusBadge = (status: StudentActivityDetail['status']) => {
    switch(status) {
      case 'PENDING':
        return <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-200">Pendente</Badge>;
      case 'SUBMITTED':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Enviada</Badge>;
      case 'GRADED':
        return <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200">Corrigida</Badge>;
      case 'OVERDUE':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Atrasada</Badge>;
    }
  };

  const getIcon = (type: StudentActivityDetail['type']) => {
    switch(type) {
      case 'ASSIGNMENT': return <UploadCloud className="h-5 w-5" />;
      case 'QUIZ': return <Laptop className="h-5 w-5" />;
      case 'EXAM': return <MonitorPlay className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getActionLink = (activity: StudentActivityDetail) => {
    if (activity.type === 'EXAM') return `/portal/aluno/provas-online/${activity.id}`;
    if (activity.type === 'QUIZ') return `/portal/aluno/quizzes/${activity.id}`;
    return `/portal/aluno/atividades/${activity.id}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-indigo-800 opacity-80">Pendentes</h3>
            <p className="text-3xl font-bold text-indigo-900 mt-1">{summary.pending}</p>
          </CardContent>
        </Card>
        <Card className="border-red-100 bg-red-50/50 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-red-800 opacity-80">Atrasadas</h3>
            <p className="text-3xl font-bold text-red-900 mt-1">{summary.overdue}</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-emerald-800 opacity-80">Corrigidas</h3>
            <p className="text-3xl font-bold text-emerald-900 mt-1">{summary.graded}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-slate-600">Média Geral</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{summary.average}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto custom-scrollbar">
          <Button 
            variant={filter === 'ALL' ? 'default' : 'outline'} 
            onClick={() => setFilter('ALL')}
            className={filter === 'ALL' ? 'bg-indigo-600' : ''}
          >
            Todas
          </Button>
          <Button 
            variant={filter === 'PENDING' ? 'default' : 'outline'} 
            onClick={() => setFilter('PENDING')}
            className={filter === 'PENDING' ? 'bg-indigo-600' : ''}
          >
            Pendentes
          </Button>
          <Button 
            variant={filter === 'OVERDUE' ? 'default' : 'outline'} 
            onClick={() => setFilter('OVERDUE')}
            className={filter === 'OVERDUE' ? 'bg-indigo-600' : ''}
          >
            Atrasadas
          </Button>
          <Button 
            variant={filter === 'SUBMITTED' ? 'default' : 'outline'} 
            onClick={() => setFilter('SUBMITTED')}
            className={filter === 'SUBMITTED' ? 'bg-indigo-600' : ''}
          >
            Enviadas
          </Button>
          <Button 
            variant={filter === 'GRADED' ? 'default' : 'outline'} 
            onClick={() => setFilter('GRADED')}
            className={filter === 'GRADED' ? 'bg-indigo-600' : ''}
          >
            Corrigidas
          </Button>
        </div>

        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
           <Input 
             placeholder="Buscar título ou disciplina..."
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             className="pl-9 bg-white"
           />
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-100">
              <TableRow>
                <TableHead className="w-[300px] font-semibold">Atividade</TableHead>
                <TableHead className="font-semibold">Disciplina</TableHead>
                <TableHead className="font-semibold">Prazo</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Nota</TableHead>
                <TableHead className="text-right font-semibold">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                          {getIcon(activity.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{activity.title}</p>
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">
                            {activity.type === 'QUIZ' ? 'Questionário' : activity.type === 'EXAM' ? 'Prova Online' : 'Trabalho / Envio'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium text-sm">
                      {activity.courseName}
                    </TableCell>
                    <TableCell>
                      {activity.dueDate ? (
                         <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                            <Clock className="h-4 w-4 text-slate-400" />
                            {new Date(activity.dueDate).toLocaleDateString()}
                         </div>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(activity.status)}
                    </TableCell>
                    <TableCell>
                      {activity.status === 'GRADED' && activity.score !== undefined ? (
                         <div className="font-bold text-slate-900">
                           {activity.score} <span className="text-slate-400 font-medium text-xs">/ {activity.maxScore}</span>
                         </div>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={getActionLink(activity)}>
                        <Button size="sm" variant={activity.status === 'PENDING' || activity.status === 'OVERDUE' ? 'default' : 'outline'} className={activity.status === 'PENDING' || activity.status === 'OVERDUE' ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-slate-700 border-slate-200 hover:bg-slate-50'}>
                          {activity.status === 'PENDING' || activity.status === 'OVERDUE' ? (
                            activity.type === 'QUIZ' ? 'Responder' : activity.type === 'EXAM' ? 'Iniciar Prova' : 'Enviar'
                          ) : (
                            'Ver Detalhes'
                          )}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-slate-300 mb-2" />
                      <p>Nenhuma atividade encontrada para os filtros selecionados.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
