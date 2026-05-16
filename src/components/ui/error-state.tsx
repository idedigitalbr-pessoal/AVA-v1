import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error | null
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Ocorreu um erro",
  description = "Não foi possível carregar as informações. Tente novamente mais tarde.",
  error,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-red-200 bg-red-50/50 py-16 px-6 text-center", className)}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-red-100 mb-5">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
        {error?.message || description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  )
}
