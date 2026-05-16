"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader } from "../components";
import { AdminCertificatesTabs } from "./AdminCertificatesTabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck } from "lucide-react";
import { certificatesService } from "@/lib/api";

export function AdminCertificateValidation() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async () => {
    if (!code.trim()) return toast.error("Digite o código de validação.");
    setLoading(true);
    setResult(null);

    // Mock search logic
    setTimeout(async () => {
      try {
        const certs = await certificatesService.listCertificates();
        const found = certs.find(c => c.code === code);
        if (found) {
          setResult({ valid: true, cert: found });
          toast.success("Certificado encontrado.");
        } else {
          setResult({ valid: false });
          toast.error("Certificado não encontrado.");
        }
      } catch {
        toast.error("Erro na validação.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Validação de Certificados" 
        description="Confira a autenticidade de um certificado informando o seu código." 
      />

      <AdminCertificatesTabs />

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Validar Documento</h2>
            <p className="text-slate-500 mt-2">
              Insira o código único do certificado para validar as assinaturas e a emissão.
            </p>
          </div>

          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Ex: CERT-1234-ABCD" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              className="font-mono"
            />
            <Button onClick={handleValidate} disabled={loading}>
              {loading ? "Verificando..." : <><Search className="w-4 h-4 mr-2" /> Validar</>}
            </Button>
          </div>

          {result && (
            <div className={`mt-8 p-6 rounded-xl border ${result.valid ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
              {result.valid ? (
                <div>
                  <h3 className="text-emerald-800 font-bold mb-2 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2" /> Certificado Válido
                  </h3>
                  <div className="space-y-2 mt-4 text-sm text-slate-700">
                    <p><span className="font-semibold text-slate-900">Código:</span> {result.cert.code}</p>
                    <p><span className="font-semibold text-slate-900">ID Aluno:</span> {result.cert.studentId}</p>
                    <p><span className="font-semibold text-slate-900">ID Curso:</span> {result.cert.courseId}</p>
                    <p><span className="font-semibold text-slate-900">Emissão:</span> {new Date(result.cert.issueDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold text-slate-900">Status:</span> {result.cert.status}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-red-800 font-bold mb-2">Documento Inválido</h3>
                  <p className="text-red-600 text-sm">Não encontramos nenhum certificado associado a este código no nosso sistema.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
