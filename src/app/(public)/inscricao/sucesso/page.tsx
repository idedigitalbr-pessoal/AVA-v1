import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicFooter } from '@/features/public-site/PublicFooter';
import { publicSiteService } from '@/lib/api/services/public-site.service';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function EnrollmentSuccessPage() {
  const settings = await publicSiteService.getSettings();
  const menuItems = await publicSiteService.getMenu();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Inscrição Concluída!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Recebemos seus dados com sucesso. Nossa equipe entrará em contato em breve pelo WhatsApp ou e-mail com os próximos passos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 font-semibold">
              <Link href="/">Voltar para Home</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 font-semibold">
              <Link href="/cursos">Explorar Cursos <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </main>
      
      <PublicFooter settings={settings} />
    </div>
  );
}
