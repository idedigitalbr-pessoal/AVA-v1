import { MessageThread } from "./types";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MessageThreadItemProps {
  thread: MessageThread;
}

export function MessageThreadItem({ thread }: MessageThreadItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/portal/aluno/mensagens/${thread.id}`;
  
  const lastMessage = thread.messages.length > 0 ? thread.messages[thread.messages.length - 1] : null;

  return (
    <Link
      href={`/portal/aluno/mensagens/${thread.id}`}
      className={`block p-4 border-b transition-colors ${
        isActive 
          ? 'bg-indigo-50 border-auth-indigo-200' 
          : 'bg-white hover:bg-slate-50 border-slate-100'
      }`}
    >
      <div className="flex justify-between items-start mb-1.5">
        <div className="flex items-center gap-2 overflow-hidden">
          {thread.category === "DISCIPLINA" ? (
            <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
          )}
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider truncate">
            {thread.category === "DISCIPLINA" ? thread.discipline : "Institucional"}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium shrink-0 ml-2">{thread.updatedAt}</span>
      </div>

      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <h4 className={`text-sm mb-1 truncate ${thread.unreadCount > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
            {thread.subject}
          </h4>
          <p className={`text-xs truncate ${thread.unreadCount > 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
            {lastMessage?.text || "Sem mensagens"}
          </p>
        </div>
        
        {thread.unreadCount > 0 && (
          <Badge className="bg-indigo-600 hover:bg-indigo-700 shrink-0 h-5 min-w-[20px] justify-center px-1">
            {thread.unreadCount}
          </Badge>
        )}
      </div>
    </Link>
  );
}
