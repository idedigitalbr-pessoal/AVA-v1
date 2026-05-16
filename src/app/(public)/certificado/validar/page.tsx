import { CertificateValidation } from "@/features/public/certificate/CertificateValidation";

export const metadata = {
  title: "Validação de Certificado - Portal Acadêmico",
  description: "Verifique a autenticidade de certificados emitidos",
};

export default function ValidarCertificadoPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <CertificateValidation />
    </div>
  );
}
