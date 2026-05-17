"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader, AdminCreateButton, AdminFilterBar, AdminSearchInput, AdminLoadingState } from "../components";
import { AdminCertificatesTabs } from "./AdminCertificatesTabs";
import { AdminCertificatesTable } from "./AdminCertificatesTable";
import { Certificate } from "@/types";
import { certificatesService } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Can } from "@/lib/auth/Can";

export function AdminIssuedCertificates() {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const certs = await certificatesService.listCertificates();
      setData(certs);
    } catch {
      toast.error("Erro ao carregar certificados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const filteredData = data.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Certificados Emitidos" 
        description="Gestão de certificados gerados na plataforma." 
        action={
          <Can I="MANAGE_SYSTEM">
            <AdminCreateButton 
              label="Emitir Manualmente" 
              onClick={() => toast.success("Abertura de formulário de emissão")} 
            />
          </Can>
        } 
      />

      <AdminCertificatesTabs />

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <AdminFilterBar>
          <AdminSearchInput 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Buscar por código de validação..." 
          />
          <div className="w-[200px]">
             <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || '')}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ISSUED">Emitidos</SelectItem>
                  <SelectItem value="REVOKED">Revogados</SelectItem>
                  <SelectItem value="EXPIRED">Expirados</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </AdminFilterBar>

        {loading ? (
          <AdminLoadingState text="Carregando certificados..." />
        ) : (
          <AdminCertificatesTable data={filteredData} refetch={fetchData} />
        )}
      </div>
    </div>
  );
}
