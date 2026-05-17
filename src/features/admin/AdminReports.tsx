"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, BookOpen, Activity, TrendingUp, Filter, Eye, ArrowLeft, FileText, BarChart, FileBadge } from "lucide-react";
import { toast } from "sonner";
import { Report, ReportResult } from "@/types";
import { reportsService } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminLoadingState } from "./components";

const reportIcons: Record<string, any> = {
  'performance': BookOpen,
  'attendance': Users,
  'engagement': Activity,
  'enrollments': TrendingUp,
  'certificates': FileBadge,
  'teachers': Users,
  'financial': BarChart,
};

export function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [previewData, setPreviewData] = useState<ReportResult | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await reportsService.listReports();
        setReports(data);
      } catch {
        toast.error("Erro ao carregar relatórios");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleVisualizar = async (report: Report) => {
    setSelectedReport(report);
    setLoadingPreview(true);
    try {
      const data = await reportsService.previewReport(report.id, {});
      setPreviewData(data);
    } catch {
      toast.error("Erro ao carregar pré-visualização");
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleExportCsv = async (reportId: string) => {
    toast.success("Download do CSV iniciado.");
  };

  if (loading) return <AdminLoadingState text="Carregando painel de relatórios..." />;

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedReport(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{selectedReport.title}</h1>
            <p className="text-slate-500 text-sm mt-1">{selectedReport.description}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" /> Filtros
            </h3>
            <Button variant="outline" onClick={() => handleExportCsv(selectedReport.id)}>
              <Download className="mr-2 h-4 w-4" /> Exportar CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Curso" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os cursos</SelectItem>
                <SelectItem value="c1">Engenharia de Software</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Turma" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as turmas</SelectItem>
                <SelectItem value="t1">Turma A</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Período" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Últimos 30 dias</SelectItem>
                <SelectItem value="this_month">Este Mês</SelectItem>
                <SelectItem value="this_year">Este Ano</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-900">Pré-visualização do Relatório</h3>
          </div>
          {loadingPreview ? (
            <AdminLoadingState text="Gerando dados..." />
          ) : previewData ? (
             <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {previewData.headers.map((h, i) => (
                        <TableHead key={i}>{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.rows.map((row, rIdx) => (
                      <TableRow key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <TableCell key={cIdx}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </div>
          ) : (
             <div className="p-8 text-center text-slate-500">Nenhum dado encontrado.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Relatórios Base</h1>
        <p className="text-slate-500 text-sm mt-1">Extraia dados analíticos da plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = reportIcons[report.id] || FileText;
          return (
            <Card key={report.id} className="border-slate-200 flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600 flex-shrink-0">
                   <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 min-h-[40px]">{report.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex items-center justify-between mt-auto border-t border-slate-100/60 mt-4">
                 <Button variant="outline" className="w-[120px]" onClick={() => handleVisualizar(report)}>
                    <Eye className="mr-2 h-4 w-4" /> Visualizar
                 </Button>
                 <Button variant="secondary" className="w-[120px] bg-indigo-50 text-indigo-700 hover:bg-indigo-100" onClick={() => handleExportCsv(report.id)}>
                    <Download className="mr-2 h-4 w-4" /> CSV
                 </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
