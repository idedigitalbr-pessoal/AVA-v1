'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/types/lead';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, User, Phone, Mail, Calendar, MessageSquare, CheckSquare, Target, Megaphone, Plus, Link as LinkIcon, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export function AdminLeadDetailView({ leadId }: { leadId: string }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [dateTask, setDateTask] = useState('');

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`);
      if (!res.ok) throw new Error('Lead não encontrado');
      const data = await res.json();
      setLead(data);
    } catch (error) {
      toast.error('Erro ao carregar detalhes do lead');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteText }),
      });
      if (!res.ok) throw new Error('Erro ao adicionar nota');
      
      toast.success('Anotação adicionada');
      setNoteText('');
      fetchLead(); // refresh
    } catch(err) {
      toast.error('Não foi possível adicionar a anotação');
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim() || !dateTask) return;

    try {
      const res = await fetch(`/api/admin/leads/${leadId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskText, dueDate: dateTask }),
      });
      if (!res.ok) throw new Error('Erro ao adicionar tarefa');
      
      toast.success('Tarefa programada com sucesso');
      setTaskText('');
      setDateTask('');
      fetchLead(); // refresh
    } catch(err) {
      toast.error('Não foi possível programar a tarefa');
    }
  };

  const handleConvertToPreEnrollment = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/convert-to-pre-enrollment`, { method: 'POST' });
      if(!res.ok) throw new Error();
      
      toast.success('Lead convertido em pré-matrícula com sucesso!');
      fetchLead();
    } catch(err) {
      toast.error('Erro ao converter lead');
    }
  };

  if (loading) return <div className="p-6 text-center animate-pulse text-gray-500">Carregando detalhes...</div>;
  if (!lead) return <div className="p-6 text-center text-red-500">Lead não encontrado.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="-ml-3">
            <Link href="/admin/leads"><ChevronLeft className="w-5 h-5" /></Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Lead: {lead.name}</h1>
          <Badge className={`ml-2 ${lead.stage === 'CONVERTED' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800'}`}>
            {lead.stage}
          </Badge>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast.info('Ação para marcar como perdido')}>Marcar como Perdido</Button>
          {lead.stage !== 'CONVERTED' && (
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleConvertToPreEnrollment}>
              Converter em Pré-Matrícula
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
                Dados do Lead
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Nome Completo</Label>
                <div className="font-semibold text-gray-900">{lead.name}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 block">Contato</Label>
                <div className="flex items-center text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md">
                  <Phone className="w-4 h-4 mr-2 text-indigo-500" /> {lead.phone || 'Não informado'}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 bg-gray-50 p-2 rounded-md">
                  <Mail className="w-4 h-4 mr-2 text-indigo-500" /> {lead.email}
                </div>
              </div>
              <div>
                 <Label className="text-xs text-gray-500 mb-1 block">Criado em</Label>
                 <div className="text-sm text-gray-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400"/> {new Date(lead.createdAt).toLocaleString('pt-BR')}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 px-5 border-b bg-gray-50/50">
              <CardTitle className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                Interesse Comercial
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Curso(s) de Interesse</Label>
                <div className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-2.5 rounded-md border border-indigo-100">
                  {lead.interestedCourseId ? `Course ID: ${lead.interestedCourseId}` : 'Geral'}
                </div>
              </div>
              <div>
                 <Label className="text-xs text-gray-500 mb-1 block">Origem / Canal</Label>
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><LinkIcon className="w-4 h-4 text-gray-500"/></div>
                   <span className="text-sm text-gray-700 font-medium">{lead.source}</span>
                 </div>
              </div>
              {lead.campaignId && (
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Campanha Atribuída</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center"><Megaphone className="w-4 h-4 text-yellow-600"/></div>
                    <span className="text-sm text-gray-700 font-medium">{lead.campaignId}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interaction History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notes and Tasks Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm border-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <CardHeader className="py-3 px-4">
                 <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <MessageSquare className="w-4 h-4 text-indigo-500"/> Nova Anotação
                 </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <form onSubmit={handleAddNote} className="space-y-3">
                  <Textarea 
                    placeholder="Registre o que foi conversado..." 
                    className="h-20 resize-none text-sm bg-gray-50"
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700">Salvar Anotação</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <CardHeader className="py-3 px-4">
                 <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-2">
                   <CheckSquare className="w-4 h-4 text-blue-500"/> Agendar Tarefa / Follow-up
                 </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <form onSubmit={handleAddTask} className="space-y-3">
                  <Input 
                    placeholder="O que precisa ser feito?" 
                    className="text-sm"
                    value={taskText}
                    onChange={e => setTaskText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Input 
                      type="datetime-local" 
                      className="text-sm text-gray-600 w-full"
                      value={dateTask}
                      onChange={e => setDateTask(e.target.value)}
                    />
                    <Button type="submit" size="sm" className="shrink-0 bg-blue-600 hover:bg-blue-700">Programar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Timeline / History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b bg-gray-50/50">
               <CardTitle className="text-base font-bold text-gray-800">Histórico de Interações</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               {(!lead.notes || lead.notes.length === 0) && (!lead.tasks || lead.tasks.length === 0) ? (
                 <div className="p-8 text-center text-gray-500 text-sm flex flex-col items-center">
                   <AlertCircle className="w-8 h-8 text-gray-300 mb-2" />
                   Nenhuma interação registrada até o momento.
                 </div>
               ) : (
                 <div className="relative pl-8 pr-4 py-6">
                   <div className="absolute top-6 bottom-6 left-[23px] w-px bg-gray-200"></div>
                   <div className="space-y-6">
                     {/* For simplification, only iterating mock notes natively. In real-world, intertwine notes+tasks ordered by date */}
                     {lead.notes?.map(note => (
                       <div key={note.id} className="relative">
                         <div className="absolute -left-[29px] top-1 w-6 h-6 bg-indigo-100 rounded-full border-2 border-white flex items-center justify-center">
                           <MessageSquare className="w-3 h-3 text-indigo-600" />
                         </div>
                         <div className="bg-white border rounded-lg p-3 shadow-sm">
                           <div className="flex justify-between items-center mb-2">
                             <div className="text-sm font-semibold text-gray-900">{note.authorName} <span className="font-normal text-gray-500">adicionou uma anotação</span></div>
                             <div className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString('pt-BR')}</div>
                           </div>
                           <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                         </div>
                       </div>
                     ))}
                     {lead.tasks?.map(task => (
                       <div key={task.id} className="relative">
                         <div className="absolute -left-[29px] top-1 w-6 h-6 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center">
                           <CheckSquare className="w-3 h-3 text-blue-600" />
                         </div>
                         <div className="bg-white border rounded-lg p-3 shadow-sm border-blue-50">
                           <div className="flex justify-between items-center mb-2">
                             <div className="text-sm font-semibold text-gray-900">Tarefa: {task.title}</div>
                             <Badge variant={task.isCompleted ? 'secondary' : 'default'} className={task.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                               {task.isCompleted ? 'Concluída' : 'Pendente'}
                             </Badge>
                           </div>
                           <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5" /> Programada para: {new Date(task.dueDate).toLocaleString('pt-BR')}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
