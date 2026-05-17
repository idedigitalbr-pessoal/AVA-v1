"use client";

import { useState } from "react";
import { ApiService } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Send } from "lucide-react";

export function StudentMessageModal({
  classSubjectId,
  studentId,
  onClose
}: {
  classSubjectId: string;
  studentId: string;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("A mensagem não pode estar vazia.");
      return;
    }
    
    setIsSending(true);
    try {
      await ApiService.teachers.sendMessageToStudent(classSubjectId, studentId, { text: message });
      toast.success("Mensagem enviada com sucesso.");
      onClose();
    } catch {
      toast.error("Erro ao enviar mensagem.");
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Enviar Mensagem</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-slate-600 mb-3">A mensagem será enviada diretamente para o aluno via plataforma e notificação por e-mail.</p>
          <Textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem aqui..."
            className="h-32 resize-none"
          />
        </div>

        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSending}>Cancelar</Button>
          <Button onClick={handleSend} disabled={isSending} className="bg-indigo-600 hover:bg-indigo-700">
            <Send className="w-4 h-4 mr-2" /> Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
