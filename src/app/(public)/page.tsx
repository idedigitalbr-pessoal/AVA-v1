import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 tracking-tight">AVA Acadêmica</span>
          </div>
          <nav className="flex space-x-2 sm:space-x-4 h-full items-center">
            <Link href="/" className="hidden sm:inline-block text-slate-600 hover:text-slate-900 text-sm font-medium">Home</Link>
            <Link href="#cursos" className="hidden sm:inline-block text-slate-600 hover:text-slate-900 text-sm font-medium">Cursos</Link>
            <Link href="/portal/aluno/login">
              <Button size="sm" className="sm:text-base sm:h-9">Área do Aluno</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              O futuro do aprendizado <br className="hidden md:block" />
              <span className="text-indigo-600">está ao seu alcance</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
              Acesse nosso Ambiente Virtual de Aprendizagem e conecte-se com professores e alunos de forma eficiente e moderna. Aprenda a qualquer hora, em qualquer lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Link href="/portal/aluno/login">
                <Button size="lg" className="w-full sm:w-auto">Acesso do Aluno</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Portal Administrativo / Professor</Button>
              </Link>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 max-w-lg mx-auto md:mx-0 text-sm md:text-left">
              <p className="font-bold text-indigo-900 mb-2">👋 Contas de Teste disponíveis (usar qualquer senha):</p>
              <ul className="text-indigo-800 space-y-1">
                <li><strong>Admin:</strong> admin@ava.edu.br</li>
                <li><strong>Professor:</strong> carlos@ava.edu.br</li>
                <li><strong>Aluno:</strong> ana@ava.edu.br</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Illustração ou Imagem da Plataforma</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
