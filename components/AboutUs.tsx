import React from 'react';
import { Calculator, Shield, Eye, Users } from 'lucide-react';
import { BRAND } from '../constants';

export function AboutUs() {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Por que <span className="text-purple-600">{BRAND.name}</span>?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Nascemos de uma frustração simples: aplicativos de finanças são complexos demais ou invasivos demais.
            Queríamos a precisão de um instrumento milenar com a tecnologia de hoje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
              <Calculator className="w-64 h-64 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-900 mb-4">A Origem do Nome</h3>
            <p className="text-slate-700 mb-4">
              <strong>Ábaco (Abacus)</strong>: A primeira calculadora da humanidade. Símbolo de simplicidade e precisão matemática.
            </p>
            <p className="text-slate-700">
              <strong>Abacron</strong> une a herança do ábaco com a era cronológica digital. É o retorno ao controle absoluto, sem a complexidade das planilhas modernas.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Privacidade Radical</h4>
                <p className="text-slate-600">Seus dados financeiros são processados localmente. Não vendemos seus dados porque nem sequer os vemos.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Transparência Total</h4>
                <p className="text-slate-600">Sem taxas escondidas. O modelo de negócio é simples: software premium por um preço justo.</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Feito para Humanos</h4>
                <p className="text-slate-600">Desenvolvido para pessoas reais que querem viver a vida, não passar o domingo preenchendo Excel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}