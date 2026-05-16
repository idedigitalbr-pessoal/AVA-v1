"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { Role } from "@/types";
import { ReactNode } from "react";

interface PermissionGuardProps {
  children: ReactNode;
  allowedRoles?: Role[];
  fallback?: ReactNode;
}

export function PermissionGuard({ children, allowedRoles, fallback = null }: PermissionGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) return <>{fallback}</>;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
