import React, { useState } from 'react';
import { Plus, Target, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { FinancialGoal } from '../types';
import { formatCurrency } from '../utils/finance';

interface GoalsPanelProps {
  goals: FinancialGoal[];
  onAddGoal: (goal: FinancialGoal) => void;
  onDeleteGoal: (id: string) => void;
}

export function GoalsPanel({ goals, onAddGoal, onDeleteGoal }: GoalsPanelProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    title: '',
    targetAmount: 0,
    currentAmount: 0,
    type: 'saving'
  });

  const handleSave = () => {
    if (newGoal.title && newGoal.targetAmount) {
      onAddGoal({
        id: Date.now().toString(),
        title: newGoal.title,
        targetAmount: Number(newGoal.targetAmount),
        currentAmount: Number(newGoal.currentAmount) || 0,
        deadline: newGoal.deadline || '',
        type: newGoal.type as 'saving' | 'expense_reduction'
      });
      setIsCreating(false);
      setNewGoal({ title: '', targetAmount: 0, currentAmount: 0, type: 'saving' });
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.max(0, (current / target) * 100));
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-600';
    if (percent >= 80) return 'bg-blue-500';
    if (percent >= 50) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Metas Financeiras
        </h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Nova Meta
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-slate-700">Criar Nova Meta</h3>
            <button onClick={() => setIsCreating(false)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Nome da Meta</label>
              <input 
                type="text" 
                className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                placeholder="Ex: Viagem para Disney"
                value={newGoal.title}
                onChange={e => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Valor Alvo (R$)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="0,00"
                  value={newGoal.targetAmount || ''}
                  onChange={e => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Já Guardado (R$)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                  placeholder="0,00"
                  value={newGoal.currentAmount || ''}
                  onChange={e => setNewGoal({...newGoal, currentAmount: Number(e.target.value)})}
                />
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700"
            >
              Salvar Meta
            </button>
          </div>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <Target className="w-12 h-12 mx-auto mb-2 opacity-20" />
          <p className="text-sm">Nenhuma meta criada ainda.</p>
          <button onClick={() => setIsCreating(true)} className="text-purple-600 font-bold text-sm mt-2">Começar agora</button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map(goal => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            return (
              <div key={goal.id} className="p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800">{goal.title}</h3>
                    <p className="text-xs text-slate-500">
                      {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <button onClick={() => onDeleteGoal(goal.id)} className="text-slate-300 hover:text-red-500">
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-2 text-xs">
                  <span className="font-medium text-slate-600">{Math.round(progress)}%</span>
                  {progress >= 100 && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Concluída!</span>}
                  {progress < 50 && <span className="text-yellow-600 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Vamos acelerar?</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
