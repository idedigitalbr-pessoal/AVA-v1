import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbProps {
  items: {
    label: string
    href?: string
  }[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-slate-500", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-indigo-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-900 font-medium" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0 text-slate-400" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
