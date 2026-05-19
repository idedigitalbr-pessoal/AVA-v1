'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PublicPreEnrollmentPayload, EntryMethod } from '@/types/pre-enrollment';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

export function EnrollmentForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<{id: string; title: string}[]>([]);

  const [formData, setFormData] = useState<Partial<PublicPreEnrollmentPayload>>({
    format: 'ONLINE',
    entryMethod: 'ONLINE_TEST',
    lgpdAccepted: false
  });

  useEffect(() => {
    // Fake fetch courses for dropdown
    fetch('/api/public/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (field: keyof PublicPreEnrollmentPayload, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.courseId) return toast.error('Selecione um curso');
    if (step === 2 && (!formData.name || !formData.cpf || !formData.birthDate)) return toast.error('Preencha os dados obrigatórios');
    if (step === 3 && !formData.entryMethod) return toast.error('Selecione a forma de ingresso');
    if (step === 4 && (!formData.email || !formData.phone)) return toast.error('Preencha os contatos obrigatórios');
    
    setStep(s => Math.min(5, s + 1));
  };

  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async () => {
    if (!formData.lgpdAccepted) return toast.error('Você deve aceitar os termos.');
    setLoading(true);
    
    try {
      const res = await fetch('/api/public/pre-enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Falha no envio');
      
      router.push('/inscricao/sucesso');
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar sua inscrição.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border-0 overflow-hidden">
      <div className="bg-indigo-600 px-6 py-8 sm:p-10 text-center text-white relative">
        <h2 className="text-3xl font-extrabold tracking-tight">Faça sua Inscrição</h2>
        <p className="opacity-90 mt-2 font-medium">Garanta sua vaga hoje e transforme seu futuro</p>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-indigo-800 w-full">
          <div className="h-full bg-indigo-300 transition-all duration-300" style={{ width: `${(step / 5) * 100}%`}}></div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-10">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">1. O que você quer estudar?</h3>
            
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Selecione o Curso</Label>
              <Select onValueChange={(val) => handleChange('courseId', val)} value={formData.courseId}>
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Escolha um curso..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                  ))}
                  {courses.length === 0 && <SelectItem value="course-1">Sistemas de Informação</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Modalidade</Label>
              <Select onValueChange={(val) => handleChange('format', val)} value={formData.format}>
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">100% Online</SelectItem>
                  <SelectItem value="HYBRID">Híbrido</SelectItem>
                  <SelectItem value="IN_PERSON">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">2. Seus Dados Pessoais</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 block mb-1.5">Nome Completo</Label>
                <Input className="h-12 bg-gray-50 border-gray-200" placeholder="Digite seu nome" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 block mb-1.5">CPF</Label>
                  <Input className="h-12 bg-gray-50 border-gray-200" placeholder="000.000.000-00" value={formData.cpf || ''} onChange={e => handleChange('cpf', e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 block mb-1.5">Data de Nascimento</Label>
                  <Input type="date" className="h-12 bg-gray-50 border-gray-200" value={formData.birthDate || ''} onChange={e => handleChange('birthDate', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">3. Forma de Ingresso</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'ONLINE_TEST', label: 'Vestibular Online', tip: 'Faça a prova agora ou agende' },
                { id: 'ENEM', label: 'Nota do ENEM', tip: 'Use sua nota e ganhe descontos' },
                { id: 'TRANSFER', label: 'Transferência', tip: 'Venha de outra instituição' },
                { id: 'SECOND_DEGREE', label: '2ª Graduação', tip: 'Para quem já é formado' },
                { id: 'SIMPLIFIED', label: 'Ingresso Simplificado', tip: 'Análise de currículo' }
              ].map(method => (
                <div 
                  key={method.id}
                  onClick={() => handleChange('entryMethod', method.id)}
                  className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${formData.entryMethod === method.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                >
                  <div className="font-bold text-gray-900">{method.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{method.tip}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">4. Como falar com você?</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 block mb-1.5">E-mail</Label>
                <Input type="email" className="h-12 bg-gray-50 border-gray-200" placeholder="seu@email.com" value={formData.email || ''} onChange={e => handleChange('email', e.target.value)} />
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700 block mb-1.5">WhatsApp / Telefone</Label>
                <Input className="h-12 bg-gray-50 border-gray-200" placeholder="(00) 00000-0000" value={formData.phone || ''} onChange={e => handleChange('phone', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 block mb-1.5">Cidade</Label>
                  <Input className="h-12 bg-gray-50 border-gray-200" placeholder="Ex: São Paulo" value={formData.city || ''} onChange={e => handleChange('city', e.target.value)} />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 block mb-1.5">Estado (UF)</Label>
                  <Input className="h-12 bg-gray-50 border-gray-200" placeholder="SP" value={formData.state || ''} onChange={e => handleChange('state', e.target.value)} maxLength={2} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in slide-in-from-right fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">5. Confirme seus dados</h3>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Nome</div>
                  <div className="text-gray-900">{formData.name}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">CPF</div>
                  <div className="text-gray-900">{formData.cpf}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Contato</div>
                  <div className="text-gray-900">{formData.phone}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold mb-1">Forma de Ingresso</div>
                  <div className="text-gray-900">{formData.entryMethod}</div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-8">
              <Checkbox id="terms" checked={formData.lgpdAccepted} onCheckedChange={(c) => handleChange('lgpdAccepted', !!c)} />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-snug cursor-pointer">
                Li e aceito os <a href="#" className="text-indigo-600 hover:underline">Termos de Uso</a> e a <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>. Autorizo o contato via WhatsApp e e-mail.
              </Label>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-6 sm:px-10 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        {step > 1 ? (
          <Button variant="ghost" onClick={prevStep} className="font-semibold text-gray-500 hover:text-gray-900">Voltar</Button>
        ) : <div></div>}

        {step < 5 ? (
          <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 h-11 px-8 shadow-md">Próximo Passo</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading || !formData.lgpdAccepted} className="bg-green-600 hover:bg-green-700 h-11 px-8 shadow-md font-bold text-white">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Concluindo...</> : 'Finalizar Inscrição'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
