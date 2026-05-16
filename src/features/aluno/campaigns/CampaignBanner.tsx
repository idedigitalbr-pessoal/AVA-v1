"use client";

import { Badge } from "@/components/ui/badge";
import { Campaign } from "./types";
import { ArrowRight, Megaphone, Video, Users, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (campaign.type) {
      case "EVENTO_AO_VIVO": return <Video className="w-5 h-5 text-white/80" />;
      case "CAMPANHA_INDICACAO": return <Users className="w-5 h-5 text-white/80" />;
      case "PRAZO_ACADEMICO": return <Calendar className="w-5 h-5 text-white/80" />;
      case "NOVIDADE_PORTAL": return <Sparkles className="w-5 h-5 text-white/80" />;
      default: return <Megaphone className="w-5 h-5 text-white/80" />;
    }
  };

  const getLabel = () => {
    switch (campaign.type) {
      case "EVENTO_AO_VIVO": return "Ao Vivo";
      case "CAMPANHA_INDICACAO": return "Indique amigos";
      case "PRAZO_ACADEMICO": return "Prazo Importante";
      case "NOVIDADE_PORTAL": return "Novidade";
      default: return "Comunicado";
    }
  };

  return (
    <div className={`bg-gradient-to-r ${campaign.colorClass || 'from-indigo-600 to-purple-600'} rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}>
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 flex items-center gap-1.5">
            {getIcon()}
            {getLabel()}
          </Badge>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-1">{campaign.title}</h3>
        <p className="text-white/80 text-sm max-w-xl">{campaign.description}</p>
      </div>

      <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
        <Link href={campaign.actionUrl} className="bg-white text-slate-900 hover:bg-slate-50 font-bold px-6 py-2.5 rounded-lg inline-flex items-center justify-center transition-colors">
          {campaign.actionText} <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-black/20 hover:bg-black/30 text-white font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
        >
          Dispensar
        </button>
      </div>

      <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-8 pointer-events-none"></div>
    </div>
  );
}
