"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProtectedAlunosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[75vh] flex-col items-center justify-center p-6 text-center">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Erro ao carregar página</h2>
          <p className="mb-8 text-sm text-slate-500">
            Encontramos um problema ao tentar carregar esta seção. Você pode tentar novamente.
          </p>
          <Button onClick={() => reset()} className="w-full bg-indigo-600 hover:bg-indigo-700">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
