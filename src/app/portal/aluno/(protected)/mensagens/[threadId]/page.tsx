import { MessageConversation } from "@/features/aluno/messages/MessageConversation";

export default async function ConversationPage({ params }: { params: Promise<{ threadId: string }> }) {
  const resolvedParams = await params;
  return <MessageConversation threadId={resolvedParams.threadId} />;
}
