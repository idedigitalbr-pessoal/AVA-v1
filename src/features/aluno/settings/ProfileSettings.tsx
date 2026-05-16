"use client";

import { useState } from "react";
import { MOCK_PROFILE } from "./types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Camera, Mail, Bell, Smartphone, CheckCircle2 } from "lucide-react";

export function ProfileSettings() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
          <CardDescription>Informações básicas da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 overflow-hidden border-4 border-white shadow-sm ring-1 ring-slate-200">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Nome Completo</Label>
                  <Input value={profile.name} readOnly className="bg-slate-50 text-slate-500 font-medium" />
                </div>
                <div className="space-y-1.5">
                  <Label>Matrícula (RA)</Label>
                  <Input value={profile.registration} readOnly className="bg-slate-50 text-slate-500 font-medium" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Curso</Label>
                  <Input value={profile.course} readOnly className="bg-slate-50 text-slate-500 font-medium" />
                </div>
                <div className="space-y-1.5">
                  <Label>E-mail Pessoal</Label>
                  <Input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label>Celular</Label>
                  <Input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="bg-white" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>Escolha como deseja receber avisos e atualizações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 pr-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Alertas por E-mail</p>
                <p className="text-xs text-slate-500">Receba resumos de atividades e mensagens na caixa de entrada.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications.emailAlerts}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, emailAlerts: c}})}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 pr-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Alertas por SMS</p>
                <p className="text-xs text-slate-500">Avisos urgentes sobre notas e prazos financeiros.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications.smsAlerts}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, smsAlerts: c}})}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 pr-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Notificações Push</p>
                <p className="text-xs text-slate-500">Receber notificações no navegador em tempo real enquanto estuda.</p>
              </div>
            </div>
            <Switch 
              checked={profile.notifications.pushNotifications}
              onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, pushNotifications: c}})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-4 pt-2">
        {isSuccess && (
          <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 className="w-4 h-4" /> Configurações salvas!
          </span>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
          {isSaving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  );
}
