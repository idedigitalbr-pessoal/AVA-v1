"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studentsService } from "@/lib/api";
import { 
  AdminPageHeader, 
  AdminSearchInput, 
  AdminCreateButton, 
  AdminFilterBar, 
  AdminStatusBadge, 
  AdminEmptyState, 
  AdminLoadingState, 
  AdminDataTable 
} from "./components";

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await studentsService.getEnrollments('all');
        setEnrollments(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredEnrollments = enrollments.filter(enr => {
    const matchesSearch = enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          enr.courseId.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter) {
      if (statusFilter === 'Confirmada') matchesStatus = enr.status === 'ACTIVE';
      else if (statusFilter === 'Pendente') matchesStatus = enr.status === 'PENDING';
      else if (statusFilter === 'Cancelada') matchesStatus = enr.status === 'CANCELLED';
    }

    return matchesSearch && matchesStatus;
  });

  const renderActionMenu = (enr: any) => {
    if (enr.status !== 'PENDING') return null;
    return (
      <div className="flex justify-end items-center gap-1">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600 border-none" onClick={() => toast.success("Matrícula aprovada.")}>
          <CheckCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 border-none" onClick={() => toast.success("Matrícula cancelada.")}>
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const columns = [
    { header: "Aluno", accessor: (enr: any) => <span className="font-medium text-slate-900">{enr.studentName}</span> },
    { header: "Curso ID", accessor: (enr: any) => <span className="text-slate-500">{enr.courseId}</span> },
    { header: "Data", accessor: (enr: any) => <span className="text-slate-500">{new Date(enr.enrolledAt).toLocaleDateString()}</span> },
    { header: "Status", accessor: (enr: any) => (
        <AdminStatusBadge 
          status={enr.status === 'ACTIVE' ? 'Confirmada' : enr.status === 'CANCELLED' ? 'Cancelada' : 'Pendente'} 
          variant={enr.status === 'ACTIVE' ? 'success' : enr.status === 'PENDING' ? 'warning' : 'destructive'} 
        />
      ) 
    },
    { header: "Ações Rápidas", className: "text-right", accessor: renderActionMenu }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Matrículas" 
        description="Gerencie as matrículas de alunos em cursos e disciplinas." 
        action={
          <AdminCreateButton 
            label="Nova Matrícula" 
            onClick={() => toast.success("Iniciando matrícula...")} 
          />
        } 
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AdminSearchInput 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Buscar por aluno ou curso..." 
            />
            <select 
               className="border border-slate-200 rounded-md text-sm px-3 py-2 bg-white w-full sm:w-auto sm:max-w-[200px] outline-none focus:ring-2 focus:ring-indigo-500"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
            >
               <option value="">Status: Todos</option>
               <option value="Confirmada">Confirmada</option>
               <option value="Pendente">Pendente</option>
               <option value="Cancelada">Cancelada</option>
            </select>
          </div>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando matrículas..." />
        ) : filteredEnrollments.length === 0 ? (
          <AdminEmptyState 
            title="Nenhuma matrícula encontrada"
            description="Você ainda não cadastrou nenhuma matrícula ou a busca não retornou resultados."
          />
        ) : (
          <AdminDataTable 
            data={filteredEnrollments}
            columns={columns}
            keyExtractor={(enr) => enr.id}
            renderMobileCard={(enr) => (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{enr.studentName}</p>
                    <p className="text-xs text-slate-500">Curso ID: {enr.courseId}</p>
                  </div>
                  <AdminStatusBadge 
                    status={enr.status === 'ACTIVE' ? 'Confirmada' : enr.status === 'CANCELLED' ? 'Cancelada' : 'Pendente'} 
                    variant={enr.status === 'ACTIVE' ? 'success' : enr.status === 'PENDING' ? 'warning' : 'destructive'} 
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center">Data: {new Date(enr.enrolledAt).toLocaleDateString()}</span>
                </div>
                {enr.status === 'PENDING' && (
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-700" onClick={() => toast.success("Matrícula aprovada.")}>
                      <CheckCircle className="h-4 w-4 mr-2" /> Aprovar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => toast.success("Matrícula cancelada.")}>
                      <XCircle className="h-4 w-4 mr-2" /> Cancelar
                    </Button>
                  </div>
                )}
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
