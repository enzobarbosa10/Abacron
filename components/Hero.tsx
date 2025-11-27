import React from 'react';
import { Upload, PieChart, ShieldCheck } from 'lucide-react';
import { BRAND } from '../constants';

interface HeroProps {
  onCTAClick: () => void;
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white border border-purple-100 rounded-full px-3 py-1 mb-8 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-600">Compatível com extratos: Nubank, Inter, Itaú e mais</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Suas finanças, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            organizadas em 30 segundos.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
          Pare de lutar com planilhas. O {BRAND.name} processa seu extrato bancário localmente e categoriza tudo com IA. 
          <span className="block mt-2 font-medium text-purple-700 flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" /> 100% Privado: Seus dados nunca saem do seu navegador.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button 
            onClick={onCTAClick} 
            className="px-8 py-4 rounded-full text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
          >
            <Upload className="w-5 h-5" /> Importar Extrato (Grátis)
          </button>
          <button className="px-8 py-4 rounded-full text-lg font-bold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" /> Ver Demonstração
          </button>
        </div>

        {/* Dashboard Preview / Mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full pointer-events-none" />
          <img 
            src="https://picsum.photos/1200/800" 
            alt="Dashboard Preview" 
            className="rounded-xl shadow-2xl border-4 border-white mx-auto transform hover:scale-[1.01] transition duration-700 object-cover" 
          />
        </div>
      </div>
    </section>
  );
}