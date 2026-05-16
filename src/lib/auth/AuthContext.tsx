"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role, Permission } from "@/types";
import { allMockUsers } from "@/mocks";
import { useRouter } from "next/navigation";
import { hasPermission } from "./permissions";

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for mock auth
    try {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // eslint-disable-line
      }
    } catch (error) {
      console.error("Failed to parse stored user", error);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, preferredRole?: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const cleanEmail = email.trim().toLowerCase();
      let mockUser = allMockUsers.find((u) => u.email.toLowerCase() === cleanEmail);
      
      // Fallback pra testes: faz login direto se existir alguém com a role e senha for qualquer coisa
      if (!mockUser && preferredRole) {
         mockUser = allMockUsers.find(u => u.role === preferredRole);
      }
      
      if (!mockUser) {
        // Se qualquer email for digitado, use ALUNO como padrão se não for o painel de admin
         mockUser = allMockUsers.find(u => u.role === 'ALUNO') || {
           id: "s1", name: "Ana Souza", email: "ana@ava.edu.br", role: "ALUNO", 
           registrationNumber: "2026001", avatarUrl: "https://i.pravatar.cc/150?u=s1", 
           createdAt: "2025-03-01", updatedAt: "2026-05-01"
         } as User;
      }
      
      if (!mockUser) {
         throw new Error("Credenciais inválidas");
      }

      setUser(mockUser);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      
      // Redirect based on role
      switch (mockUser.role) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    router.push("/");
  };

  const can = (permission: Permission) => {
    return hasPermission(user?.role, permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, can }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
