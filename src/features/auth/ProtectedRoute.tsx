"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { LoadingState } from "@/components/ui/loading-state";
import { useRouter, usePathname } from "next/navigation";
import { Role } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const isAuthorized = !isLoading && user && (!allowedRoles || allowedRoles.includes(user.role));

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redireciona para o login correto dependendo de onde tentou acessar
        if (pathname?.startsWith("/aluno") || pathname?.startsWith("/portal/aluno")) {
          router.push("/portal/aluno/login");
        } else {
          router.push("/login");
        }
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redireciona para o dashboard correto do usuário
        switch (user.role) {
          case "ALUNO":
            router.push("/portal/aluno/dashboard");
            break;
          case "PROFESSOR":
            router.push("/professor");
            break;
          case "ADMIN":
          case "SECRETARIA":
            router.push("/admin");
            break;
          default:
            router.push("/");
        }
      }
    }
  }, [user, isLoading, allowedRoles, router, pathname]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingState text="Verificando acesso..." />
      </div>
    );
  }

  return <>{children}</>;
}
