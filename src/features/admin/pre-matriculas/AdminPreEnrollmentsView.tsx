'use client';

import { useState, useEffect } from 'react';
import { PreEnrollment, PreEnrollmentStage } from '@/types/pre-enrollment';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Phone, Mail, Clock, Search, MoreVertical, Plus, CheckCircle, FileText, FileSearch, Banknote, ShieldAlert, GraduationCap, XCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const STAGES: { id: PreEnrollmentStage; label: string; color: string; icon: any }[] = [
  { id: 'NEW_ENROLLMENT', label: 'Nova Inscrição', color: 'bg-blue-100 text-blue-800', icon: Plus },
  { id: 'INCOMPLETE_DATA', label: 'Dados incompletos', color: 'bg-orange-100 text-orange-800', icon: ShieldAlert },
  { id: 'WAITING_DOCS', label: 'Aguardando Docs', color: 'bg-yellow-100 text-yellow-800', icon: FileText },
  { id: 'DOCS_UNDER_REVIEW', label: 'Docs em análise', color: 'bg-purple-100 text-purple-800', icon: FileSearch },
  { id: 'WAITING_PAYMENT', label: 'Pagamento', color: 'bg-amber-100 text-amber-800', icon: Banknote },
  { id: 'WAITING_APPROVAL', label: 'Aprovação', color: 'bg-indigo-100 text-indigo-800', icon: Clock },
  { id: 'APPROVED', label: 'Aprovada', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { id: 'CONVERTED', label: 'Convertida (Matriculado)', color: 'bg-emerald-100 text-emerald-800', icon: GraduationCap },
  { id: 'CANCELLED', label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: XCircle }
];

export function AdminPreEnrollmentsView() {
  const [items, setItems] = useState<PreEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/pre-enrollments');
      if (!res.ok) throw new Error('Falha ao buscar pré-matrículas');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      toast.error('Erro ao buscar dadas');
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (id: string, newStage: PreEnrollmentStage) => {
    try {
      setItems(prev => prev.map(i => i.id === id ? { ...i, stage: newStage } : i));
      const res = await fetch(`/api/admin/pre-enrollments/${id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage })
      });
      if (!res.ok) throw new Error('Falha ao atualizar');
      toast.success('Fase atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar fase');
      fetchItems(); // rollback
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('itemId', id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stage: PreEnrollmentStage) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (!itemId) return;
    
    const item = items.find(i => i.id === itemId);
    if (item && item.stage !== stage) {
      updateStage(itemId, stage);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.cpf && i.cpf.includes(searchTerm))
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Funil de Admissão
          </h1>
          <p className="text-gray-500 mt-1">Acompanhe as inscrições até a matrícula</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar por nome, email, cpf..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 animate-pulse">Carregando inscrições...</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 snap-x">
          {STAGES.map(stage => {
            const columnItems = filteredItems.filter(i => i.stage === stage.id);
            const Icon = stage.icon;
            return (
              <div 
                key={stage.id} 
                className="flex flex-col min-w-[340px] max-w-[340px] bg-gray-50/50 rounded-xl border border-gray-200 snap-center"
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${stage.color.split(' ')[1]}`} />
                    <h3 className="font-semibold text-gray-700">{stage.label}</h3>
                    <Badge variant="secondary" className="bg-white">{columnItems.length}</Badge>
                  </div>
                </div>

                {/* Column Content */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[500px]">
                  {columnItems.map(item => (
                    <div 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/admin/pre-matriculas/${item.id}`} className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </Link>
                        <Badge variant="outline" className={`ml-2 whitespace-nowrap ${item.slaDays > 5 ? 'text-red-600 border-red-200' : 'text-gray-500 border-gray-200'}`}>
                          SLA {item.slaDays}d
                        </Badge>
                      </div>
                      
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center text-xs text-gray-600 truncate">
                          <GraduationCap className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                          <span className="truncate" title={item.courseName}>{item.courseName}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <CheckCircle className={`w-3 h-3 mr-1.5 ${item.documentStatus === 'APPROVED' ? 'text-green-500' : 'text-gray-400'}`} />
                          Docs: {item.documentStatus}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Banknote className={`w-3 h-3 mr-1.5 ${item.paymentStatus === 'PAID' ? 'text-green-500' : 'text-gray-400'}`} />
                          Pagamento: {item.paymentStatus}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <span className="flex items-center" title="Data de Inscrição">
                          <Calendar className="w-3 h-3 mr-1.5" />
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <select 
                            className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none max-w-[100px] truncate"
                            value={item.stage}
                            onChange={(e) => updateStage(item.id, e.target.value as PreEnrollmentStage)}
                            title="Mover de fase"
                          >
                            {STAGES.map(s => (
                              <option key={s.id} value={s.id}>{s.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnItems.length === 0 && (
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-400">
                      Arrastar inscrição
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
