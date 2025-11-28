import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { BRAND } from '../constants';

export function ComparisonTable() {
  const features = [
    { feature: 'Importação de Extrato', finanpro: true, sheets: false, apps: true },
    { feature: 'Categorização Automática', finanpro: true, sheets: false, apps: true },
    { feature: 'Dashboard em Tempo Real', finanpro: true, sheets: 'basic', apps: true },
    { feature: 'Custo Zero (Vitalício)', finanpro: true, sheets: true, apps: false },
    { feature: 'Privacidade Total (Sem Nuvem)', finanpro: true, sheets: false, apps: false },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Por que o {BRAND.name} é diferente?
        </h2>
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100">
                  <th className="text-left py-6 px-6 text-slate-500 font-medium w-1/3">Recurso</th>
                  <th className="py-6 px-6 text-center w-1/4 bg-purple-50/50">
                    <div className="font-bold text-purple-600 text-lg">{BRAND.name}</div>
                    <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Automático</div>
                  </th>
                  <th className="py-6 px-6 text-center text-slate-400 font-medium w-1/4">
                    <div>Planilha</div>
                    <div className="text-xs font-normal">Manual</div>
                  </th>
                  <th className="py-6 px-6 text-center text-slate-400 font-medium w-1/4">
                    <div>Mobills / Organizze</div>
                    <div className="text-xs font-normal">~ R$ 19/mês</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-slate-700 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center bg-purple-50/30">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.sheets === 'basic' ? (
                        <span className="text-xs text-gray-400">Básico</span>
                      ) : row.sheets ? (
                        <CheckCircle className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.apps ? (
                        <CheckCircle className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center mt-8 text-slate-500 text-sm">
          * Economize cerca de <strong className="text-purple-600">R$ 240,00/ano</strong> escolhendo o {BRAND.name} (MVP) ao invés de concorrentes pagos.
        </p>
      </div>
    </section>
  );
}