import React from 'react';
import { BRAND } from '../constants';

export function FAQ() {
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
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Perguntas Frequentes</h2>
        <div className="grid gap-6">
          {questions.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 transition">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.q}</h3>
              <p className="text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}