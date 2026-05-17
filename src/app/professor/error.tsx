"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfessorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Professor UI Error:", error);
  }, [error]);

  return (
    <div className="flex h-[80vh] items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-6 rounded-full bg-red-100 p-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Oops! Erro na página</h2>
          <p className="mb-8 text-sm text-slate-500">
            Ocorreu um erro ao carregar os dados desta página. Verifique sua conexão.
          </p>
          <Button onClick={() => reset()} className="w-full">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
