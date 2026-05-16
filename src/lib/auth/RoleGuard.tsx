"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Permission } from "@/types";

interface RoleGuardProps {
  requirePermission: Permission;
  children: React.ReactNode;
}

export function RoleGuard({ requirePermission, children }: RoleGuardProps) {
  const { user, isLoading, can } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/portal/aluno/login"); // Fallback to login
      } else if (!can(requirePermission)) {
        router.push("/"); // Or an unauthorized page
      }
    }
  }, [user, isLoading, can, requirePermission, router]);

  const isAuthorized = user && can(requirePermission);

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
