"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Reply, Search, Megaphone, CheckCircle, Send, X } from "lucide-react";
import { TeacherCommunicationData, TeacherMessageThread, ClassAnnouncement } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ApiService } from "@/lib/api";

type Tab = 'INBOX' | 'ANNOUNCEMENTS';

export function TeacherCourseMessages({ classSubjectId, initialData }: { classSubjectId: string, initialData: TeacherCommunicationData }) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<Tab>('INBOX');
  const [searchTerm, setSearchTerm] = useState("");
  
  // States para Inbox
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  
  // States para Announcements
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnContent, setNewAnnContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // States para Mensagem para a turma
  const [showClassMessage, setShowClassMessage] = useState(false);
  const [classMsgSubject, setClassMsgSubject] = useState("");
  const [classMsgContent, setClassMsgContent] = useState("");

  const handleReply = async () => {
    if (!activeThreadId || !replyText.trim()) return;
    setIsReplying(true);
    try {
      const payload = { content: replyText };
      await ApiService.teachers.replyMessage(activeThreadId, payload);
      
      setData(prev => {
        const newThreads = prev.threads.map(t => {
          if (t.id === activeThreadId) {
            return {
              ...t,
              status: 'REPLIED' as const,
              lastMessageDate: new Date().toISOString(),
              messages: [
                ...t.messages,
                {
                  id: Date.now().toString(),
                  senderId: 'me',
                  senderName: 'Você',
                  senderRole: 'TEACHER' as const,
                  content: replyText,
                  date: new Date().toISOString()
                }
              ]
            }
          }
          return t;
        });
        return { ...prev, threads: newThreads };
      });
      setReplyText("");
      toast.success("Resposta enviada com sucesso.");
    } catch(err) {
      toast.error("Erro ao enviar resposta.");
    } finally {
      setIsReplying(false);
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!newAnnTitle.trim() || !newAnnContent.trim()) {
      toast.error("Preencha o título e o conteúdo.");
      return;
    }
    setIsPosting(true);
    try {
      const payload = { title: newAnnTitle, content: newAnnContent, authorName: 'Você' };
      const created = await ApiService.teachers.createClassAnnouncement(classSubjectId, payload);
      
      setData(prev => ({
        ...prev,
        announcements: [created, ...prev.announcements]
      }));
      setNewAnnTitle("");
      setNewAnnContent("");
      setShowNewAnnouncement(false);
      toast.success("Aviso publicado no mural da disciplina.");
    } catch(e) {
      toast.error("Erro ao publicar aviso.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleSendClassMessage = async () => {
    if (!classMsgSubject.trim() || !classMsgContent.trim()) {
      toast.error("Preencha o assunto e o conteúdo.");
      return;
    }
    setIsPosting(true);
    try {
      const payload = { subject: classMsgSubject, content: classMsgContent };
      await ApiService.teachers.sendClassMessage(classSubjectId, payload);
      
      setClassMsgSubject("");
      setClassMsgContent("");
      setShowClassMessage(false);
      toast.success("Mensagem enviada para todos os alunos da turma.");
    } catch(e) {
      toast.error("Erro ao enviar mensagem.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleMarkAsRead = async (threadId: string) => {
    try {
      await ApiService.teachers.markMessageAsRead(threadId);
      setData(prev => ({
        ...prev,
        threads: prev.threads.map(t => t.id === threadId && t.status === 'UNREAD' ? { ...t, status: 'WAITING_STUDENT' } : t)
      }));
    } catch(e) {
      // abort
    }
  };

  const openThread = (thread: TeacherMessageThread) => {
    setActiveThreadId(thread.id);
    if(thread.status === 'UNREAD') {
      void handleMarkAsRead(thread.id);
    }
  };

  const filteredThreads = data.threads.filter(t => 
    t.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a,b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());

  const activeThread = activeThreadId ? data.threads.find(t => t.id === activeThreadId) : null;
  const unreadCount = data.threads.filter(t => t.status === 'UNREAD').length;

  return (
    <div className="flex flex-col h-[800px] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-slate-800">
      
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold tracking-tight">Comunicação</h2>
          <div className="flex gap-1 bg-slate-200/50 p-1 rounded-lg">
            <button 
              onClick={() => {setActiveTab('INBOX'); setActiveThreadId(null);}} 
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'INBOX' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Caixa de Entrada {unreadCount > 0 && <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
            </button>
            <button 
              onClick={() => setActiveTab('ANNOUNCEMENTS')} 
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'ANNOUNCEMENTS' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Mural de Avisos
            </button>
          </div>
        </div>
        <div className="flex gap-2">
           <Button size="sm" onClick={() => setShowClassMessage(true)} className="bg-indigo-600 hover:bg-indigo-700">
            <Send className="mr-2 h-4 w-4" /> Enviar Mensagem para Turma
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {activeTab === 'INBOX' && (
          <>
            <div className={`w-full lg:w-1/3 border-r border-slate-200 flex flex-col ${activeThreadId ? 'hidden lg:flex' : 'flex'}`}>
              <div className="p-4 border-b border-slate-200">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Buscar aluno ou assunto..." 
                    className="pl-9 bg-slate-50 border-slate-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredThreads.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">Nenhuma mensagem encontrada.</div>
                ) : (
                  filteredThreads.map(t => (
                    <button 
                      key={t.id}
                      onClick={() => openThread(t)}
                      className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${activeThreadId === t.id ? 'bg-indigo-50 hover:bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm truncate pr-2" style={{ color: t.status === 'UNREAD' ? '#0f172a' : '#475569' }}>
                          {t.studentName}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(t.lastMessageDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={`text-sm truncate mb-2 ${t.status === 'UNREAD' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                        {t.subject}
                      </div>
                      <div className="flex gap-2">
                        {t.status === 'UNREAD' && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NOVA</span>}
                        {t.status === 'REPLIED' && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">RESPONDIDA</span>}
                        {t.status === 'WAITING_STUDENT' && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">LIDA</span>}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className={`flex-1 flex flex-col bg-slate-50 ${!activeThreadId ? 'hidden lg:flex' : 'flex'}`}>
              {activeThread ? (
                <>
                  <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{activeThread.subject}</h3>
                      <p className="text-sm text-slate-500">Com: <span className="font-medium text-slate-700">{activeThread.studentName}</span></p>
                    </div>
                    <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setActiveThreadId(null)}>
                      Voltar
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeThread.messages.map(msg => {
                      const isMe = msg.senderRole === 'TEACHER';
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1.5 font-medium">
                            {new Date(msg.date).toLocaleString()} • {msg.senderName}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="p-4 bg-white border-t border-slate-200">
                    <Textarea 
                      placeholder="Escreva sua resposta..." 
                      className="min-h-[100px] mb-3 bg-slate-50 border-slate-200"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleReply} disabled={isReplying || !replyText.trim()} className="bg-indigo-600 hover:bg-indigo-700">
                        {isReplying ? "Enviando..." : <><Reply className="w-4 h-4 mr-2"/> Enviar Resposta</>}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                  <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                  <p>Selecione uma conversa para visualizar.</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'ANNOUNCEMENTS' && (
          <div className="flex-1 flex flex-col p-6 bg-slate-50 overflow-y-auto w-full">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">Mural da Disciplina</h3>
                <Button onClick={() => setShowNewAnnouncement(true)} variant="outline" className="bg-white">
                  <Megaphone className="w-4 h-4 mr-2"/> Publicar Novo Aviso
                </Button>
              </div>

              {showNewAnnouncement && (
                <div className="bg-white p-5 rounded-xl border border-indigo-200 shadow-sm relative">
                  <button onClick={() => setShowNewAnnouncement(false)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5"/>
                  </button>
                  <h4 className="font-bold text-slate-800 mb-4">Novo Aviso para o Mural</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Título</label>
                      <Input value={newAnnTitle} onChange={e=>setNewAnnTitle(e.target.value)} placeholder="Ex: Mudança na data da prova" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Conteúdo</label>
                      <Textarea value={newAnnContent} onChange={e=>setNewAnnContent(e.target.value)} placeholder="Detalhes do aviso..." className="h-24" />
                    </div>
                    <div className="flex justify-end">
                       <Button onClick={handleCreateAnnouncement} disabled={isPosting} className="bg-indigo-600">
                         {isPosting ? 'Publicando...' : 'Publicar Agora'}
                       </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {data.announcements.map(ann => (
                  <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full h-fit text-indigo-600">
                      <Megaphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-lg text-slate-900">{ann.title}</h4>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{new Date(ann.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap mt-2 text-sm">{ann.content}</p>
                      <div className="text-xs text-indigo-600 font-medium mt-3">
                        Publicado por {ann.authorName}
                      </div>
                    </div>
                  </div>
                ))}
                {data.announcements.length === 0 && (
                  <div className="text-center py-12 text-slate-500">Nenhum aviso publicado.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showClassMessage && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-lg text-slate-800">Mensagem para a Turma</h3>
               <button onClick={() => setShowClassMessage(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
             </div>
             <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500 mb-4">Esta mensagem será enviada individualmente para a caixa de entrada de todos os alunos matriculados.</p>
                <div>
                  <label className="text-sm font-medium mb-1 block">Assunto</label>
                  <Input value={classMsgSubject} onChange={e=>setClassMsgSubject(e.target.value)} placeholder="Ex: Material complementar da aula de hoje" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Mensagem</label>
                  <Textarea value={classMsgContent} onChange={e=>setClassMsgContent(e.target.value)} placeholder="Escreva a mensagem..." className="h-32" />
                </div>
             </div>
             <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowClassMessage(false)}>Cancelar</Button>
                <Button onClick={handleSendClassMessage} disabled={isPosting} className="bg-indigo-600">
                  <Send className="w-4 h-4 mr-2"/> Enviar para Todos
                </Button>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}
