"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  loginTitle: string;
  loginSubtitle: string;
  defaultRole?: string;
  forgotPasswordLink: string;
}

export function LoginForm({ loginTitle, loginSubtitle, defaultRole, forgotPasswordLink }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, defaultRole);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-slate-200">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">{loginTitle}</h2>
        <p className="mt-2 text-sm text-slate-600">{loginSubtitle}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-xs text-indigo-800 space-y-2 mb-4">
          <p className="font-semibold text-indigo-900">Credenciais de Teste (Clique para preencher):</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => { setEmail("admin@ava.edu.br"); setPassword("123456"); }} className="bg-white border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-100 transition-colors">Admin</button>
            <button type="button" onClick={() => { setEmail("carlos@ava.edu.br"); setPassword("123456"); }} className="bg-white border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-100 transition-colors">Professor</button>
            <button type="button" onClick={() => { setEmail("ana@ava.edu.br"); setPassword("123456"); }} className="bg-white border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-100 transition-colors">Aluno</button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail corporativo / acadêmico</label>
          <Input 
            type="email" 
            placeholder="seu@avatar.edu.br" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Senha</label>
            <Link href={forgotPasswordLink} className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
              Esqueceu a senha?
            </Link>
          </div>
          <Input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Entrar
        </Button>
      </form>
    </div>
  );
}
