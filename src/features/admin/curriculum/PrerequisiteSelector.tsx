"use client";

import { useState } from "react";
import { CurriculumSubject } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrerequisiteSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  availablePrereqs: CurriculumSubject[];
}

export function PrerequisiteSelector({ selectedIds, onChange, availablePrereqs }: PrerequisiteSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedSubjects = selectedIds.map(id => availablePrereqs.find(s => s.id === id)).filter(Boolean) as CurriculumSubject[];

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleRemove = (id: string) => {
    onChange(selectedIds.filter(i => i !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Selecione as disciplinas...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        } />
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar disciplina..." />
            <CommandList>
              <CommandEmpty>Nenhuma disciplina encontrada.</CommandEmpty>
              <CommandGroup>
                {availablePrereqs.map((subject) => (
                  <CommandItem
                    key={subject.id}
                    value={subject.subjectName}
                    onSelect={() => handleSelect(subject.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedIds.includes(subject.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {subject.subjectCode} - {subject.subjectName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSubjects.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSubjects.map(subject => (
            <Badge key={subject.id} variant="secondary" className="px-2 py-1 flex items-center gap-1">
              <span className="text-xs font-mono opacity-70">{subject.subjectCode}</span>
              {subject.subjectName}
              <button
                type="button"
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleRemove(subject.id)}
              >
                <X className="h-3 w-3 text-slate-500 hover:text-slate-900" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
