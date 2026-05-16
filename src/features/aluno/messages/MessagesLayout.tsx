"use client";

import { usePathname } from "next/navigation";
import { MessageThreadList } from "./MessageThreadList";
import { MessagesProvider } from "./MessagesContext";
import { useMediaQuery } from "@/hooks/use-media-query";

export function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isRoot = pathname === "/portal/aluno/mensagens";

  return (
    <MessagesProvider>
      <div className="flex h-[calc(100vh-4rem)] p-0 sm:p-4 lg:p-6 !pb-0 w-full overflow-hidden max-w-[1400px] mx-auto">
        <div className="flex w-full bg-white sm:rounded-xl sm:border border-slate-200 sm:shadow-sm overflow-hidden relative">
          
          {/* Menu / List (Hidden on mobile if not root) */}
          <div className={`${!isRoot && !isDesktop ? 'hidden' : 'flex'} w-full lg:w-[350px] xl:w-[400px] shrink-0 border-r border-slate-200`}>
            <MessageThreadList />
          </div>

          {/* Main Content Area (Hidden on mobile if it IS root) */}
          <div className={`${isRoot && !isDesktop ? 'hidden' : 'flex'} flex-1 min-w-0 bg-slate-50 relative`}>
            {children}
          </div>
          
        </div>
      </div>
    </MessagesProvider>
  );
}
