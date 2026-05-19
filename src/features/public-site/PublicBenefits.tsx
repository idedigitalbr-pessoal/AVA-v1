import { MonitorSmartphone, BookOpen, Users, Award } from 'lucide-react';

export function PublicBenefits() {
  const benefits = [
    {
      name: 'Plataforma Moderna',
      description: 'Estude de onde quiser com nosso AVA que se adapta a celulares, tablets e computadores.',
      icon: MonitorSmartphone,
    },
    {
      name: 'Material Atualizado',
      description: 'Conteúdo alinhado com as exigências do mercado de trabalho.',
      icon: BookOpen,
    },
    {
      name: 'Networking',
      description: 'Fóruns, trabalhos em grupo e contato direto com professores renomados.',
      icon: Users,
    },
    {
      name: 'Certificação Reconhecida',
      description: 'Diploma com o mesmo peso do presencial, com nota máxima no MEC.',
      icon: Award,
    },
  ];

  return (
    <div className="bg-slate-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-400">Excelência Acadêmica</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Por que estudar conosco?
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-300">
            Oferecemos uma estrutura digital completa para garantir sua melhor experiência de aprendizagem.
          </p>
        </div>
        <div className="mt-16 sm:mt-20 lg:mt-24 w-full">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/20">
                  <benefit.icon className="h-8 w-8 text-indigo-400" aria-hidden="true" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-white">
                  {benefit.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
