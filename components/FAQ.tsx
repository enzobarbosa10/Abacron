import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { BRAND } from '../constants';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    { 
      q: "Meus dados ficam salvos?", 
      a: `Não. O ${BRAND.name} processa tudo no seu navegador. Nada é enviado para servidores. Seus dados financeiros nunca saem do seu computador.` 
    },
    { 
      q: "É realmente gratuito?", 
      a: "Sim. Estamos na fase 'Early Adopter'. Quem entrar agora garante conta Premium vitalícia sem pagar nada, nunca." 
    },
    { 
      q: "Funciona no celular?", 
      a: "Perfeitamente. O site é 100% responsivo e funciona como um app nativo no seu navegador mobile." 
    },
    {
      q: "Quais bancos são compatíveis?",
      a: "Atualmente suportamos nativamente Nubank, Inter, Itaú, Bradesco e Santander via importação de extrato OFX, PDF ou CSV."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Perguntas Frequentes</h2>
          <p className="text-slate-600">Tire suas dúvidas sobre segurança, preços e funcionalidades.</p>
        </div>
        
        <div className="grid gap-4">
          {questions.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-2xl transition-all duration-300 border ${isOpen ? 'border-purple-200 shadow-md ring-1 ring-purple-100' : 'border-gray-100 shadow-sm hover:border-purple-100'}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-purple-900' : 'text-slate-800'}`}>
                    {item.q}
                  </span>
                  <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-purple-50 hover:text-purple-600'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}