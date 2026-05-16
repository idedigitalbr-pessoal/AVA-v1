"use client";

import { useState } from "react";
import { LessonMaterial } from "@/types";
import { avaService } from "@/lib/api/services/ava.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Link as LinkIcon, PlayCircle, Trash2, Plus } from "lucide-react";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";

interface MaterialManagerProps {
  lessonId: string;
  initialMaterials: LessonMaterial[];
}

export function MaterialManager({ lessonId, initialMaterials }: MaterialManagerProps) {
  const [materials, setMaterials] = useState<LessonMaterial[]>(initialMaterials);
  const [isAdding, setIsAdding] = useState(false);
  const [newMaterial, setNewMaterial] = useState<{ title: string; type: LessonMaterial['type']; url: string }>({
    title: "",
    type: "PDF",
    url: ""
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newMaterial.title || !newMaterial.url) {
      toast.error("Preencha todos os campos do material");
      return;
    }

    try {
      setLoading(true);
      const added = await avaService.addLessonMaterial(lessonId, newMaterial);
      setMaterials([...materials, added]);
      setIsAdding(false);
      setNewMaterial({ title: "", type: "PDF", url: "" });
      toast.success("Material adicionado");
    } catch (e) {
      toast.error("Erro ao adicionar material");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await avaService.removeLessonMaterial(lessonId, id);
      setMaterials(materials.filter(m => m.id !== id));
      toast.success("Material removido");
    } catch (e) {
      toast.error("Erro ao remover material");
    }
  };

  return (
    <div className="space-y-4">
      {materials.length === 0 && !isAdding ? (
        <div className="text-center py-6 bg-slate-50 border border-slate-100 rounded-lg">
          <p className="text-sm text-slate-500 mb-3">Nenhum material complementar adicionado.</p>
          <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar Material
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {materials.map(mat => (
            <div key={mat.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-slate-400">
                  {mat.type === 'PDF' || mat.type === 'DOC' ? <FileText className="h-4 w-4" /> : 
                   mat.type === 'VIDEO' ? <PlayCircle className="h-4 w-4" /> : 
                   <LinkIcon className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{mat.title}</p>
                  <p className="text-xs text-slate-500 truncate w-48 sm:w-64">{mat.url}</p>
                </div>
              </div>
              <AdminConfirmDialog
                title="Remover Material"
                description={`Tem certeza que deseja remover "${mat.title}"?`}
                onConfirm={() => handleRemove(mat.id)}
              >
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-rose-500" />
                </Button>
              </AdminConfirmDialog>
            </div>
          ))}

          {!isAdding && (
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Material
            </Button>
          )}
        </div>
      )}

      {isAdding && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          <h4 className="text-sm font-medium text-slate-900">Novo Material</h4>
          
          <div className="grid gap-3">
            <Input 
              placeholder="Título" 
              value={newMaterial.title}
              onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })}
            />
            
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <Select 
                  value={newMaterial.type} 
                  onValueChange={(val: any) => setNewMaterial({ ...newMaterial, type: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOC">Documento</SelectItem>
                    <SelectItem value="VIDEO">Vídeo</SelectItem>
                    <SelectItem value="LINK">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Input 
                  placeholder="URL do arquivo ou link" 
                  value={newMaterial.url}
                  onChange={e => setNewMaterial({ ...newMaterial, url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>Cancelar</Button>
            <Button size="sm" onClick={handleAdd} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
