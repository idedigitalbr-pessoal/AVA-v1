'use client';

import { useState } from 'react';
import { PublicCoursePage } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { publicLeadsService } from '@/lib/api/services/public-leads.service';
import { toast } from 'sonner';
import { FileText, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CourseSidebarForm({ course }: { course: PublicCoursePage }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInterest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await publicLeadsService.submitLead({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        interestedCourseId: course.courseId,
        source: 'Página do Curso Side Form',
        stage: 'NEW',
      });
      
      toast.success('Obrigado pelo seu interesse! Entraremos em contato muito em breve.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error('Erro ao enviar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleMatricula = () => {
    router.push(`/inscricao?curso=${course.slug}`);
  };

  return (
    <div className="space-y-6">
      {/* Preço e Matrícula */}
      <Card className="border-indigo-100 shadow-md">
        <CardHeader className="bg-indigo-50 border-b border-indigo-100 rounded-t-xl pb-4">
          <CardTitle className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
            Inscreva-se agora
          </CardTitle>
          <p className="text-sm text-indigo-700/80">Comece a estudar imediatamente</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {course.price && (
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Investimento</div>
              <div className="text-3xl font-extrabold text-gray-900">
                {course.installmentOptions || `R$ ${course.price.toFixed(2)}`}
              </div>
              {!course.installmentOptions && (
                <div className="text-sm text-gray-500 mt-1">à vista</div>
              )}
            </div>
          )}
          
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>Certificado reconhecido válido em todo o Brasil.</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-indigo-500/25 transition-all"
            onClick={handleMatricula}
          >
            Fazer Matrícula
          </Button>
        </CardFooter>
      </Card>

      {/* Formulário de Interesse */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">Ficou com dúvida?</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Receba o atendimento de nossos consultores educacionais e saiba mais detalhes sobre o curso.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInterest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sideName">Nome Completo</Label>
              <Input id="sideName" name="name" placeholder="Ex: Maria Clara" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sideEmail">E-mail</Label>
              <Input id="sideEmail" name="email" type="email" placeholder="seu@email.com" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sidePhone">WhatsApp</Label>
              <Input id="sidePhone" name="phone" placeholder="(11) 90000-0000" required />
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                Concordo em receber comunicações por WhatsApp e E-mail da instituição.
              </Label>
            </div>
            
            <Button type="submit" variant="outline" className="w-full mt-4" disabled={loading}>
              {loading ? 'Enviando...' : 'Quero Mais Informações'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
