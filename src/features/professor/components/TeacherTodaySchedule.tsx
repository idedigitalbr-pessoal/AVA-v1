import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Users, PlayCircle } from "lucide-react";
import { TeacherDashboardData } from "@/types";

interface TeacherTodayScheduleProps {
  schedule: TeacherDashboardData['todaySchedule'];
}

export function TeacherTodaySchedule({ schedule }: TeacherTodayScheduleProps) {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'ONLINE': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100"><Video className="w-3 h-3 mr-1"/> Online</Badge>;
      case 'PRESENCIAL': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><Users className="w-3 h-3 mr-1"/> Presencial</Badge>;
      case 'GRAVADA': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100"><PlayCircle className="w-3 h-3 mr-1"/> Gravada</Badge>;
      default: return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Agenda de Hoje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              <p className="text-sm">Você não tem aulas agendadas para hoje.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-100 ml-3 pl-4 space-y-6">
              {schedule.map(item => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-indigo-600 ring-4 ring-white" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-indigo-600">{item.time}</span>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.className} • {item.courseName}</p>
                    <div className="mt-1">{getTypeBadge(item.type)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
