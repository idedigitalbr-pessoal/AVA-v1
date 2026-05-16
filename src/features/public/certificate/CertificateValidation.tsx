"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, XCircle, Search, FileText, ArrowLeft, Award, Calendar, GraduationCap, Clock } from "lucide-react";
import { MOCK_CERTIFICATES, CertificateInfo } from "./types";
import Link from "next/link";

const validationSchema = z.object({
  cpf: z.string().min(11, "CPF deve ter 11 dígitos").regex(/^[0-9]+$/, "Apenas números"),
  code: z.string().min(6, "Código inválido").toUpperCase()
});

type ValidationFormValues = z.infer<typeof validationSchema>;

type ValidationState = "IDLE" | "LOADING" | "VALID" | "INVALID" | "REVOKED";

export function CertificateValidation() {
  const [validationState, setValidationState] = useState<ValidationState>("IDLE");
  const [result, setResult] = useState<CertificateInfo | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationFormValues>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = (data: ValidationFormValues) => {
    setValidationState("LOADING");
    setResult(null);

    setTimeout(() => {
      const key = `${data.cpf}-${data.code}`;
      const cert = MOCK_CERTIFICATES[key];

      if (cert) {
        setResult(cert);
        setValidationState(cert.status === "VALIDO" ? "VALID" : "REVOKED");
      } else {
        setValidationState("INVALID");
      }
    }, 1500);
  };

  const handleReset = () => {
    setValidationState("IDLE");
    setResult(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para o início
      </Link>

      <Card className="border-slate-200 shadow-xl shadow-slate-200/50">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-8 h-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Validação de Certificado</CardTitle>
          <CardDescription>
            Verifique a autenticidade de um certificado emitido pela instituição.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {validationState === "IDLE" || validationState === "LOADING" ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF do Aluno</Label>
                <Input 
                  id="cpf" 
                  placeholder="Somente números (ex: 12345678900)" 
                  maxLength={11}
                  {...register("cpf")} 
                  className="bg-slate-50"
                />
                {errors.cpf && <p className="text-xs text-red-500 font-medium">{errors.cpf.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código de Validação</Label>
                <Input 
                  id="code" 
                  placeholder="Ex: ABC123DEF" 
                  {...register("code")} 
                  className="bg-slate-50 uppercase"
                />
                {errors.code && <p className="text-xs text-red-500 font-medium">{errors.code.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-base font-bold"
                disabled={validationState === "LOADING"}
              >
                {validationState === "LOADING" ? (
                  "Verificando..."
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Validar Certificado
                  </>
                )}
              </Button>
            </form>
          ) : validationState === "VALID" && result ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center justify-center text-center p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mb-2" />
                <h3 className="text-lg font-bold text-emerald-900">Certificado Válido</h3>
                <p className="text-sm text-emerald-700">A autenticidade deste documento foi confirmada.</p>
              </div>

              <div className="space-y-4">
                <div className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Award className="w-32 h-32" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Aluno(a)</span>
                    <p className="font-semibold text-slate-800 text-lg uppercase">{result.studentName}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Curso</span>
                        <p className="font-medium text-slate-700 text-sm leading-snug">{result.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-500 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Carga Horária</span>
                        <p className="font-medium text-slate-700 text-sm">{result.workloadHours} horas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Data de Emissão</span>
                        <p className="font-medium text-slate-700 text-sm">{result.issueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Código de Validação</span>
                        <p className="font-mono font-bold text-slate-700 text-xs">{result.validationCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleReset} variant="outline" className="w-full h-11 font-medium border-slate-200">
                Fazer nova consulta
              </Button>
            </div>
          ) : validationState === "REVOKED" ? (
             <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
               <div className="flex flex-col items-center justify-center p-6 bg-amber-50 border border-amber-200 rounded-xl">
                 <XCircle className="w-16 h-16 text-amber-500 mb-4" />
                 <h3 className="text-xl font-bold text-amber-900 mb-2">Certificado Revogado</h3>
                 <p className="text-amber-700 text-sm">
                   Este certificado foi emitido, mas atualmente encontra-se revogado ou cancelado pela instituição.
                 </p>
               </div>
               <Button onClick={handleReset} variant="outline" className="w-full h-11 font-medium border-slate-200">
                 Tentar novamente
               </Button>
             </div>
          ) : (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-100 rounded-xl">
                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-900 mb-2">Certificado não encontrado</h3>
                <p className="text-red-700 text-sm">
                  Não foi possível encontrar um certificado válido com as credenciais informadas.
                  Verifique o CPF e o Código de Validação.
                </p>
              </div>
              <Button onClick={handleReset} variant="outline" className="w-full h-11 font-medium border-slate-200">
                Tentar novamente
              </Button>
            </div>
          )}
        </CardContent>
        {validationState === "IDLE" && (
          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col gap-2 text-center">
            <p className="text-xs text-slate-500 w-full">
              Pressione validar para consultar as informações em nosso banco de dados. O status retornará de forma instantânea.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
