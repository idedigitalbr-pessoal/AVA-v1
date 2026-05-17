"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminCertificatesTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.split('/').pop() || 'certificados';
  const effectiveTab = currentTab === 'certificados' ? 'dashboard' : currentTab;

  const handleTabChange = (val: string) => {
    if (val === 'dashboard') {
      router.push('/admin/certificados');
    } else {
      router.push(`/admin/certificados/${val}`);
    }
  };

  return (
    <div className="border-b border-slate-200 mb-6">
      <Tabs value={effectiveTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto pb-0">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="emitidos" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Emitidos
          </TabsTrigger>
          <TabsTrigger value="elegiveis" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Elegíveis
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Templates
          </TabsTrigger>
          <TabsTrigger value="validacao" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Validação
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
