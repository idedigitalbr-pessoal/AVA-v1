import React from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{description}</p>
      </div>
      {action && <div className="w-full sm:w-auto">{action}</div>}
    </div>
  );
}
