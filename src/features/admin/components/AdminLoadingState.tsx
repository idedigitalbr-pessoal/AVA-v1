import { LoadingState } from "@/components/ui/loading-state";

interface AdminLoadingStateProps {
  text?: string;
}

export function AdminLoadingState({ text = "Carregando..." }: AdminLoadingStateProps) {
  return <LoadingState text={text} />;
}
