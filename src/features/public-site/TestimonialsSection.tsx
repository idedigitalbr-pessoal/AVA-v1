import { Testimonial } from '@/types';
import { Star } from 'lucide-react';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Histórias de Sucesso</h2>
          <p className="mt-4 text-lg text-gray-600">Veja o que nossos alunos dizem sobre seus resultados e carreira.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div>
                <div className="flex items-center gap-x-1 text-yellow-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <div className="mt-4 text-lg font-semibold leading-relaxed text-gray-900">&quot;{testimonial.content}&quot;</div>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                {testimonial.authorImageUrl ? (
                  <img src={testimonial.authorImageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                    {testimonial.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.authorName}</div>
                  {testimonial.authorRole && <div className="text-sm leading-6 text-gray-600">{testimonial.authorRole}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
