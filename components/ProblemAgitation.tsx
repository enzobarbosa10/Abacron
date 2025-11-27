import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { BRAND } from '../constants';

export function ProblemAgitation() {
  return (
    <section id="problema" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Você trabalha duro, mas não sabe <br/><span className="text-purple-600">para onde vai o dinheiro?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A rotina de um profissional ocupado não deixa tempo para microgerenciar planilhas. O resultado? Desorganização e dificuldade para economizar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* O Lado Ruim */}
          <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
            <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center">
              <X className="w-6 h-6 mr-2" /> O problema das Planilhas
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-slate-700">
                <span className="text-red-400 mr-3 text-lg">•</span>
                <span><strong>Perda de tempo:</strong> Digitar gasto por gasto leva horas.</span>
              </li>
              <li className="flex items-start text-slate-700">
                <span className="text-red-400 mr-3 text-lg">•</span>
                <span><strong>Complexidade:</strong> Fórmulas quebram e a manutenção é chata.</span>
              </li>
              <li className="flex items-start text-slate-700">
                <span className="text-red-400 mr-3 text-lg">•</span>
                <span><strong>Sem clareza:</strong> Difícil visualizar padrões de consumo rapidamente.</span>
              </li>
            </ul>
          </div>

          {/* O Lado Bom */}
          <div className="bg-white p-8 rounded-3xl border-2 border-purple-500 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              A SOLUÇÃO IDEAL
            </div>
            <h3 className="text-xl font-bold text-purple-700 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" /> O jeito {BRAND.name}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-slate-800 font-medium">
                <div className="bg-green-100 p-1 rounded-full mr-3 text-green-600"><CheckCircle className="w-4 h-4" /></div>
                <span><strong>Velocidade:</strong> Organize seu mês em menos de 30 segundos.</span>
              </li>
              <li className="flex items-start text-slate-800 font-medium">
                <div className="bg-green-100 p-1 rounded-full mr-3 text-green-600"><CheckCircle className="w-4 h-4" /></div>
                <span><strong>Automático:</strong> Upload de extrato (CSV/TXT) e categorização via IA.</span>
              </li>
              <li className="flex items-start text-slate-800 font-medium">
                <div className="bg-green-100 p-1 rounded-full mr-3 text-green-600"><CheckCircle className="w-4 h-4" /></div>
                <span><strong>Visual:</strong> Gráficos claros para identificar onde cortar gastos.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}