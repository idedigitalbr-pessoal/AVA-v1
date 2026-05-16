import Link from "next/link";
import { ArrowRight, Settings, GraduationCap, BookOpen, Briefcase, Tv, LifeBuoy, Calendar as CalendarIcon, LineChart, Video, Megaphone } from "lucide-react";
import { ReactNode } from "react";

// --- Types ---

export interface ShortcutItem {
  id: string;
  title: string;
  description?: string;
  icon: ReactNode;
  href: string;
  pendingCount?: number;
  accentColor?: "indigo" | "red" | "amber" | "emerald" | "blue" | "slate";
}

// --- Quick Access Card (Grid Card) ---

export function QuickAccessCard({ item }: { item: ShortcutItem }) {
  return (
    <Link 
      href={item.href}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-center group relative overflow-hidden"
    >
      {item.pendingCount && item.pendingCount > 0 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {item.pendingCount}
        </span>
      )}
      <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-full mb-3 transition-colors">
        {item.icon}
      </div>
      <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{item.title}</span>
      {item.description && (
        <span className="text-xs text-slate-500 mt-1 line-clamp-1">{item.description}</span>
      )}
    </Link>
  );
}

// --- Student Shortcut Grid (Left Column) ---

export function StudentShortcutGrid({ items }: { items: ShortcutItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {items.map(item => (
        <QuickAccessCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// --- Side Shortcut List (Right Column) ---

const ACCENT_COLORS = {
  indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white border-indigo-200 hover:border-indigo-300",
  red: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white border-red-200 hover:border-red-300",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white border-amber-200 hover:border-amber-300",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white border-emerald-200 hover:border-emerald-300",
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white border-blue-200 hover:border-blue-300",
  slate: "bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white border-slate-200 hover:border-slate-300",
};

const TEXT_HOVER_COLORS = {
  indigo: "group-hover:text-indigo-600",
  red: "group-hover:text-red-600",
  amber: "group-hover:text-amber-500",
  emerald: "group-hover:text-emerald-600",
  blue: "group-hover:text-blue-600",
  slate: "group-hover:text-slate-600",
};

export function SideShortcutList({ items }: { items: ShortcutItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(item => {
        const colorClass = ACCENT_COLORS[item.accentColor || "slate"];
        const arrowHoverClass = TEXT_HOVER_COLORS[item.accentColor || "slate"];

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border shadow-sm transition-all group ${colorClass.split('border-')[1] ? `border-${colorClass.split('border-')[1]} hover:${colorClass.split('hover:')[1]}` : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${colorClass.split('group-hover')[0]} ${colorClass.match(/group-hover:[^\s]+/g)?.join(' ')}`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700 text-sm leading-tight group-hover:text-slate-900 transition-colors">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-xs text-slate-500 mt-0.5">{item.description}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {item.pendingCount && item.pendingCount > 0 && (
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.pendingCount}
                </span>
              )}
              <ArrowRight className={`w-4 h-4 text-slate-300 transition-colors ${arrowHoverClass}`} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// --- Mock Data ---

export const MOCK_LEFT_SHORTCUTS: ShortcutItem[] = [
  {
    id: "settings",
    title: "Configurações",
    description: "Sua conta",
    icon: <Settings className="w-5 h-5" />,
    href: "/portal/aluno/perfil",
    pendingCount: 1,
  },
  {
    id: "how-to-study",
    title: "Como Estudar",
    description: "Dicas e trilhas",
    icon: <GraduationCap className="w-5 h-5" />,
    href: "/portal/aluno/dashboard",
  },
  {
    id: "courses",
    title: "Cursos Livres",
    description: "Extensão",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/portal/aluno/dashboard",
  },
  {
    id: "careers",
    title: "Carreiras",
    description: "Vagas",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/portal/aluno/dashboard",
  },
];

export const MOCK_RIGHT_SHORTCUTS: ShortcutItem[] = [
  {
    id: "live",
    title: "Aulas ao Vivo",
    description: "Quadro de horários e links",
    icon: <Tv className="w-5 h-5" />,
    href: "/portal/aluno/dashboard",
    accentColor: "red",
    pendingCount: 1,
  },
  {
    id: "support",
    title: "Atendimento Online",
    description: "Secretaria e financeiro",
    icon: <LifeBuoy className="w-5 h-5" />,
    href: "/portal/aluno/atendimento",
    accentColor: "blue",
  },
  {
    id: "calendar",
    title: "Calendário Acadêmico",
    description: "Datas importantes",
    icon: <CalendarIcon className="w-5 h-5" />,
    href: "/portal/aluno/calendario",
    accentColor: "indigo",
  },
  {
    id: "performance",
    title: "Meu Desempenho",
    description: "Notas e faltas",
    icon: <LineChart className="w-5 h-5" />,
    href: "/portal/aluno/boletim",
    accentColor: "emerald",
  },
  {
    id: "videos",
    title: "Central de Vídeos",
    description: "Acervo de gravações",
    icon: <Video className="w-5 h-5" />,
    href: "/portal/aluno/dashboard",
    accentColor: "slate",
  },
  {
    id: "announcements",
    title: "Mural de Avisos",
    description: "Comunicados e eventos",
    icon: <Megaphone className="w-5 h-5" />,
    href: "/portal/aluno/avisos",
    accentColor: "amber",
    pendingCount: 3,
  },
];
