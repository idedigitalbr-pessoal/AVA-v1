"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      
      // Simula redirecionamento para reset
      setTimeout(() => {
        router.push("/reset-password");
      }, 3000);
      
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-slate-200 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-4">
          <MailCheck className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">E-mail Enviado!</h2>
        <p className="text-sm text-slate-600 mb-6">
          Enviamos as instruções de recuperação para <strong>{email}</strong>. 
          Verifique sua caixa de entrada.
        </p>
        <p className="text-xs text-slate-500 animate-pulse">Redirecionando para redefinição...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-slate-200">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">Recuperar Senha</h2>
        <p className="mt-2 text-sm text-slate-600">
          Informe seu e-mail para receber um link de redefinição de senha.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mail cadastrado</label>
          <Input 
            type="email" 
            placeholder="seu@email.edu.br" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Enviar Link
          </Button>
          
          <Link href="/" className="w-full">
            <Button variant="ghost" type="button" className="w-full text-slate-600 hover:text-slate-900">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
