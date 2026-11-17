import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = content[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDF6FF] border border-[#BAE6FD] text-[#0796E5] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List (T1 White Cards) */}
        <div className="space-y-4">
          {t.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`t1-card transition-all overflow-hidden ${
                  isOpen ? 'border-[#BAE6FD] shadow-md' : 'border-[#DFEAF4]'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <span className={`text-base font-extrabold font-heading ${
                    isOpen ? 'text-[#0796E5]' : 'text-[#152238]'
                  }`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#EDF6FF] text-[#0796E5]' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
