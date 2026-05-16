"use client";

import { useEffect, useState } from "react";
import { Campaign } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Megaphone, Calendar, Video } from "lucide-react";
import Link from "next/link";

export function CampaignModal({ campaign }: { campaign: Campaign }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Basic logic to show modal if not dismissed previously
    const hasSeen = localStorage.getItem(`campaign_${campaign.id}`);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [campaign.id]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem(`campaign_${campaign.id}`, 'true');
  };

  const handleRemindLater = () => {
    setIsOpen(false);
    // Don't set localStorage, will show again on next mount/refresh
  };

  if (!campaign.important) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleRemindLater()}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0 border-0">
        <div className={`h-24 bg-gradient-to-r ${campaign.colorClass || 'from-indigo-600 to-purple-600'} flex items-center justify-center`}>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {campaign.type === 'EVENTO_AO_VIVO' ? <Video className="text-white w-6 h-6" /> : 
             campaign.type === 'PRAZO_ACADEMICO' ? <Calendar className="text-white w-6 h-6" /> : 
             <AlertCircle className="text-white w-6 h-6" />}
          </div>
        </div>
        
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{campaign.title}</DialogTitle>
            <DialogDescription className="text-slate-600 mt-2 text-base">
              {campaign.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-8 flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="ghost" onClick={handleRemindLater} className="text-slate-500">
              Lembrar depois
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDismiss}>
                Fechar
              </Button>
              <Link 
                href={campaign.actionUrl} 
                onClick={handleDismiss}
                className="inline-flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {campaign.actionText}
              </Link>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
