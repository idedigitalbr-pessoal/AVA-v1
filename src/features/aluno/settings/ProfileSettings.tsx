"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Camera, Mail, Bell, Smartphone, CheckCircle2, Shield, MonitorSmartphone, Key } from "lucide-react";
import { useStudentProfile } from "@/hooks/use-queries";

export function ProfileSettings() {
  const { data: profileQuery, isLoading } = useStudentProfile();
  const [profile, setProfile] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (profileQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(profileQuery);
    }
  }, [profileQuery]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  if (isLoading || !profile) {
    return <div className="p-8 text-center text-slate-500">Carregando configurações...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500 text-sm mt-1">Gerencie suas preferências de segurança e notificações.</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-indigo-600" /> Preferências de Notificação</CardTitle>
          <CardDescription>Escolha como deseja receber avisos e atualizações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Alertas por E-mail</p>
                <p className="text-xs text-slate-500">Receba resumos de atividades e mensagens na caixa de entrada.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications?.emailAlerts ?? true}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, emailAlerts: c}})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Alertas por SMS</p>
                <p className="text-xs text-slate-500">Avisos urgentes sobre notas e prazos financeiros.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications?.smsAlerts ?? true}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, smsAlerts: c}})}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Notificações Push no Navegador</p>
                <p className="text-xs text-slate-500">Receber notificações no navegador em tempo real enquanto estuda.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications?.pushNotifications ?? false}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, pushNotifications: c}})}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg flex items-center gap-2"><Key className="w-5 h-5 text-indigo-600" /> Segurança e Acesso</CardTitle>
          <CardDescription>Gerencie sua senha e os dispositivos conectados.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
           <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Alterar Senha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="currentPass">Senha Atual</Label>
                    <Input id="currentPass" type="password" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="newPass">Nova Senha</Label>
                    <Input id="newPass" type="password" />
                 </div>
              </div>
              <div className="flex justify-end">
                 <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">Atualizar Senha</Button>
              </div>
           </div>

           <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">Sessões Ativas</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 rounded-lg border border-indigo-100 bg-indigo-50/30">
                    <div className="flex items-start gap-3">
                       <MonitorSmartphone className="w-5 h-5 text-indigo-600 mt-0.5" />
                       <div>
                          <p className="font-semibold text-slate-900 text-sm">Chrome - Windows</p>
                          <p className="text-xs text-slate-500">São Paulo, SP - IP: 192.168.1.10</p>
                          <p className="text-xs text-emerald-600 font-medium mt-1">Sessão Atual</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                    <div className="flex items-start gap-3">
                       <Smartphone className="w-5 h-5 text-slate-400 mt-0.5" />
                       <div>
                          <p className="font-semibold text-slate-900 text-sm">Safari - iOS</p>
                          <p className="text-xs text-slate-500">Campinas, SP - IP: 177.10.12.30</p>
                          <p className="text-xs text-slate-400 mt-1">Último acesso: há 2 horas</p>
                       </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">Encerrar</Button>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-600" /> Privacidade</CardTitle>
          <CardDescription>Controle o que é compartilhado sobre você.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100">
             <div>
               <p className="font-semibold text-slate-800 text-sm">Visibilidade do Perfil</p>
               <p className="text-xs text-slate-500">Permitir que outros alunos encontrem seu perfil na plataforma.</p>
             </div>
             <Switch defaultChecked />
           </div>
           
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100">
             <div>
               <p className="font-semibold text-slate-800 text-sm">Receber Ofertas e Parcerias</p>
               <p className="text-xs text-slate-500">Receber e-mails com descontos e novidades de parceiros da instituição.</p>
             </div>
             <Switch />
           </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
        {isSuccess && (
          <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Configurações salvas!
          </span>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
          {isSaving ? "Salvando..." : "Salvar Todas as Configurações"}
        </Button>
      </div>
    </div>
  );
}
