"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lesson } from "@/types";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MaterialManager } from "./MaterialManager";

const lessonSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  content: z.string().optional(),
  videoUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  duration: z.number().min(0, "A duração não pode ser negativa"),
  isMandatory: z.boolean(),
  releaseDate: z.string().optional().or(z.literal("")),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: Lesson;
  onSubmit: (data: Partial<Lesson>) => void;
}

export function LessonFormDrawer({ isOpen, onClose, lesson, onSubmit }: LessonFormDrawerProps) {
  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      videoUrl: "",
      duration: 0,
      isMandatory: false,
      releaseDate: "",
    },
  });

  useEffect(() => {
    if (lesson && isOpen) {
      form.reset({
        title: lesson.title,
        content: lesson.content || "",
        videoUrl: lesson.videoUrl || "",
        duration: lesson.duration || 0,
        isMandatory: lesson.isMandatory ?? false,
        releaseDate: lesson.releaseDate || "",
      });
    } else if (isOpen) {
      form.reset({
        title: "",
        content: "",
        videoUrl: "",
        duration: 0,
        isMandatory: false,
        releaseDate: "",
      });
    }
  }, [lesson, isOpen, form]);

  const handleSubmit = (data: LessonFormValues) => {
    onSubmit(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-xl w-full flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-slate-100">
          <SheetTitle>{lesson ? "Editar Aula" : "Nova Aula"}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          <Form {...form}>
            <form id="lesson-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Aula</FormLabel>
                    <FormControl><Input placeholder="Ex: Introdução ao conceito..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (minutos)</FormLabel>
                      <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="releaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Liberação (Opcional)</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isMandatory"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Aula Obrigatória</FormLabel>
                      <p className="text-sm text-slate-500">
                        O aluno deve concluir esta aula para prosseguir.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL do Vídeo Principal (Vimeo, YouTube, etc)</FormLabel>
                    <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo Descritivo / Texto Base</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Escreva o texto de apoio da aula..." 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {lesson && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Materiais Complementares</h3>
              <MaterialManager lessonId={lesson.id} initialMaterials={lesson.materials || []} />
            </div>
          )}
        </ScrollArea>

        <SheetFooter className="p-6 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" form="lesson-form">Salvar Aula</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
