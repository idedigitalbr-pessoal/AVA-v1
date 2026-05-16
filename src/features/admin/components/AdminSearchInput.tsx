import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function AdminSearchInput({ value, onChange, placeholder = "Buscar..." }: AdminSearchInputProps) {
  return (
    <div className="relative flex-1 w-full sm:max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input 
        placeholder={placeholder} 
        className="pl-9" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
