import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { SidebarProvider } from "@/components/layout/sidebar-context";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["PROFESSOR"]}>
      <SidebarProvider>
        <div className="flex h-screen bg-slate-50">
          <Sidebar role="PROFESSOR" />
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
