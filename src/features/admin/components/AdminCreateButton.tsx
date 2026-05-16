import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Can } from "@/lib/auth/Can";
import type { Permission } from "@/lib/auth/permissions";

interface AdminCreateButtonProps {
  onClick: () => void;
  label?: string;
  permission?: Permission;
}

export function AdminCreateButton({ onClick, label = "Novo", permission }: AdminCreateButtonProps) {
  const button = (
    <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto" onClick={onClick}>
      <PlusCircle className="mr-2 h-4 w-4" /> {label}
    </Button>
  );

  if (permission) {
    return <Can I={permission}>{button}</Can>;
  }

  return button;
}
