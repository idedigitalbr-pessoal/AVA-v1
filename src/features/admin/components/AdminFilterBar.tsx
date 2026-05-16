import React from "react";

interface AdminFilterBarProps {
  children: React.ReactNode;
}

export function AdminFilterBar({ children }: AdminFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {children}
    </div>
  );
}
