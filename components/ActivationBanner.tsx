import React from 'react';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

interface ActivationBannerProps {
  steps: {
    id: string;
    label: string;
    completed: boolean;
    action: () => void;
  }[];
}

export function ActivationBanner({ steps }: ActivationBannerProps) {
  const completedCount = steps.filter(s => s.completed).length;
  const total = steps.length;
  const progress = (completedCount / total) * 100;

  if (completedCount === total) return null; // Hide if complete

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Complete sua Jornada
          </h2>
          <p className="text-sm text-slate-500">Complete os passos para desbloquear recursos Premium grátis.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-purple-600">{completedCount}/{total}</span>
        </div>
      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={step.action}
            disabled={step.completed}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              step.completed 
                ? 'bg-green-50 border-green-200 opacity-70' 
                : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-sm'
            }`}
          >
            {step.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
            )}
            <span className={`text-sm font-medium ${step.completed ? 'text-green-700 line-through' : 'text-slate-700'}`}>
              {step.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
