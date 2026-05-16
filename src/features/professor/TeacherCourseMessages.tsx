"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Reply } from "lucide-react";

export function TeacherCourseMessages({ courseId, messages }: { courseId: string, messages: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Mensagens dos Alunos</h2>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <MessageSquare className="mr-2 h-4 w-4" /> Enviar Mensagem para a Turma
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
             <div className="flex justify-between items-start mb-3">
                <div>
                   <h3 className="font-bold text-slate-900">{m.subject}</h3>
                   <p className="text-sm text-slate-500">{m.studentName}</p>
                </div>
                <div className="flex items-center text-xs text-slate-400">
                   <Calendar className="mr-1 h-3 w-3" /> {m.date}
                </div>
             </div>
             <p className="text-slate-700 text-sm mb-4">{m.content}</p>
             <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
               <Reply className="mr-2 h-4 w-4" /> Responder
             </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
