import React from 'react';
import { Check, X, Zap, Crown, Star } from 'lucide-react';
import { BRAND } from '../constants';

interface PricingProps {
  onSignupClick: () => void;
}

export function Pricing({ onSignupClick }: PricingProps) {
  return (
    <section id="preco" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Planos transparentes para <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              sua liberdade financeira.
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Aproveite o acesso gratuito durante nossa fase de validação (MVP).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan (MVP) */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs font-bold px-4 py-1 rounded-b-lg tracking-wide uppercase">
              Fase Atual (MVP)
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Essencial
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900">R$ 0</span>
                <span className="ml-2 text-slate-500 font-medium">/mês</span>
              </div>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Tudo o que você precisa para sair das planilhas. Valide nosso produto e ganhe acesso vitalício.
              </p>
            </div>

            <button 
              onClick={onSignupClick}
              className="w-full py-4 rounded-xl font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-colors mb-8"
            >
              Criar Conta Grátis
            </button>

            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-slate-700 text-sm">Upload de Extratos (CSV/TXT)</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-slate-700 text-sm">Categorização via Inteligência Artificial</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-slate-700 text-sm">Dashboard Mensal Completo</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                <span className="text-slate-700 text-sm">Privacidade Local (Client-side)</span>
              </li>
              <li className="flex items-start opacity-50">
                <X className="w-5 h-5 text-slate-300 mr-3 shrink-0" />
                <span className="text-slate-400 text-sm">Open Banking (Conexão Direta)</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan (Future) */}
          <div className="bg-slate-900 rounded-[2rem] p-1 shadow-2xl relative group overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 opacity-100 pointer-events-none" />
            
            <div className="bg-slate-900 h-full w-full rounded-[1.9rem] p-8 relative z-10">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    Abacron Premium
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/10">
                    Fase 4
                  </span>
                </div>
                
                <div className="flex items-baseline text-white">
                  <span className="text-5xl font-extrabold">R$ 19,90</span>
                  <span className="ml-2 text-slate-400 font-medium">/mês</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  O futuro da gestão financeira. Automação completa com Open Banking e IA Preditiva.
                </p>
              </div>

              <button 
                onClick={onSignupClick}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/25 transition-all mb-8 relative overflow-hidden group-hover:scale-[1.02]"
                style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
              >
                <span className="relative z-10">Entrar na Lista de Espera</span>
              </button>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-3 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm"><strong>Todos os recursos do plano Pro (R$ 9,90)</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-3 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">Conexão Bancária (Open Banking)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-3 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">IA Preditiva de Gastos</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-3 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">App Mobile Nativo</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-500/20 p-0.5 rounded-full mr-3 shrink-0">
                    <Check className="w-4 h-4 text-purple-300" />
                  </div>
                  <span className="text-slate-200 text-sm">Suporte Prioritário</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Roadmap:</span> 
            <strong className="text-slate-700">Plano Pro (Intermediário) previsto por R$ 9,90/mês.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}