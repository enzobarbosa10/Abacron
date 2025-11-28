import React, { useState } from 'react';
import { ArrowRight, Check, Target, Shield, TrendingUp, Wallet } from 'lucide-react';
import { UserProfile } from '../types';
import { BRAND } from '../constants';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    topCategories: []
  });

  const nextStep = () => setStep(s => s + 1);

  const handleFinish = () => {
    if (formData.name && formData.monthlyIncome && formData.goal && formData.riskProfile) {
      onComplete(formData as UserProfile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          
          {/* STEP 1: Intro & Name */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Vamos criar seu perfil financeiro.</h2>
              <p className="text-slate-600 text-lg">Para começar, como você gostaria de ser chamado?</p>
              
              <input 
                type="text"
                placeholder="Seu nome"
                className="w-full text-2xl font-bold border-b-2 border-slate-200 py-2 focus:border-purple-600 outline-none bg-transparent placeholder:text-slate-300 transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                autoFocus
              />

              <div className="pt-8 flex justify-end">
                <button 
                  onClick={nextStep}
                  disabled={!formData.name}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  Continuar <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Income & Goal */}
          {step === 2 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Qual seu objetivo principal hoje, {formData.name}?</h2>
              
              <div className="grid gap-4">
                {[
                  { id: 'control', label: 'Controlar Gastos', icon: Target, desc: 'Quero saber para onde vai meu dinheiro.' },
                  { id: 'save', label: 'Economizar', icon: Shield, desc: 'Preciso juntar dinheiro para uma meta.' },
                  { id: 'invest', label: 'Começar a Investir', icon: TrendingUp, desc: 'Quero multiplicar meu patrimônio.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({...formData, goal: opt.id as any})}
                    className={`p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                      formData.goal === opt.id 
                        ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600' 
                        : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${formData.goal === opt.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${formData.goal === opt.id ? 'text-purple-900' : 'text-slate-900'}`}>{opt.label}</h3>
                      <p className="text-slate-500 text-sm">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                 <button onClick={() => setStep(1)} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
                 <button 
                  onClick={nextStep}
                  disabled={!formData.goal}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  Próximo <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Income Range */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8">
               <h2 className="text-2xl font-bold text-slate-900">Qual sua renda mensal aproximada?</h2>
               <p className="text-slate-500">Isso nos ajuda a calibrar os gráficos e metas.</p>

               <div className="space-y-4">
                 <input 
                    type="number" 
                    placeholder="R$ 0,00"
                    className="w-full text-4xl font-bold border-b-2 border-slate-200 py-4 focus:border-purple-600 outline-none bg-transparent placeholder:text-slate-300 text-slate-800"
                    onChange={(e) => setFormData({...formData, monthlyIncome: Number(e.target.value)})}
                 />
               </div>

               <div className="flex justify-between pt-8">
                 <button onClick={() => setStep(2)} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
                 <button 
                  onClick={nextStep}
                  disabled={!formData.monthlyIncome}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  Próximo <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Risk Profile & Finish */}
          {step === 4 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Para finalizar, qual seu estilo financeiro?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { id: 'conservative', label: 'Conservador', emoji: '🛡️' },
                   { id: 'moderate', label: 'Moderado', emoji: '⚖️' },
                   { id: 'aggressive', label: 'Arrojado', emoji: '🚀' },
                 ].map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => setFormData({...formData, riskProfile: opt.id as any})}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all h-40 ${
                      formData.riskProfile === opt.id 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50'
                    }`}
                   >
                     <span className="text-4xl">{opt.emoji}</span>
                     <span className={`font-bold ${formData.riskProfile === opt.id ? 'text-purple-900' : 'text-slate-700'}`}>{opt.label}</span>
                   </button>
                 ))}
              </div>

              <div className="flex justify-between pt-8">
                 <button onClick={() => setStep(3)} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
                 <button 
                  onClick={handleFinish}
                  disabled={!formData.riskProfile}
                  className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  <Check className="w-5 h-5" /> Criar Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}