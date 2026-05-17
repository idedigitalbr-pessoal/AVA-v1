"use client";

import { Loader2 } from "lucide-react";

export default function ProfessorLoading() {
  return (
    <div className="flex h-[80vh] items-center justify-center p-6">
      <div className="flex flex-col items-center shadow-lg p-6 rounded-2xl border border-slate-100 bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-500 font-medium">Carregando painel do professor...</p>
      </div>
    </div>
  );
}
