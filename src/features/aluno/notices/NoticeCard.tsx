import { NoticeCategory, NoticePriority, Notice } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, GraduationCap, Building2, BookOpen } from "lucide-react";

interface NoticeCardProps {
  notice: Notice;
  isSelected?: boolean;
  onClick?: () => void;
}

export function NoticeCard({ notice, isSelected, onClick }: NoticeCardProps) {
  const getPriorityBadge = (priority: NoticePriority) => {
    switch (priority) {
      case "ALTA":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Importante</Badge>;
      case "NORMAL":
        return null;
      case "BAIXA":
        return <Badge variant="outline" className="text-slate-500 bg-slate-50">Informativo</Badge>;
    }
  };

  const getCategoryIcon = (category: NoticeCategory) => {
    switch (category) {
      case "INSTITUCIONAL":
        return <Building2 className="w-4 h-4" />;
      case "CURSO":
        return <GraduationCap className="w-4 h-4" />;
      case "DISCIPLINA":
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (notice: Notice) => {
    if (notice.category === "DISCIPLINA") {
      return notice.subject || notice.category;
    }
    return notice.category;
  };

  return (
    <Card 
      className={`border transition-all cursor-pointer overflow-hidden ${
        isSelected 
          ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/20 bg-indigo-50/30' 
          : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm bg-white'
      } ${!notice.isRead ? 'border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {!notice.isRead && (
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
            )}
            <Badge variant="outline" className={`flex items-center gap-1 font-medium ${
              notice.category === 'INSTITUCIONAL' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              notice.category === 'CURSO' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {getCategoryIcon(notice.category)}
              <span className="text-[10px] uppercase tracking-wider">{getCategoryLabel(notice)}</span>
            </Badge>
            {getPriorityBadge(notice.priority)}
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap flex items-center font-medium">
            <Calendar className="w-3 h-3 mr-1" />
            {notice.date}
          </span>
        </div>
        
        <h3 className={`text-base font-bold mb-1 leading-tight ${!notice.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
          {notice.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 leading-snug">
          {notice.description}
        </p>
      </CardContent>
    </Card>
  );
}
