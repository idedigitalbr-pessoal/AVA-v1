"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CurriculumSubject, Subject } from "@/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrerequisiteSelector } from "./PrerequisiteSelector";

const subjectSchema = z.object({
  subjectId: z.string().min(1, "Selecione uma disciplina"),
  isMandatory: z.boolean(),
  workload: z.number().min(1, "Carga horária deve ser maior que zero"),
  prerequisites: z.array(z.string()),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface AddSubjectToCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  periodId: string;
  courseId: string;
  subject?: CurriculumSubject;
  availableSubjects: Subject[];
  allCurriculumSubjects: CurriculumSubject[];
  onSubmit: (data: Partial<CurriculumSubject>) => void;
}

export function AddSubjectToCurriculumModal({ 
  isOpen, onClose, periodId, courseId, subject, availableSubjects, allCurriculumSubjects, onSubmit 
}: AddSubjectToCurriculumModalProps) {
  
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subjectId: "",
      isMandatory: true,
      workload: 0,
      prerequisites: [],
    },
  });

  useEffect(() => {
    if (subject && isOpen) {
      form.reset({
        subjectId: subject.subjectId,
        isMandatory: subject.isMandatory,
        workload: subject.workload,
        prerequisites: subject.prerequisites || [],
      });
    } else if (isOpen) {
      form.reset({
        subjectId: "",
        isMandatory: true,
        workload: 0,
        prerequisites: [],
      });
    }
  }, [subject, isOpen, form]);

  const handleSubmit = (data: SubjectFormValues) => {
    // find the subject name and code from availableSubjects based on subjectId
    const baseSubject = availableSubjects.find(s => s.id === data.subjectId);
    
    if (!baseSubject) return;

    onSubmit({
      courseId,
      periodId,
      subjectId: data.subjectId,
      subjectName: baseSubject.name,
      subjectCode: baseSubject.code,
      isMandatory: data.isMandatory,
      workload: data.workload,
      prerequisites: data.prerequisites
    });
  };

  // When user selects a subject, we can auto-fill workload
  const handleSubjectSelect = (val: string | null) => {
    if (!val) return;
    form.setValue('subjectId', val);
    const s = availableSubjects.find(sub => sub.id === val);
    if (s && !subject) {
      form.setValue('workload', s.workload);
    }
  };

  const potentialPrereqs = allCurriculumSubjects.filter(s => s.id !== subject?.id);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{subject ? "Editar Vínculo da Disciplina" : "Vincular Disciplina"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="subject-matrix-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-2">
            
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disciplina Base</FormLabel>
                  <Select 
                    disabled={!!subject} // don't change base subject when editing
                    onValueChange={handleSubjectSelect} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disciplina do catálogo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableSubjects.map(s => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.code} - {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carga Horária (h)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isMandatory"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3 mt-1">
                    <FormLabel>Status</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span className="text-sm font-medium">{field.value ? 'Obrigatória' : 'Optativa'}</span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="prerequisites"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pré-requisitos</FormLabel>
                  <FormControl>
                    <PrerequisiteSelector 
                      selectedIds={field.value}
                      onChange={field.onChange}
                      availablePrereqs={potentialPrereqs}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
              <Button type="submit" form="subject-matrix-form">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
