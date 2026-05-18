"use client";

import { useState, useEffect } from "react";
import { StudyStep } from "./types";
import { mockStudySteps as MOCK_STEPS } from "@/mocks/student.mock";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Laptop, BookOpen, PlayCircle, FileText, CheckSquare, 
  BarChart2, CalendarDays, Headset, BrainCircuit, CheckCircle2, Play
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StudyGuideManager() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Carregar progresso salvo
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      
      const saved = localStorage.getItem("study_guide_progress");
      if (saved) {
        try {
          setCompletedSteps(JSON.parse(saved));
        } catch (e) {
          console.error("Erro ao carregar progresso", e);
        }
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const progressPercent = Math.round((completedSteps.length / MOCK_STEPS.length) * 100);

  const toggleStep = (id: string) => {
    const isCompleted = completedSteps.includes(id);
    const updated = isCompleted 
      ? completedSteps.filter(stepId => stepId !== id)
      : [...completedSteps, id];
      
    setCompletedSteps(updated);
    localStorage.setItem("study_guide_progress", JSON.stringify(updated));
  };

  const getIcon = (type: StudyStep["iconType"]) => {
    const props = { className: "w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" };
    switch (type) {
      case "laptop": return <Laptop {...props} />;
      case "book": return <BookOpen {...props} />;
      case "video": return <PlayCircle {...props} />;
      case "file": return <FileText {...props} />;
      case "check": return <CheckSquare {...props} />;
      case "chart": return <BarChart2 {...props} />;
      case "calendar": return <CalendarDays {...props} />;
      case "headset": return <Headset {...props} />;
      case "brain": return <BrainCircuit {...props} />;
    }
  };

  if (!mounted) return null; // Previne hydration mismatch

  return (
    <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto">
      
      {/* Onboarding Progress Header */}
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 sm:p-8 text-white relative flex flex-col justify-between">
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Seu Guia de Sucesso</h2>
              <p className="text-indigo-100 max-w-md text-sm sm:text-base leading-relaxed">
                Preparamos uma trilha rápida para que você tire o máximo de proveito da plataforma. Conclua todas as etapas para ganhar sua primeira conquista!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
              <span className="block text-3xl font-black text-white">{progressPercent}%</span>
              <span className="block text-xs uppercase font-bold tracking-wider text-indigo-100 mt-1">Concluído</span>
            </div>
          </div>
          
          <div className="mt-6 relative z-10">
            <Progress value={progressPercent} className="h-2.5 bg-white/20" />
            <div className="flex justify-between text-xs font-medium text-indigo-200 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Steps List */}
      <div className="space-y-4">
        {MOCK_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <Card key={step.id} className={`transition-all duration-300 border-2 ${isCompleted ? 'border-emerald-500/30 bg-emerald-50/20' : 'border-slate-100 hover:border-indigo-200 shadow-sm'}`}>
              <CardContent className="p-0 flex flex-col sm:flex-row">
                {/* Left side / Video trigger mockup */}
                <div className="sm:border-r border-slate-100 sm:w-1/3 shrink-0 bg-slate-50 p-6 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden group cursor-pointer group-hover:bg-slate-100">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'} transition-transform group-hover:scale-110 duration-500`}>
                    {getIcon(step.iconType)}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5 block">Etapa {index + 1}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full flex items-center justify-center gap-1 mx-auto w-fit">
                      <Play className="w-3 h-3" /> {step.durationMinutes} min
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-slate-600">APERTAR O PLAY</span>
                  </div>
                </div>
                
                {/* Right side / Content */}
                <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`text-lg font-bold leading-tight ${isCompleted ? 'text-slate-500' : 'text-slate-900'}`}>{step.title}</h3>
                      {isCompleted && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shrink-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Concluído
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mb-4 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                      {step.description}
                    </p>
                    
                    <div className="bg-amber-50/50 border border-amber-100/50 rounded-lg p-4 mb-4">
                      <ul className="space-y-2">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                            <span className="bg-amber-200 w-1.5 h-1.5 rounded-full shrink-0 mr-2 mt-1.5"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button 
                      variant={isCompleted ? "outline" : "default"}
                      onClick={() => toggleStep(step.id)}
                      className={!isCompleted ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                    >
                      {isCompleted ? (
                        "Desmarcar conclusão"
                      ) : (
                        <><CheckCircle2 className="w-4 h-4 mr-2" /> Marcar como lido e concluído</>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {progressPercent === 100 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-emerald-900 mb-2">Você concluiu todo o onboarding!</h3>
          <p className="text-emerald-700 max-w-lg mx-auto">
            Parabéns! Agora você já sabe como tirar proveito de todos os recursos disponibilizados pela nossa plataforma. Bons estudos!
          </p>
        </div>
      )}
    </div>
  );
}
