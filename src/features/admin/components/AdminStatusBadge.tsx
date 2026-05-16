import { Badge } from "@/components/ui/badge";

interface AdminStatusBadgeProps {
  status: string;
  variant: 'success' | 'warning' | 'destructive' | 'default' | 'outline' | 'secondary';
}

export function AdminStatusBadge({ status, variant }: AdminStatusBadgeProps) {
  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
}
