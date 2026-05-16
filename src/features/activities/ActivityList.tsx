"use client";

import { useState } from "react";
import { ActivityDetail, ActivitySubmission } from "./types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, FileText, UploadCloud, Eye, Edit2, Trash2, Clock, CheckCircle } from "lucide-react";

interface ActivityListProps {
  activities: ActivityDetail[];
  onCreate: () => void;
  onEdit: (activity: ActivityDetail) => void;
  onViewSubmissions: (activity: ActivityDetail) => void;
  onDelete: (activityId: string) => void;
}

export function ActivityList({ activities, onCreate, onEdit, onViewSubmissions, onDelete }: ActivityListProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Atividades Avaliativas</h2>
          <p className="text-sm text-slate-500">Gerencie as tarefas e avaliações da disciplina.</p>
        </div>
        <Button onClick={onCreate} className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Criar Atividade
        </Button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length > 0 ? activities.map((act) => (
              <TableRow key={act.id}>
                <TableCell className="font-medium text-slate-900">{act.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    {act.type === 'QUIZ' ? <FileText className="h-4 w-4" /> : <UploadCloud className="h-4 w-4" />}
                    {act.type === 'QUIZ' ? 'Questionário' : 'Envio Padrão'}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {act.dueDate ? new Date(act.dueDate).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className="text-sm font-semibold text-slate-700">
                  {act.maxScore} pts
                </TableCell>
                <TableCell>
                  {act.status === 'PUBLISHED' ? (
                    <span className="flex items-center text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">
                      <CheckCircle className="h-3 w-3 mr-1" /> Publicado
                    </span>
                  ) : (
                    <span className="flex items-center text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit">
                      <Clock className="h-3 w-3 mr-1" /> Rascunho
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button onClick={() => onViewSubmissions(act)} variant="ghost" size="sm" className="text-indigo-600 h-8">
                     <Eye className="h-4 w-4 mr-2" /> Entregas
                  </Button>
                  <Button onClick={() => onEdit(act)} variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 h-8 w-8">
                     <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => onDelete(act.id)} variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 h-8 w-8">
                     <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">Nenhuma atividade cadastrada. Clique em &quot;Criar Atividade&quot; para começar.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
