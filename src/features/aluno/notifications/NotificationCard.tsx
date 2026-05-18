import { StudentNotification, NotificationType } from "./types";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, FileText, LayoutList, CheckSquare, GraduationCap, DollarSign, Megaphone, MessageSquare, Award, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotificationCardProps {
  notification: StudentNotification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "ATIVIDADE":
        return <FileText className="w-5 h-5" />;
      case "QUIZ":
        return <CheckSquare className="w-5 h-5" />;
      case "PROVA":
        return <GraduationCap className="w-5 h-5" />;
      case "FINANCEIRO":
        return <DollarSign className="w-5 h-5" />;
      case "AVISO":
        return <Megaphone className="w-5 h-5" />;
      case "MENSAGEM":
        return <MessageSquare className="w-5 h-5" />;
      case "CERTIFICADO":
        return <Award className="w-5 h-5" />;
      case "SISTEMA":
        return <Settings className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getColors = (type: NotificationType) => {
    switch (type) {
      case "ATIVIDADE":
        return "bg-blue-100 text-blue-600";
      case "QUIZ":
        return "bg-indigo-100 text-indigo-600";
      case "PROVA":
        return "bg-purple-100 text-purple-600";
      case "FINANCEIRO":
        return "bg-emerald-100 text-emerald-600";
      case "AVISO":
        return "bg-amber-100 text-amber-600";
      case "MENSAGEM":
        return "bg-sky-100 text-sky-600";
      case "CERTIFICADO":
        return "bg-yellow-100 text-yellow-600";
      case "SISTEMA":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row gap-4 transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-indigo-600' : 'opacity-80'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getColors(notification.type)}`}>
        {getIcon(notification.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className={`text-xs capitalize font-medium ${getColors(notification.type).replace('bg-', 'bg-opacity-20 ')}`}>
            {notification.type.toLowerCase()}
          </Badge>
          {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
          )}
          <span className="text-xs text-slate-400 ml-auto">{notification.date}</span>
        </div>
        
        <h4 className={`text-base font-semibold leading-tight mb-1 ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
          {notification.link ? (
            <Link href={notification.link || "#"} className="hover:text-indigo-600 transition-colors">
              {notification.title}
            </Link>
          ) : (
            notification.title
          )}
        </h4>
        
        <p className="text-sm text-slate-500 line-clamp-2">
          {notification.description}
        </p>
      </div>
      
      <div className="shrink-0 flex sm:flex-col justify-end sm:justify-start items-center">
        {!notification.isRead && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs text-slate-500 hover:text-indigo-600 h-8"
          >
            <Check className="w-4 h-4 sm:mr-1" /> 
            <span className="hidden sm:inline">Marcar Lida</span>
          </Button>
        )}
      </div>
    </div>
  );
}
