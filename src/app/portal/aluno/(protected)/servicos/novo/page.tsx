import { ServiceNew } from "@/features/aluno/services/ServiceNew";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NovoServicoPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8">
        <Link href="/portal/aluno/servicos" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Serviços
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center">
          <PlusCircle className="w-8 h-8 mr-3 text-indigo-500" /> Nova Solicitação
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Selecione o serviço desejado e preencha as informações necessárias.
        </p>
      </div>

      <ServiceNew />
    </div>
  );
}
