'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { publicLeadsService } from '@/lib/api/services/public-leads.service';
import { LeadForm } from '@/types';
import { toast } from 'sonner';

export function LeadCaptureForm({ formConfig }: { formConfig?: LeadForm }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {};
      
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      await publicLeadsService.submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: 'Landing Page Formulário Rápido',
        formId: formConfig?.id,
        stage: 'NEW',
      });
      
      toast.success(formConfig?.successMessage || 'Dados enviados com sucesso! Entraremos em contato em breve.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!formConfig) return null;

  return (
    <div className="bg-white px-6 py-12 sm:py-16 lg:px-8 border-t border-b border-gray-100">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{formConfig.title}</h2>
        {formConfig.description && (
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {formConfig.description}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl sm:mt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {formConfig.fields.map((field) => (
            <div key={field.id} className={field.type === 'TEXTAREA' ? 'sm:col-span-2' : ''}>
              <Label htmlFor={field.name} className="block text-sm font-semibold leading-6 text-gray-900">
                {field.label}
              </Label>
              <div className="mt-2 text-left">
                <Input
                  type={field.type === 'EMAIL' ? 'email' : 'text'}
                  name={field.name}
                  id={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg">
            {loading ? 'Enviando...' : formConfig.submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
