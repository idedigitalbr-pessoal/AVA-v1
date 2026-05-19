import { GraduationCap, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function EntryMethodsSection() {
  const methods = [
    {
      title: 'Vestibular Online',
      description: 'Faça a prova sem sair de casa e receba o resultado em até 48 horas.',
      icon: GraduationCap,
      href: '/inscricao?tipo=vestibular'
    },
    {
      title: 'Nota do ENEM',
      description: 'Use sua nota dos últimos 5 anos e ganhe bolsas de até 100%.',
      icon: FileText,
      href: '/inscricao?tipo=enem'
    },
    {
      title: 'Transferência / 2ª Graduação',
      description: 'Condições especiais e análise de grade imediata.',
      icon: ArrowRight,
      href: '/inscricao?tipo=transferencia'
    },
    {
      title: 'Pós-graduação',
      description: 'Ingresso direto com apresentação do diploma de nível superior.',
      icon: CheckCircle2,
      href: '/inscricao?tipo=pos'
    }
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Formas de Ingresso</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Escolha a melhor maneira de começar sua jornada conosco.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((method, index) => (
            <Card key={index} className="h-full border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 mb-6 font-normal">
                  {method.description}
                </CardDescription>
                <Link href={method.href} className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center gap-1">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
