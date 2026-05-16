import { ServiceDetail } from "@/features/aluno/services/ServiceDetail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServicoDetalhePage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6">
        <Link href="/portal/aluno/servicos" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Serviços
        </Link>
      </div>

      <ServiceDetail id={id} />
    </div>
  );
}
