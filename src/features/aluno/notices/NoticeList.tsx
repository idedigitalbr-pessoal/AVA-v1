import { Notice } from "./types";
import { NoticeCard } from "./NoticeCard";
import { CopyX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NoticeListProps {
  notices: Notice[];
  selectedNoticeId?: string | null;
  onSelectNotice?: (notice: Notice) => void;
}

export function NoticeList({ notices, selectedNoticeId, onSelectNotice }: NoticeListProps) {
  if (notices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-200 min-h-[300px]">
        <div className="p-3 bg-slate-50 rounded-full mb-3 text-slate-400">
          <CopyX className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">Nenhum aviso encontrado</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">Tente ajustar seus filtros para ver mais resultados.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-3 pb-6">
        {notices.map(notice => (
          <NoticeCard 
            key={notice.id} 
            notice={notice} 
            isSelected={selectedNoticeId === notice.id}
            onClick={() => onSelectNotice?.(notice)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
