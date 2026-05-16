"use client";

import { Bell, Menu, LogOut, X, MessageSquare, Settings, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { StudentTopbar, MOCK_TOPBAR_NOTIFICATIONS } from "./StudentTopbar";

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const router = useRouter();

  if (user?.role === "ALUNO") {
    // Adapter for the StudentTopbar component
    const studentData = {
      id: user.id,
      name: user.name || "Aluno Demo",
      registrationId: `RA: 2024${user.id.substring(0, 4) || "0001"}`,
      avatarUrl: "",
    };

    return (
      <StudentTopbar
        student={studentData}
        unreadNotifications={MOCK_TOPBAR_NOTIFICATIONS.unreadNotifications}
        unreadMessages={MOCK_TOPBAR_NOTIFICATIONS.unreadMessages}
        onToggleMenu={toggle}
        isMenuOpen={isOpen}
        onLogout={logout}
        onSettings={() => router.push("/portal/aluno/perfil")}
      />
    );
  }

  const getPageContext = () => {
    if (pathname?.includes("/aluno")) return "Portal do Aluno";
    if (pathname?.includes("/professor")) return "Portal do Professor";
    if (pathname?.includes("/admin")) return "Painel Administrativo";
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      <div className="flex items-center flex-1 space-x-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggle}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg hidden sm:flex">
          <GraduationCap className="h-6 w-6" />
          <span>EduTech AVA</span>
        </div>
        <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2"></div>
        <span className="hidden md:inline text-slate-500 hover:text-indigo-600 cursor-pointer text-sm font-medium">Início</span>
        <span className="hidden md:inline text-slate-300">/</span>
        <span className="leading-none text-slate-900 font-medium truncate max-w-[150px] sm:max-w-xs text-sm">{getPageContext()}</span>
      </div>
      
      <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors hidden sm:block">
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">3</span>
          <MessageSquare className="h-5 w-5 text-slate-400" />
        </div>
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors">
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">5</span>
          <Bell className="h-5 w-5 text-slate-400" />
        </div>
        
        <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || "Usuário"}</p>
            <p className="text-xs text-slate-500 capitalize mt-0.5">{user?.role?.toLowerCase() || "Visitante"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-indigo-700">
            {user?.name?.substring(0, 2).toUpperCase() || "US"}
          </div>
        </div>

        <div className="flex items-center pl-1 sm:pl-2 gap-1 border-l border-slate-200 ml-2 sm:ml-4">
           <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600 hidden sm:flex">
             <Settings className="h-5 w-5" />
           </Button>
           <Button variant="ghost" size="icon" onClick={() => logout()} title="Sair da conta" className="text-slate-400 hover:text-red-600">
             <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </div>
    </header>
  );
}
