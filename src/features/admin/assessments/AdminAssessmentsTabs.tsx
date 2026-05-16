"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminAssessmentsTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.split('/').pop() || 'avaliacoes';

  return (
    <div className="border-b border-slate-200 mb-6">
      <Tabs value={currentTab} onValueChange={(val) => router.push(`/admin/avaliacoes/${val}`)} className="w-full">
        <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto pb-0">
          <TabsTrigger value="atividades" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Atividades
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="provas" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Provas
          </TabsTrigger>
          <TabsTrigger value="banco-questoes" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Banco de Questões
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
