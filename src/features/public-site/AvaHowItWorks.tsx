import { PlayCircle, FileCheck, MessageSquare } from 'lucide-react';

export function AvaHowItWorks() {
  return (
    <div className="overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Como funciona o AVA Acadêmica
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Nosso Ambiente Virtual de Aprendizagem foi pensado para maximizar seus estudos com ferramentas interativas e de fácil uso.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div className="relative pl-12">
                  <dt className="inline font-semibold text-gray-900">
                    <PlayCircle className="absolute left-1 top-1 h-6 w-6 text-indigo-600" aria-hidden="true" />
                    Aulas em Vídeo e Materiais
                  </dt>{' '}
                  <dd className="block mt-2">Assista às aulas quantas vezes quiser e acesse e-books, artigos e apresentações disponibilizados pelos professores.</dd>
                </div>
                <div className="relative pl-12">
                  <dt className="inline font-semibold text-gray-900">
                    <FileCheck className="absolute left-1 top-1 h-6 w-6 text-indigo-600" aria-hidden="true" />
                    Avaliações Online
                  </dt>{' '}
                  <dd className="block mt-2">Faça provas e quizzes de forma segura diretamente na plataforma, com recebimento de notas de forma rápida.</dd>
                </div>
                <div className="relative pl-12">
                  <dt className="inline font-semibold text-gray-900">
                    <MessageSquare className="absolute left-1 top-1 h-6 w-6 text-indigo-600" aria-hidden="true" />
                    Comunicação Direta
                  </dt>{' '}
                  <dd className="block mt-2">Tire dúvidas por meio de fóruns de discussão ou envie mensagens diretamente para professores e tutores.</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-indigo-600 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <div className="w-full aspect-[16/10] bg-zinc-800 rounded-tl-xl overflow-hidden border-t border-l border-zinc-700 relative flex items-center justify-center">
                  {/* Fake screenshot inside the frame */}
                  <div className="text-zinc-500 font-mono text-sm">Dashboard Aluno Preview</div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
