"use client";

import { Attachment } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Link as LinkIcon, Paperclip, Plus, Trash2, Video, UploadCloud } from "lucide-react";
import { useState, useRef } from "react";

interface MaterialListProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
}

export function MaterialList({ attachments, onChange }: MaterialListProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<'PDF' | 'LINK' | 'VIDEO' | 'FILE'>('LINK');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMaterial = () => {
    if (!name || (!url && type === 'LINK')) return;
    
    // Simulate url if missing (for files)
    const finalUrl = url || `https://storage.ava.com/mock/${Date.now()}`;

    const newAttachment: Attachment = {
      id: Date.now().toString(),
      name,
      url: finalUrl,
      type
    };
    
    onChange([...attachments, newAttachment]);
    setName("");
    setUrl("");
  };

  const removeMaterial = (id: string) => {
    onChange(attachments.filter(a => a.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-500" />;
      case 'LINK': return <LinkIcon className="h-4 w-4 text-blue-500" />;
      case 'VIDEO': return <Video className="h-4 w-4 text-indigo-500" />;
      default: return <Paperclip className="h-4 w-4 text-slate-500" />;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setName(file.name);
      
      if (file.type.includes('pdf')) {
        setType('PDF');
      } else if (file.type.includes('video')) {
        setType('VIDEO');
      } else {
        setType('FILE');
      }
      
      // Simulate file upload url
      setUrl(`https://mock-storage.edu/${file.name}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="space-y-1.5 flex-1 w-full">
          <label className="text-xs font-semibold text-slate-700">Título do Material</label>
          <Input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Ex: Slides da Aula" 
            className="h-9"
          />
        </div>
        
        <div className="space-y-1.5 flex-1 w-full relative">
          <label className="text-xs font-semibold text-slate-700">URL ou Upload</label>
          <div className="flex gap-2">
            <Input 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
              placeholder="https://..." 
              className="h-9"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="shrink-0 h-9 w-9 text-slate-500"
              onClick={() => fileInputRef.current?.click()}
              title="Fazer Upload de Arquivo"
            >
              <UploadCloud className="h-4 w-4" />
            </Button>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.mp4,.doc,.docx,.ppt,.pptx,.zip"
            />
          </div>
        </div>
        <div className="space-y-1.5 w-full sm:w-32">
          <label className="text-xs font-semibold text-slate-700">Tipo</label>
          <select 
            value={type} 
            onChange={e => setType(e.target.value as any)}
            className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="LINK">Link Útil</option>
            <option value="PDF">PDF</option>
            <option value="VIDEO">Vídeo Extra</option>
            <option value="FILE">Arquivo Geral</option>
          </select>
        </div>
        <Button onClick={addMaterial} className="w-full sm:w-auto h-9 bg-slate-900">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar
        </Button>
      </div>

      {attachments.length > 0 ? (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px]">Tipo</TableHead>
                <TableHead>Título</TableHead>
                <TableHead className="hidden sm:table-cell">URL</TableHead>
                <TableHead className="text-right w-[80px]">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attachments.map(att => (
                <TableRow key={att.id}>
                  <TableCell>{getIcon(att.type)}</TableCell>
                  <TableCell className="font-medium text-slate-700">{att.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-slate-500 text-xs truncate max-w-[200px]">{att.url}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => removeMaterial(att.id)} variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-6 border border-slate-200 border-dashed rounded-lg bg-slate-50/50 text-slate-400 text-sm">
          Nenhum material complementar adicionado.
        </div>
      )}
    </div>
  );
}
