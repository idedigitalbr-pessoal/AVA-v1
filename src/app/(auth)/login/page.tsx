import Link from "next/link";
import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-600">AVA Acadêmica</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm 
          loginTitle="Acesso Restrito" 
          loginSubtitle="Portal para Professores, Coordenadores e Secretaria"
          defaultRole="PROFESSOR"
          forgotPasswordLink="/forgot-password"
        />
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
