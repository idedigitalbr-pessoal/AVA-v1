"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Lock, Settings } from "lucide-react";

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/portal/aluno/configuracoes", label: "Meu Perfil", icon: User },
    { href: "/portal/aluno/configuracoes/senha", label: "Alterar Senha", icon: Lock },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-indigo-500" /> Configurações
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Gerencie seus dados pessoais, senha e preferências de notificação.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
