import { Bell, LogOut, MessageSquare, Settings, GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface StudentData {
  id: string;
  name: string;
  registrationId: string;
  avatarUrl?: string;
}

export interface StudentTopbarProps {
  student: StudentData;
  unreadNotifications?: number;
  unreadMessages?: number;
  onLogout?: () => void;
  onSettings?: () => void;
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

// ----------------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------------
export const MOCK_STUDENT_DATA: StudentData = {
  id: "st-12345",
  name: "Ana Oliveira Silva",
  registrationId: "RA: 20240001",
  avatarUrl: "", // Empty so it uses the initials fallback
};

export const MOCK_TOPBAR_NOTIFICATIONS = {
  unreadNotifications: 5,
  unreadMessages: 3,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
export function StudentTopbar({
  student,
  unreadNotifications = 0,
  unreadMessages = 0,
  onLogout,
  onSettings,
  onToggleMenu,
  isMenuOpen = false,
}: StudentTopbarProps) {
  // Formatting unread counts
  const notifCount = unreadNotifications > 9 ? "9+" : unreadNotifications;
  const msgCount = unreadMessages > 9 ? "9+" : unreadMessages;
  
  // Generating initials
  const initials = student.name
    ? student.name.substring(0, 2).toUpperCase()
    : "AL";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      {/* 
        ========================================
        Canto Esquerdo (Logo e Menu Mobile) 
        ========================================
      */}
      <div className="flex items-center flex-1 space-x-4">
        {onToggleMenu && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu alternar</span>
          </Button>
        )}
        
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg hidden sm:flex">
          <GraduationCap className="h-6 w-6" />
          <span>EduTech AVA</span>
        </div>
      </div>
      
      {/* 
        ========================================
        Canto Direito (Notificações, Perfil, Config)
        ========================================
      */}
      <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
        
        {/* Mensagens */}
        <Link href="/portal/aluno/mensagens" className="relative p-2 rounded-full hover:bg-slate-100 transition-colors hidden sm:flex items-center justify-center">
          {unreadMessages > 0 && (
            <span className="absolute top-1 right-1 h-4 min-w-[16px] rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white px-0.5">
              {msgCount}
            </span>
          )}
          <MessageSquare className="h-5 w-5 text-slate-400" />
        </Link>

        {/* Notificações */}
        <Link href="/portal/aluno/notificacoes" className="relative p-2 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center">
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 h-4 min-w-[16px] rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white px-0.5">
              {notifCount}
            </span>
          )}
          <Bell className="h-5 w-5 text-slate-400" />
        </Link>
        
        {/* Perfil */}
        <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{student.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{student.registrationId}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-indigo-700 shrink-0">
            {student.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center pl-1 sm:pl-2 gap-1 border-l border-slate-200 ml-2 sm:ml-4">
           {onSettings && (
             <Button variant="ghost" size="icon" onClick={onSettings} title="Configurações" className="text-slate-400 hover:text-indigo-600 hidden sm:flex">
               <Settings className="h-5 w-5" />
             </Button>
           )}
           {onLogout && (
             <Button variant="ghost" size="icon" onClick={onLogout} title="Sair da conta" className="text-slate-400 hover:text-red-600">
               <LogOut className="h-5 w-5" />
             </Button>
           )}
        </div>
      </div>
    </header>
  );
}
