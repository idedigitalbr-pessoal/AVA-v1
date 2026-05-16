"use client";

import { Activity } from "@/types";
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
import { Clock, FileText, UploadCloud, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function StudentActivities({ 
  activities,
  title = "Atividades",
  description = "Gerencie seus trabalhos, quizzes e provas."
}: { 
  activities: Activity[],
  title?: string,
  description?: string
}) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SUBMITTED' | 'GRADED'>('ALL');
  
  const filteredActivities = activities.filter(a => filter === 'ALL' || a.status === filter);

  const getStatusBadge = (status: Activity['status']) => {
    switch(status) {
      case 'PENDING':
        return <Badge variant="warning" className="bg-amber-100 text-amber-800 border border-amber-200">Pendente</Badge>;
      case 'SUBMITTED':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200">Enviada</Badge>;
      case 'GRADED':
        return <Badge variant="success" className="bg-emerald-100 text-emerald-800 border border-emerald-200">Corrigida</Badge>;
    }
  };

  const getIcon = (type: Activity['type']) => {
    switch(type) {
      case 'ASSIGNMENT': return <UploadCloud className="h-4 w-4" />;
      case 'QUIZ': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto">
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
          variant={filter === 'SUBMITTED' ? 'default' : 'outline'} 
          onClick={() => setFilter('SUBMITTED')}
          className={filter === 'SUBMITTED' ? 'bg-indigo-600' : ''}
        >
          Aguardando Nota
        </Button>
        <Button 
          variant={filter === 'GRADED' ? 'default' : 'outline'} 
          onClick={() => setFilter('GRADED')}
          className={filter === 'GRADED' ? 'bg-indigo-600' : ''}
        >
          Concluídas
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[300px]">Atividade</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <TableRow key={activity.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            {getIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{activity.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.type === 'QUIZ' ? 'Questionário' : 'Envio de Arquivo'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium text-sm">
                        {activity.courseName || 'Disciplina'}
                      </TableCell>
                      <TableCell>
                        {activity.dueDate ? (
                           <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Clock className="h-3.5 w-3.5" />
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
                             {activity.score} <span className="text-slate-400 font-normal text-xs">/ {activity.maxScore || 10}</span>
                           </div>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {activity.status === 'PENDING' ? (
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            {activity.type === 'QUIZ' ? 'Responder' : 'Enviar'}
                          </Button>
                        ) : activity.status === 'GRADED' ? (
                          <Button size="sm" variant="outline" className="text-slate-600">
                            Ver Feedback
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Enviado
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                      Nenhuma atividade encontrada para este filtro.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
