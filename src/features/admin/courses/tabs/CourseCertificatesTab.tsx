"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminDataTable, AdminLoadingState } from "../../components";
import { Button } from "@/components/ui/button";
import { Settings, FileCheck } from "lucide-react";

export function CourseCertificatesTab({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock data for issued certs
  const data = [
    { id: "1", student: "João Silva", issueDate: "2024-03-01", status: "Emitido" },
    { id: "2", student: "Maria Souza", issueDate: "2024-03-15", status: "Emitido" }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const columns = [
    { header: "Aluno", accessor: (i: any) => i.student },
    { header: "Data de Emissão", accessor: (i: any) => new Date(i.issueDate).toLocaleDateString('pt-BR') },
    { header: "Status", accessor: (i: any) => i.status },
  ];

  if (loading) return <AdminLoadingState text="Carregando certificados..." />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Certificados</h3>
          <p className="text-sm text-slate-500">Histórico de emissões e regras de conclusão.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/admin/certificados')}>
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Button onClick={() => toast.success("Certificado mockado gerado e enviado.")}>
            <FileCheck className="w-4 h-4 mr-2" />
            Emitir Manualmente
          </Button>
        </div>
      </div>

      <AdminDataTable 
        columns={columns} 
        data={data} 
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhum certificado emitido."
      />
    </div>
  );
}
