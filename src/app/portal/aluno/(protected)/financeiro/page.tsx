import { FinancialManager } from "@/features/aluno/financial/FinancialManager";
import { DollarSign } from "lucide-react";

export const metadata = {
  title: "Área Financeira - Portal do Aluno",
  description: "Gerenciamento de mensalidades e taxas",
};

export default function FinanceiroPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center">
          <DollarSign className="w-8 h-8 mr-3 text-emerald-500" /> Área Financeira
        </h1>
        <p className="text-slate-500 mt-1 lg:text-lg">
          Consulte seu extrato, baixe boletos e acompanhe a situação das suas mensalidades.
        </p>
      </div>

      <FinancialManager />
    </div>
  );
}
