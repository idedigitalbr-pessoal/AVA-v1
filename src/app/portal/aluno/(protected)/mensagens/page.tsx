import { MessageSquare } from "lucide-react";

export default function MensagensPage() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full text-center p-8 bg-slate-50/50">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-sm border border-slate-100">
        <MessageSquare className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-slate-700 mb-2">Central de Mensagens</h3>
      <p className="text-slate-500 max-w-md">
        Selecione uma conversa na lista ao lado para interagir com professores, coordenação ou suporte.
      </p>
    </div>
  );
}
