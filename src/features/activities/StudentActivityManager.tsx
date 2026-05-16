"use client";

import { ActivityDetail, ActivitySubmission } from "./types";
import { StudentActivitySubmit } from "./StudentActivitySubmit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, UploadCloud, CheckCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useActivityStore } from "./store";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

interface StudentActivityManagerProps {
  initialActivities: ActivityDetail[];
}

export function StudentActivityManager({ initialActivities }: StudentActivityManagerProps) {
  const store = useActivityStore();
  const { user } = useAuth();
  const currentUserId = user?.id || "student_current";
  const currentUserName = user?.name || "Estudante Mock";

  // Here, we should filter activities based on what the student is enrolled in, 
  // but for mocked data, we just take all PUBLISHED ones or ones that were originally passed 
  // (which are the mock ones for this course).
  const courseIds = initialActivities.map(a => a.courseId);
  const activities = store.activities.filter(a => courseIds.includes(a.courseId) && a.status === 'PUBLISHED');
  
  const submissions = store.submissions.filter(s => s.studentId === currentUserId);

  const [currentActivity, setCurrentActivity] = useState<ActivityDetail | null>(null);

  const handleOpenActivity = (activity: ActivityDetail) => {
    setCurrentActivity(activity);
  };

  const handleSubmit = (content: string, fileUrl?: string) => {
    if (!currentActivity) return;

    const newSub: ActivitySubmission = {
      id: Date.now().toString(),
      activityId: currentActivity.id,
      studentId: currentUserId,
      studentName: currentUserName,
      submittedAt: new Date().toISOString(),
      content,
      fileUrl,
      status: "SUBMITTED"
    };

    store.addSubmission(newSub);
    toast.success("Atividade enviada com sucesso!");
    // Optional: go back after submit
    // setCurrentActivity(null);
  };

  if (currentActivity) {
    const submission = submissions.find(s => s.activityId === currentActivity.id);
    return <StudentActivitySubmit 
              activity={currentActivity} 
              submission={submission} 
              onSubmit={handleSubmit} 
              onBack={() => setCurrentActivity(null)} 
           />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Minhas Atividades</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie seus trabalhos, quizzes e provas.</p>
      </div>

      <div className="hidden md:block">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="w-[300px]">Atividade</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.length > 0 ? (
                    activities.map((activity) => {
                      const sub = submissions.find(s => s.activityId === activity.id);
                      
                      return (
                        <TableRow key={activity.id} className="hover:bg-slate-50/50">
                          <TableCell>
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                {activity.type === 'QUIZ' ? <FileText className="h-4 w-4" /> : <UploadCloud className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{activity.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{activity.type === 'QUIZ' ? 'Questionário' : 'Envio de Arquivo'}</p>
                              </div>
                            </div>
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
                            {!sub ? (
                              <Badge variant="warning" className="bg-amber-100 text-amber-800 border border-amber-200">Pendente</Badge>
                            ) : sub.status === 'SUBMITTED' ? (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200">Enviada</Badge>
                            ) : (
                              <Badge variant="success" className="bg-emerald-100 text-emerald-800 border border-emerald-200">Corrigida</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {sub?.status === 'GRADED' && sub.grade !== undefined ? (
                               <div className="font-bold text-slate-900">
                                 {sub.grade} <span className="text-slate-400 font-normal text-xs">/ {activity.maxScore}</span>
                               </div>
                            ) : (
                              <span className="text-slate-400 text-sm">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant={!sub ? 'default' : 'outline'}
                              className={!sub ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-slate-600'}
                              onClick={() => handleOpenActivity(activity)}
                            >
                              {!sub ? 'Fazer' : sub.status === 'GRADED' ? 'Ver Feedback' : 'Ver Entrega'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-48 text-center text-slate-500">
                         <EmptyState icon={<FileText className="w-8 h-8 text-slate-400" />} title="Nenhuma atividade" description="Você não possui atividades pendentes." />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const sub = submissions.find(s => s.activityId === activity.id);
            return (
              <Card key={activity.id} className="cursor-pointer hover:border-indigo-200 transition-colors" onClick={() => handleOpenActivity(activity)}>
                <CardContent className="p-4 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                        {activity.type === 'QUIZ' ? <FileText className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">{activity.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.type === 'QUIZ' ? 'Questionário' : 'Envio de Arquivo'}</p>
                      </div>
                    </div>
                    <div>
                      {!sub ? (
                        <Badge variant="warning" className="bg-amber-100 text-amber-800 border border-amber-200 text-xs shrink-0 whitespace-nowrap">Pendente</Badge>
                      ) : sub.status === 'SUBMITTED' ? (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200 text-xs shrink-0 whitespace-nowrap">Enviada</Badge>
                      ) : (
                        <Badge variant="success" className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs shrink-0 whitespace-nowrap">Corrigida</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    {activity.dueDate ? (
                       <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(activity.dueDate).toLocaleDateString()}
                       </div>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}

                    {sub?.status === 'GRADED' && sub.grade !== undefined && (
                       <div className="font-bold text-slate-900 text-sm">
                         {sub.grade} <span className="text-slate-400 font-normal text-xs">/ {activity.maxScore}</span>
                       </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <EmptyState icon={<FileText className="w-8 h-8 text-slate-400" />} title="Nenhuma atividade" description="Você não possui atividades pendentes." />
        )}
      </div>

    </div>
  );
}

