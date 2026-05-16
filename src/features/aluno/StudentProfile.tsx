"use client";

import { User, DashboardStats } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface StudentProfileProps {
  user: User;
  stats: DashboardStats['student'];
}

export function StudentProfile({ user, stats }: StudentProfileProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie suas informações pessoais e preferências.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lado Esquerdo - Info e Actions */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <Card className="overflow-hidden border-slate-200">
             <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
             <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 border-4 border-white rounded-full bg-slate-200 h-24 w-24 overflow-hidden shadow-sm flex items-center justify-center text-3xl font-bold text-slate-500 group cursor-pointer">
                  {user.avatarUrl ? (
                    <Image src={user.avatarUrl} alt={user.name} fill className="object-cover group-hover:brightness-75 transition-all" />
                  ) : (
                    user.name.substring(0, 2).toUpperCase()
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black/30">
                    <Camera className="h-8 w-8" />
                  </div>
                </div>
                
                <div className="mt-14">
                   <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                   <p className="text-slate-500 text-sm">{user.email}</p>
                   
                   <div className="mt-6 space-y-3">
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <GraduationCap className="h-4 w-4 text-slate-400" />
                        <span>Sistemas de Informação</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <span>Matrícula: 202610123</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>(11) 98765-4321</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>São Paulo, SP</span>
                     </div>
                   </div>
                </div>
             </div>
          </Card>

          <Card className="border-slate-200">
             <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">Resumo Acadêmico</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <span className="text-slate-600">Média Geral</span>
                   <span className="font-bold text-indigo-600 text-lg">{stats.averageGrade.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                   <span className="text-slate-600">Cursos Concluídos</span>
                   <span className="font-bold text-slate-900">{stats.completedCourses}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-slate-600">Cursos Ativos</span>
                   <span className="font-bold text-slate-900">{stats.activeCourses}</span>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Lado Direito - Form de Edição */}
        <div className="w-full md:w-2/3">
          <Card className="border-slate-200">
            <CardHeader>
               <CardTitle>Informações Pessoais</CardTitle>
               <CardDescription>Atualize seus dados de contato e preferências.</CardDescription>
            </CardHeader>
            <CardContent>
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label htmlFor="firstName">Nome Completo</Label>
                       <Input id="firstName" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="email">E-mail Acadêmico</Label>
                       <Input id="email" defaultValue={user.email} disabled className="bg-slate-50" />
                       <p className="text-xs text-slate-500">O e-mail acadêmico não pode ser alterado.</p>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="phone">Telefone</Label>
                       <Input id="phone" defaultValue="(11) 98765-4321" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="birthDate">Data de Nascimento</Label>
                       <Input id="birthDate" type="date" defaultValue="1998-05-15" />
                    </div>
                 </div>
                 
                 <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Senha e Segurança</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <Label htmlFor="currentPassword">Senha Atual</Label>
                         <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                         <Label htmlFor="newPassword">Nova Senha</Label>
                         <Input id="newPassword" type="password" />
                      </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                    <Button variant="outline" type="button">Cancelar</Button>
                    <Button 
                      type="button" 
                      className="bg-indigo-600 hover:bg-indigo-700" 
                      onClick={() => toast.success("Perfil atualizado com sucesso!")}
                    >
                      Salvar Alterações
                    </Button>
                 </div>
               </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
