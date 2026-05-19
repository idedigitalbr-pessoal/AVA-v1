'use client';

import { FAQItem } from '@/types';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function PublicFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-white py-16 sm:py-24" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="pt-6">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  >
                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openId === faq.id ? (
                        <ChevronUp className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                {openId === faq.id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
