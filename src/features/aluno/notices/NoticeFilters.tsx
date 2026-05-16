import { NoticeCategory } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Tags, CheckCircle2, Circle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NoticeFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  categoryFilter: NoticeCategory | "ALL";
  onCategoryFilterChange: (val: NoticeCategory | "ALL") => void;
  statusFilter: "ALL" | "READ" | "UNREAD";
  onStatusFilterChange: (val: "ALL" | "READ" | "UNREAD") => void;
  unreadCount?: number;
}

export function NoticeFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  unreadCount = 0
}: NoticeFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Buscar avisos..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
        <Select value={categoryFilter} onValueChange={(val: any) => onCategoryFilterChange(val)}>
          <SelectTrigger className="w-[150px] bg-slate-50 border-slate-200 h-10">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todas categorias</SelectItem>
            <SelectItem value="INSTITUCIONAL">Institucional</SelectItem>
            <SelectItem value="CURSO">Curso</SelectItem>
            <SelectItem value="DISCIPLINA">Disciplina</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-slate-50 border-slate-200 h-10 px-4 py-2 gap-2 shrink-0">
              <Filter className="w-4 h-4 text-slate-500" />
              <span>
                {statusFilter === "ALL" ? "Status" : statusFilter === "READ" ? "Lidos" : "Não Lidos"}
              </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filtrar por Leitura</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("ALL")}
              className={`flex items-center justify-between ${statusFilter === 'ALL' ? 'bg-slate-100 font-medium' : ''}`}
            >
              <span>Todos</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("UNREAD")}
              className={`flex items-center justify-between ${statusFilter === 'UNREAD' ? 'bg-indigo-50 text-indigo-700 font-medium' : ''}`}
            >
              <div className="flex items-center">
                <Circle className="w-4 h-4 mr-2 fill-indigo-600 text-indigo-600" />
                <span>Não lidos</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-indigo-100 text-indigo-700 text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusFilterChange("READ")}
              className={`flex items-center justify-between ${statusFilter === 'READ' ? 'bg-slate-100 font-medium' : ''}`}
            >
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-slate-400" />
                <span>Lidos</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
