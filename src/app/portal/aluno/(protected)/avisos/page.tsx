import { NoticeManager } from "@/features/aluno/notices/NoticeManager";

export default function AvisosPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)]">
      <NoticeManager />
    </div>
  );
}
