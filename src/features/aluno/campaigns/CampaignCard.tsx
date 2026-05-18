"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Campaign } from "./types";
import { ArrowRight, Megaphone, Video, Users, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (campaign.type) {
      case "EVENTO_AO_VIVO": return <Video className="w-4 h-4" />;
      case "CAMPANHA_INDICACAO": return <Users className="w-4 h-4" />;
      case "PRAZO_ACADEMICO": return <Calendar className="w-4 h-4" />;
      case "NOVIDADE_PORTAL": return <Sparkles className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`border-0 shadow-sm overflow-hidden relative group`}>
      {/* Accent Top Border */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${campaign.colorClass || 'from-slate-400 to-slate-500'}`} />
      
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors pointer-events-auto z-10"
        title="Ocultar painel"
      >
        <span className="sr-only">Fechar</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <CardContent className="p-5">
        <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-white bg-gradient-to-br ${campaign.colorClass || 'from-slate-400 to-slate-500'}`}>
          {getIcon()}
        </div>
        <h4 className="font-bold text-slate-800 leading-tight mb-1">{campaign.title}</h4>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{campaign.description}</p>
        
        <Link href={campaign.actionUrl || "#"} className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          {campaign.actionText} <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
