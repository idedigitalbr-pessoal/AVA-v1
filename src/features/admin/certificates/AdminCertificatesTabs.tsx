"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminCertificatesTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = pathname.split('/').pop() || 'certificados';

  return (
    <div className="border-b border-slate-200 mb-6">
      <Tabs value={currentTab} onValueChange={(val) => router.push(`/admin/certificados/${val}`)} className="w-full">
        <TabsList className="bg-transparent h-12 w-full justify-start overflow-x-auto pb-0">
          <TabsTrigger value="emitidos" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 rounded-none h-full">
            Emitidos
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
