"use client";

import { useRouter } from "next/navigation";
import { DashboardStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Book, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockRecentUsers } from "@/mocks";

interface AdminDashboardProps {
  stats: DashboardStats["admin"];
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg shadow-slate-200/50 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Visão Geral - Administração</h1>
          <p className="text-slate-300 mt-2">Acompanhe as métricas e gerencie a plataforma com facilidade.</p>
        </div>
        <Button onClick={() => router.push('/admin/alunos/novo')} className="bg-white text-slate-900 hover:bg-slate-100 shadow-sm font-medium w-full sm:w-auto">Novo Cadastro</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Alunos</CardTitle>
            <GraduationCap className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.totalStudents}</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">+12% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Professores</CardTitle>
            <Briefcase className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.totalTeachers}</div>
            <p className="text-xs text-slate-500 mt-1">Ativos na plataforma</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Cursos Ativos</CardTitle>
            <Book className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.activeCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Receita Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">R$ {(stats.revenue).toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Cadastros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Ativo' ? 'success' : 'warning'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/cursos/novo')}>Criar Novo Curso</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/relatorios')}>Gerenciar Relatórios</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/admin/configuracoes')}>Configurações do Sistema</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
