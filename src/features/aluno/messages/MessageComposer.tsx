"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";

interface MessageComposerProps {
  onSend: (text: string) => void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200 shrink-0 relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-full">
        <Input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escreva sua mensagem..."
          className="flex-1 min-w-0 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-full px-4 h-11"
        />
        <Button 
          type="submit" 
          disabled={!text.trim()} 
          size="icon"
          className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 shrink-0 shadow-sm"
        >
          <SendHorizonal className="w-5 h-5 -ml-0.5" />
        </Button>
      </form>
    </div>
  );
}
