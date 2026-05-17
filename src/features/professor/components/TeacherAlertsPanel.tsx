import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { TeacherDashboardData } from "@/types";

interface TeacherAlertsPanelProps {
  alerts: TeacherDashboardData['alerts'];
}

export function TeacherAlertsPanel({ alerts }: TeacherAlertsPanelProps) {
  const getAlertStyle = (type: string) => {
    switch(type) {
      case 'DANGER': return { bg: 'bg-red-50 border-red-200', text: 'text-red-900', icon: <ShieldAlert className="w-5 h-5 text-red-600" /> };
      case 'WARNING': return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-900', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> };
      default: return { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-900', icon: <Info className="w-5 h-5 text-blue-600" /> };
    }
  };

  if (!alerts || alerts.length === 0) return null;

  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Atenção Necessária
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {alerts.map(alert => {
            const style = getAlertStyle(alert.type);
            return (
              <div key={alert.id} className={`p-4 rounded-xl border flex gap-3 items-start ${style.bg}`}>
                {style.icon}
                <div>
                  <h4 className={`font-semibold text-sm ${style.text}`}>{alert.title}</h4>
                  <p className={`text-xs mt-1 opacity-90 ${style.text}`}>{alert.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
