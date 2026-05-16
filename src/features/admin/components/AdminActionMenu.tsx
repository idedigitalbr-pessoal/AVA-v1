import { Edit2, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminActionMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AdminActionMenu({ onView, onEdit, onDelete }: AdminActionMenuProps) {
  return (
    <div className="flex justify-end gap-1">
      {onView && (
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
