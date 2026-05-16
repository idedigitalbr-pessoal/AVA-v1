"use client";

import { useState } from "react";
import { MOCK_NOTICES, Notice, NoticeCategory } from "./types";
import { NoticeFilters } from "./NoticeFilters";
import { NoticeList } from "./NoticeList";
import { NoticeDetail } from "./NoticeDetail";
import { Megaphone, MailOpen } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<NoticeCategory | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "READ" | "UNREAD">("ALL");
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Derived state
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || notice.category === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || 
                          (statusFilter === "READ" ? notice.isRead : !notice.isRead);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const unreadCount = notices.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotices(current => 
      current.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const selectedNotice = notices.find(n => n.id === selectedNoticeId) || null;

  const handleSelectNotice = (notice: Notice) => {
    setSelectedNoticeId(notice.id);
    if (isDesktop && !notice.isRead) {
      // Auto mark as read on desktop when clicking
      handleMarkAsRead(notice.id);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center">
            <Megaphone className="w-6 h-6 mr-2 text-amber-500" /> Central de Avisos
          </h1>
          <p className="text-slate-500 mt-1">
            Fique por dentro das novidades da sua instituição, cursos e disciplinas.
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <NoticeFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          unreadCount={unreadCount}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex gap-6">
        <div className={`flex-1 flex flex-col min-h-0 ${isDesktop ? 'max-w-md xl:max-w-lg' : 'w-full'}`}>
          <div className="flex items-center justify-between mb-3 px-1">
             <h3 className="text-sm font-semibold text-slate-700">Notificações ({filteredNotices.length})</h3>
             {unreadCount > 0 && (
               <button 
                 onClick={() => setNotices(not => not.map(n => ({...n, isRead: true})))}
                 className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
               >
                 Marcar todas como lidas
               </button>
             )}
          </div>
          <NoticeList 
            notices={filteredNotices} 
            selectedNoticeId={selectedNoticeId}
            onSelectNotice={handleSelectNotice}
          />
        </div>

        {isDesktop && (
          <div className="flex-1 min-h-0 hidden lg:block">
            {selectedNotice ? (
              <NoticeDetail 
                notice={selectedNotice} 
                onMarkAsRead={handleMarkAsRead}
              />
            ) : (
              <div className="h-full bg-slate-50 border border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                  <MailOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum aviso selecionado</h3>
                <p className="text-slate-500 max-w-sm">Selecione um aviso na lista ao lado para ler o conteúdo completo.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Modal for Notice Detail */}
      {!isDesktop && selectedNotice && (
        <Dialog open={!!selectedNoticeId} onOpenChange={(open) => !open && setSelectedNoticeId(null)}>
          <DialogContent className="p-0 sm:max-w-lg overflow-hidden gap-0 max-h-[90vh]">
            <NoticeDetail 
              notice={selectedNotice} 
              onMarkAsRead={(id) => {
                handleMarkAsRead(id);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
