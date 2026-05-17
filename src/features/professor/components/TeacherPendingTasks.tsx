import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, MessageSquare, AlertCircle, FileText } from "lucide-react";
import { TeacherDashboardData } from "@/types";

interface TeacherPendingTasksProps {
  tasks: TeacherDashboardData['pendingTasks'];
}

export function TeacherPendingTasks({ tasks }: TeacherPendingTasksProps) {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'GRADE': return <CheckSquare className="h-4 w-4 text-emerald-500" />;
      case 'MESSAGE': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'ATTENDANCE': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Pendências</span>
          <Badge variant="secondary">{tasks.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma pendência no momento!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex gap-3">
                  <div className="mt-1">
                    {getTaskIcon(task.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">{task.courseName}</p>
                    {task.dueDate && (
                      <p className="text-xs text-amber-600 mt-1 font-medium">{task.dueDate}</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8">Resolver</Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
