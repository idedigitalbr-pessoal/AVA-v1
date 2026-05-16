import { Notice } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Building2, GraduationCap, BookOpen, Check, AlertCircle, Maximize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NoticeDetailProps {
  notice: Notice;
  onMarkAsRead: (id: string) => void;
}

export function NoticeDetail({ notice, onMarkAsRead }: NoticeDetailProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "INSTITUCIONAL": return <Building2 className="w-4 h-4" />;
      case "CURSO": return <GraduationCap className="w-4 h-4" />;
      case "DISCIPLINA": return <BookOpen className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "ALTA":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Importante</Badge>;
      case "BAIXA":
        return <Badge variant="outline" className="text-slate-500">Informativo</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`flex items-center gap-1 font-medium bg-white shadow-sm ${
              notice.category === 'INSTITUCIONAL' ? 'text-amber-700 border-amber-200' :
              notice.category === 'CURSO' ? 'text-blue-700 border-blue-200' :
              'text-emerald-700 border-emerald-200'
            }`}>
              {getCategoryIcon(notice.category)}
              <span className="text-[10px] uppercase tracking-wider">
                {notice.category === "DISCIPLINA" ? notice.subject : notice.category}
              </span>
            </Badge>
            {getPriorityBadge(notice.priority)}
          </div>
          
          <div className="flex items-center gap-2">
            {!notice.isRead && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onMarkAsRead(notice.id)}
                className="h-8 text-xs font-semibold text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
              >
                <Check className="w-3.5 h-3.5 mr-1" /> Marcar como lido
              </Button>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
          {notice.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <div className="flex items-center bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
            <User className="w-4 h-4 mr-2 pl-0.5 text-slate-400" />
            <span className="font-medium text-slate-700">{notice.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            <span>{notice.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6">
        <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
          {/* Mock html rendering by splitting newlines */}
          {notice.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
