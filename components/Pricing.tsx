import React from 'react';
import { Check, X, Zap, Crown, Star, Layers, Rocket } from 'lucide-react';
import { BRAND } from '../constants';

interface PricingProps {
  onSignupClick: () => void;
}

export function Pricing({ onSignupClick }: PricingProps) {
  return (
    <section id="preco" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Planos para cada etapa da <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              sua jornada financeira.
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Comece grátis hoje e escale conforme sua necessidade de controle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-start">
          
          {/* Free Plan (MVP) */}
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs font-bold px-4 py-1 rounded-b-lg tracking-wide uppercase">
              Disponível Agora
            </div>
            
            <div className="mb-6 mt-2">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Free
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900">R$ 0</span>
              </div>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed min-h-[60px]">
                Ideal para quem está começando a organizar as contas.
              </p>
            </div>

            <button 
              onClick={onSignupClick}
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 mb-6"
              style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
            >
              Criar Conta Grátis
            </button>

            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">Até 100 transações/mês</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">1 conta bancária</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">Categorização via IA</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">Privacidade Local</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl border-2 border-purple-100 relative hover:-translate-y-1 transition-transform duration-300">
             <div className="mb-6 mt-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-pink-500" />
                Pro
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900">R$ 9,90</span>
                <span className="ml-2 text-slate-500 font-medium">/mês</span>
              </div>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed min-h-[60px]">
                Para quem precisa de mais controle e relatórios avançados.
              </p>
            </div>

            <button 
              onClick={onSignupClick}
              className="w-full py-3 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-purple-700 hover:border-purple-200 transition-all duration-300 mb-6"
            >
              Lista de Espera
            </button>

            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm font-medium">Transações ilimitadas</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm font-medium">Múltiplas contas</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">Exportação PDF/Excel</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                <span className="text-slate-700 text-sm">Tudo do plano Free</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-slate-900 rounded-[2rem] p-6 lg:p-8 shadow-2xl relative group overflow-hidden hover:-translate-y-1 transition-transform duration-300">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 opacity-100 pointer-events-none" />
            
            <div className="bg-slate-900 h-full w-full rounded-[1.9rem] p-6 lg:p-8 relative z-10">
              <div className="mb-6 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    Premium
                  </h3>
                </div>
                
                <div className="flex items-baseline text-white">
                  <span className="text-4xl font-extrabold">R$ 19,90</span>
                  <span className="ml-2 text-slate-400 font-medium">/mês</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed min-h-[60px]">
                  Automação total com conexão bancária direta e IA preditiva.
                </p>
              </div>

              <button 
                onClick={onSignupClick}
                className="w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 mb-6 relative overflow-hidden group-hover:bg-opacity-90"
                style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
              >
                <span className="relative z-10">Lista de Espera</span>
              </button>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-2 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm font-bold">Open Banking (Automático)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-2 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">IA Preditiva de Gastos</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-2 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">App Mobile Nativo</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-2 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">Suporte Prioritário</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}