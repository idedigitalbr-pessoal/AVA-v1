import * as React from "react"
import { cn } from "@/lib/utils"
import { FileQuestion } from "lucide-react"

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon = <FileQuestion className="h-10 w-10 text-slate-400" />,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 px-6 text-center", className)}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}
