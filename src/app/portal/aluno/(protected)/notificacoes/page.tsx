import { NotificationManager } from "@/features/aluno/notifications/NotificationManager";

export default function NotificacoesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto min-h-[calc(100vh-4rem)]">
      <NotificationManager />
    </div>
  );
}
