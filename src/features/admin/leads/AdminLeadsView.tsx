'use client';

import { useState, useEffect } from 'react';
import { Lead, LeadStage } from '@/types/lead';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Phone, Mail, Clock, Search, MoreVertical, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'NEW', label: 'Novo lead', color: 'bg-blue-100 text-blue-800' },
  { id: 'CONTACT_ATTEMPT', label: 'Tentativa de contato', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'IN_SERVICE', label: 'Em atendimento', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'INTERESTED', label: 'Interessado', color: 'bg-purple-100 text-purple-800' },
  { id: 'NO_REPLY', label: 'Sem resposta', color: 'bg-gray-100 text-gray-800' },
  { id: 'CONVERTED', label: 'Pré-matrícula', color: 'bg-green-100 text-green-800' },
  { id: 'LOST', label: 'Perdido', color: 'bg-red-100 text-red-800' }
];

export function AdminLeadsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (!res.ok) throw new Error('Falha ao buscar leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      toast.error('Erro ao buscar leads');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStage = async (leadId: string, newStage: LeadStage) => {
    try {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
      const res = await fetch(`/api/admin/leads/${leadId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage })
      });
      if (!res.ok) throw new Error('Falha ao atualizar lead');
      toast.success('Fase atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar fase');
      fetchLeads(); // rollback
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, stage: LeadStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (!leadId) return;
    
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage !== stage) {
      updateLeadStage(leadId, stage);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.phone && l.phone.includes(searchTerm))
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Gestão de Leads (CRM)
          </h1>
          <p className="text-gray-500 mt-1">Acompanhe e converta interessados em alunos</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar por nome, email..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" /> Novo Lead
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 animate-pulse">Carregando leads...</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4 snap-x">
          {STAGES.map(stage => {
            const columnLeads = filteredLeads.filter(l => l.stage === stage.id);
            
            return (
              <div 
                key={stage.id} 
                className="flex flex-col min-w-[320px] max-w-[320px] bg-gray-50/50 rounded-xl border border-gray-200 snap-center"
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
              >
                {/* Column Header */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-700">{stage.label}</h3>
                    <Badge variant="secondary" className="bg-white">{columnLeads.length}</Badge>
                  </div>
                </div>

                {/* Column Content */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[500px]">
                  {columnLeads.map(lead => (
                    <div 
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/admin/leads/${lead.id}`} className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </Link>
                        <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-1.5 mb-3">
                        {lead.phone && (
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone className="w-3 h-3 mr-1.5 text-gray-400" />
                            {lead.phone}
                          </div>
                        )}
                        <div className="flex items-center text-xs text-gray-600 truncate">
                          <Mail className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                        {lead.interestedCourseId && (
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Interesse</span>
                            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm w-max">
                              Curso ID: {lead.interestedCourseId}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <span className="flex items-center" title="Última interação">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {new Date(lead.updatedAt).toLocaleDateString('pt-BR')}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {/* Quick Actions Dropdown representation */}
                          <select 
                            className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none"
                            value={lead.stage}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
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

                  {columnLeads.length === 0 && (
                    <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-400">
                      Arrastar lead
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
