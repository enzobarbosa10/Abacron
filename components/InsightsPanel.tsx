import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { UserProfile, Transaction } from '../types';

interface InsightsPanelProps {
  user: UserProfile;
  transactions: Transaction[];
}

export function InsightsPanel({ user, transactions }: InsightsPanelProps) {
  // Mock de insights baseados no perfil
  const getInsights = () => {
    const insights = [];
    
    if (transactions.length === 0) {
      return [{
        id: 'empty',
        type: 'info',
        title: 'Comece sua jornada',
        message: 'Faça seu primeiro upload para receber insights personalizados.'
      }];
    }

    // Exemplo de lógica simples
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Math.abs(t.amount), 0);
    
    if (totalExpense > (user.monthlyIncome || 0) && user.monthlyIncome > 0) {
      insights.push({
        id: 'alert-1',
        type: 'warning',
        title: 'Atenção aos Gastos',
        message: `Você já gastou mais do que sua renda mensal declarada (${user.monthlyIncome}).`
      });
    }

    if (user.goal === 'save') {
      insights.push({
        id: 'tip-1',
        type: 'tip',
        title: 'Dica de Economia',
        message: 'Que tal revisar seus gastos com Alimentação? Eles representam 30% do total.'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Lightbulb className="w-32 h-32" />
      </div>
      
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        Insights para {user.name}
      </h2>

      <div className="space-y-4 relative z-10">
        {insights.map((insight: any) => (
          <div key={insight.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-3">
              {insight.type === 'warning' && <AlertCircle className="w-5 h-5 text-red-400 mt-1" />}
              {insight.type === 'tip' && <TrendingUp className="w-5 h-5 text-green-400 mt-1" />}
              {insight.type === 'info' && <Lightbulb className="w-5 h-5 text-blue-400 mt-1" />}
              
              <div>
                <h3 className="font-bold text-sm mb-1">{insight.title}</h3>
                <p className="text-xs text-slate-200 leading-relaxed">{insight.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
        Ver Relatório Semanal <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
