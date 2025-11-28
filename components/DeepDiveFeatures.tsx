import React from 'react';
import { Upload, Sparkles, Lock, Zap } from 'lucide-react';
import { BRAND } from '../constants';

export function DeepDiveFeatures() {
  return (
    <section id="funcionalidades" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Passo 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-purple-600">1</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Faça upload do seu extrato <br />
              <span className="text-purple-500">sem esforço manual.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Diga adeus à digitação. Exporte o arquivo do seu banco e arraste para o {BRAND.name}. Processamos os dados instantaneamente para gerar seus relatórios.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['Nubank', 'Inter', 'Itaú', 'Bradesco', 'Santander'].map(bank => (
                <span key={bank} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500 border border-gray-200">{bank}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <span className="font-semibold text-purple-600">Formatos aceitos (MVP):</span> CSV, TXT e PDF
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-10 rounded-full"></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
              <div className="border-2 border-dashed border-purple-200 rounded-xl bg-purple-50 h-64 flex flex-col items-center justify-center text-center p-8">
                <Upload className="w-12 h-12 text-purple-400 mb-4" />
                <p className="font-medium text-purple-900">Arraste seu extrato aqui</p>
                <p className="text-sm text-purple-600 mt-2">Suporta CSV, TXT, PDF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 relative">
            <div className="absolute inset-0 bg-pink-600 blur-3xl opacity-10 rounded-full"></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl -rotate-2 hover:rotate-0 transition duration-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Uber *Viagem</p>
                    <p className="text-xs text-gray-500">12 Ago • 14:30</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-bold">Transporte</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-pink-500">
                  <div>
                    <p className="text-sm font-bold text-gray-800">iFood *McDonalds</p>
                    <p className="text-xs text-gray-500">12 Ago • 19:00</p>
                  </div>
                  <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full font-bold">Alimentação</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Drogasil *S. Paulo</p>
                    <p className="text-xs text-gray-500">10 Ago • 09:15</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Saúde</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-pink-600">2</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Categorização Inteligente <br />
              <span className="text-pink-500">sem configuração.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Nosso motor de IA analisa descrições (ex: "Posto Shell" ou "Drogasil") e categoriza automaticamente como Transporte ou Saúde. Economize horas de ajustes manuais.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 font-medium"><Sparkles className="w-4 h-4 text-pink-500 mr-2"/> 75%+ de precisão automática (MVP)</li>
              <li className="flex items-center text-gray-700 font-medium"><Sparkles className="w-4 h-4 text-pink-500 mr-2"/> Aprende com suas correções</li>
            </ul>
          </div>
        </div>

        {/* Passo 3 (Novo - Privacidade) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Privacidade Absoluta: <br />
              <span className="text-green-500">Seus dados não saem daqui.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Diferente de outros apps, o {BRAND.name} realiza todo o processamento <strong>no seu navegador</strong>. Seus extratos bancários nunca são enviados para nossos servidores.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 font-medium">
                <Lock className="w-4 h-4 text-green-500 mr-2"/> Processamento 100% Local (Client-side)
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <Zap className="w-4 h-4 text-green-500 mr-2"/> Zero risco de vazamento de dados
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <Zap className="w-4 h-4 text-green-500 mr-2"/> Funciona até offline após carregar
              </li>
            </ul>
          </div>
          <div className="relative">
             {/* Visualização abstrata de segurança */}
            <div className="absolute inset-0 bg-green-400 blur-3xl opacity-10 rounded-full"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-4 mb-6 border-b border-slate-700 pb-4">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <div className="ml-auto text-xs text-slate-500 font-mono">local_secure_env</div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center text-green-400">
                  <span className="mr-2">➜</span>
                  <span>Inicializando ambiente seguro...</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">➜</span>
                  <span>Bloqueando conexões externas...</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">➜</span>
                  <span>Processando arquivo localmente...</span>
                </div>
                <div className="flex items-center text-white bg-green-500/20 p-2 rounded border border-green-500/30">
                  <Lock className="w-4 h-4 mr-2" />
                  <span>Dados Criptografados e Isolados</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}