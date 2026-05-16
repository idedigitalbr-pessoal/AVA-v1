import { EmptyState } from "@/components/ui/empty-state";
import React from "react";

export function AdminEmptyState(props: React.ComponentProps<typeof EmptyState>) {
  return <EmptyState {...props} />;
}
