import { Bell, Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  roleName: string;
}

export function Header({ userName, roleName }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center flex-1 space-x-2 text-slate-500 text-sm">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
        <span className="hidden md:inline hover:text-indigo-600 cursor-pointer">Início</span>
        <span className="hidden md:inline">/</span>
        <span className="hidden md:inline text-slate-900 font-medium">Dashboard</span>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-6">
        <div className="relative">
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-white bg-red-500"></span>
          <Bell className="h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer" />
        </div>
        <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
            <p className="text-xs text-slate-500">{roleName}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-slate-500">
            {userName.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
