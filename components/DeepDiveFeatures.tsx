import React from 'react';
import { Upload, Sparkles, Lock, Zap, AlertTriangle, FileText, ArrowDown, CheckCircle } from 'lucide-react';
import { BRAND } from '../constants';

export function DeepDiveFeatures() {
  return (
    <section id="funcionalidades" className="py-24 bg-white relative overflow-hidden">
      {/* Connecting line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-100 via-purple-200 to-transparent -translate-x-1/2 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">
        
        {/* Passo 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-200">
                1
              </div>
              <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider">Importação</h3>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Upload instantâneo <br />
              <span className="text-purple-500">do seu extrato.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Arraste seu arquivo OFX, CSV ou PDF. O sistema identifica o formato do seu banco automaticamente em segundos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <FileText className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Aceita: Nubank, Inter, Itaú, Bradesco, Santander</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Nota:</strong> PDFs devem ter texto selecionável (sem OCR nesta versão).</span>
              </div>
            </div>
          </div>

          <div className="order-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-white border border-slate-200 rounded-3xl p-2 shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-50 border-2 border-dashed border-purple-300 rounded-2xl h-72 flex flex-col items-center justify-center text-center p-8 transition-colors group-hover:bg-purple-50/50">
                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <p className="font-bold text-slate-900 text-lg">Solte seu extrato aqui</p>
                <p className="text-slate-500 mt-2">.CSV, .TXT ou .PDF</p>
                <div className="mt-6 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 shadow-sm">
                  Processamento 100% Local
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passo 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative group">
             <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 to-purple-500/20 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity" />
             <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl -rotate-1 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Extrato Processado</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="p-2 space-y-2 bg-white">
                  {/* Item 1 */}
                  <div className="flex items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm">Uber *Viagem</div>
                      <div className="text-xs text-slate-500">12 Ago • 14:30</div>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Transporte</span>
                  </div>
                  {/* Item 2 */}
                  <div className="flex items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-4">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm">iFood *McDonalds</div>
                      <div className="text-xs text-slate-500">12 Ago • 19:00</div>
                    </div>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">Alimentação</span>
                  </div>
                   {/* Item 3 */}
                   <div className="flex items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm">Pix Recebido</div>
                      <div className="text-xs text-slate-500">12 Ago • 20:00</div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Receita</span>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-pink-200">
                2
              </div>
              <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider">Inteligência Artificial</h3>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Categorização <br />
              <span className="text-pink-500">automática e precisa.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Nossa IA analisa as descrições confusas do banco (ex: "Pgto *Maq *Rest") e classifica corretamente como "Alimentação".
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center text-slate-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                75%+ de precisão imediata
              </li>
              <li className="flex items-center text-slate-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                Aprende com suas correções
              </li>
            </ul>
          </div>
        </div>

        {/* Passo 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-1">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-slate-200">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Segurança</h3>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Seus dados nunca <br />
              <span className="text-slate-600">saem do seu dispositivo.</span>
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Privacidade não é opcional. O {BRAND.name} roda o código de processamento direto no seu navegador. Zero envio para nuvem.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <Lock className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <span className="block text-sm font-bold text-slate-700">Client-Side</span>
                  <span className="text-xs text-slate-500">Processamento local</span>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <Zap className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <span className="block text-sm font-bold text-slate-700">Offline First</span>
                  <span className="text-xs text-slate-500">Funciona sem internet</span>
               </div>
            </div>
          </div>

          <div className="order-2 relative group">
             <div className="absolute inset-0 bg-slate-200 blur-3xl rounded-full opacity-40" />
             <div className="relative bg-slate-900 text-slate-200 rounded-3xl p-6 shadow-2xl font-mono text-sm border border-slate-700 rotate-1 group-hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-purple-400 mr-2">$</span>
                    <span>init_secure_environment()</span>
                  </div>
                  <div className="text-green-400">SUCCESS: Local environment ready</div>
                  <div className="flex">
                    <span className="text-purple-400 mr-2">$</span>
                    <span>import_data --local</span>
                  </div>
                  <div className="text-slate-500">Reading file from memory...</div>
                  <div className="text-green-400">DONE: 142 transactions processed</div>
                  <div className="flex mt-4 pt-4 border-t border-slate-800 text-slate-400 italic">
                    <Lock className="w-4 h-4 mr-2 inline" />
                    Network Access: BLOCKED
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
