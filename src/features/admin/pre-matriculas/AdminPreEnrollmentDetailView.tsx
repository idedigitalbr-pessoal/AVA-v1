'use client';

import { useState, useEffect } from 'react';
import { PreEnrollment } from '@/types/pre-enrollment';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, User, FileText, CheckSquare, GraduationCap, Link as LinkIcon, AlertCircle, RefreshCw, FileSearch, Download } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export function AdminPreEnrollmentDetailView({ preEnrollmentId }: { preEnrollmentId: string }) {
  const [data, setData] = useState<PreEnrollment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [preEnrollmentId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/pre-enrollments/${preEnrollmentId}`);
      if (!res.ok) throw new Error('Pré-matrícula não encontrada');
      const json = await res.json();
      setData(json);
    } catch (error) {
      toast.error('Erro ao carregar detalhes');
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToEnrollment = async () => {
    try {
      const res = await fetch(`/api/admin/pre-enrollments/${preEnrollmentId}/convert-to-enrollment`, { method: 'POST' });
      if(!res.ok) throw new Error();
      
      toast.success('Inscrição convertida em matrícula com sucesso!');
      fetchData();
    } catch(err) {
      toast.error('Erro ao converter inscrição');
    }
  };

  if (loading) return <div className="p-6 text-center animate-pulse text-gray-500">Carregando detalhes...</div>;
  if (!data) return <div className="p-6 text-center text-red-500">Não encontrado.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="-ml-3">
            <Link href="/admin/pre-matriculas"><ChevronLeft className="w-5 h-5" /></Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Inscrição: {data.name}</h1>
          <Badge className={`ml-2 ${data.stage === 'CONVERTED' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-gray-100 text-gray-800'}`}>
            {data.stage}
          </Badge>
        </div>
        
        <div className="flex gap-3">
          {data.stage !== 'CONVERTED' && (
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleConvertToEnrollment}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Converter em Matrícula
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Data */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 px-5 border-b bg-gray-50/50">
              <CardTitle className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                Dados do Candidato
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Nome Completo</Label>
                <div className="font-semibold text-gray-900">{data.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">CPF</Label>
                  <div className="text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md border border-gray-100">{data.cpf}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Data de Nasc.</Label>
                  <div className="text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md border border-gray-100">{data.birthDate || 'N/A'}</div>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 block">Contato</Label>
                <div className="flex items-center text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md mb-2">
                  {data.phone || 'Não informado'}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md break-all">
                  {data.email}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 px-5 border-b bg-gray-50/50">
              <CardTitle className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                Curso Escolhido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Curso</Label>
                <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-md border border-amber-100">
                  {data.courseName}
                </div>
              </div>
              <div>
                 <Label className="text-xs text-gray-500 mb-1 block">Forma de Ingresso</Label>
                 <div className="text-sm font-medium text-gray-900">{data.entryMethod}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Documents and Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <CardHeader className="py-3 px-5 border-b bg-gray-50/50">
               <CardTitle className="text-sm font-bold text-gray-800 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <FileSearch className="w-4 h-4 text-blue-500"/> Documentação (Status: {data.documentStatus})
                 </div>
               </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {data.documents && data.documents.length > 0 ? (
                <div className="space-y-3">
                  {data.documents.map(doc => (
                    <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3 mb-2 sm:mb-0">
                        <FileText className="w-8 h-8 text-indigo-100 fill-indigo-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{doc.name}</h4>
                          <p className="text-xs text-gray-500">Tipo: {doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <Badge variant="outline" className={doc.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Download className="w-4 h-4 mr-2" /> Baixar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 flex flex-col items-center">
                  <AlertCircle className="w-6 h-6 text-gray-300 mb-2" />
                  <p className="text-sm">Nenhum documento anexado ainda.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b bg-gray-50/50">
               <CardTitle className="text-base font-bold text-gray-800">Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
               <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                 <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gray-100">
                    <CheckSquare className={`w-6 h-6 ${data.paymentStatus === 'PAID' ? 'text-green-500' : 'text-gray-400'}`} />
                 </div>
                 <h4 className="font-semibold text-gray-900">Status: {data.paymentStatus}</h4>
                 <p className="text-xs text-gray-500 text-center max-w-sm mt-2">Pagamentos são geridos via integração com gateway financeiro (mock).</p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
