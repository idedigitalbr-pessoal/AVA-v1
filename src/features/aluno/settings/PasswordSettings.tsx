"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Info } from "lucide-react";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "A senha atual é obrigatória"),
  newPassword: z.string()
    .min(6, "A nova senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordSettings() {
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  const onSubmit = (data: PasswordFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 3000);
        resolve();
      }, 1000);
    });
  };

  return (
    <Card className="border-slate-200 shadow-sm max-w-2xl">
      <CardHeader>
        <CardTitle>Alterar Senha</CardTitle>
        <CardDescription>Mantenha sua conta segura atualizando sua senha regularmente.</CardDescription>
      </CardHeader>
      <CardContent>
        
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-lg mb-6 flex gap-3 text-sm text-sky-800">
          <Info className="w-5 h-5 shrink-0 text-sky-600 mt-0.5" />
          <p>Sua senha deve ter no mínimo 6 caracteres, contendo letras maiúsculas, minúsculas e números. Recomendamos também o uso de caracteres especiais (!@#$%).</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5 leading-none">
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <Input id="currentPassword" type="password" {...register("currentPassword")} />
            {errors.currentPassword && <p className="text-xs text-red-500 font-medium mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div className="space-y-1.5 leading-none pt-4">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input id="newPassword" type="password" {...register("newPassword")} />
            {errors.newPassword && <p className="text-xs text-red-500 font-medium mt-1">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-1.5 leading-none relative">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-xs text-red-500 font-medium mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            {isSuccess && (
              <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
                <ShieldCheck className="w-4 h-4" /> Senha alterada!
              </span>
            )}
            <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
              {isSubmitting ? "Alterando..." : "Alterar Senha"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
