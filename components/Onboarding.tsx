import React, { useState } from 'react';
import { ArrowRight, Check, Target, Shield, TrendingUp, Wallet, Activity } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    monthlyIncome: 0,
    topCategories: []
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinish = () => {
    if (formData.name && formData.goal && formData.riskProfile) {
      onComplete(formData as UserProfile);
    }
  };

  const toggleCategory = (cat: string) => {
    const current = formData.topCategories || [];
    if (current.includes(cat)) {
      setFormData({ ...formData, topCategories: current.filter(c => c !== cat) });
    } else {
      if (current.length < 3) {
        setFormData({ ...formData, topCategories: [...current, cat] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
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

          {/* STEP 2: Income Range */}
          {step === 2 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Qual sua faixa de renda mensal aproximada?</h2>
              <p className="text-slate-500">Isso nos ajuda a calibrar as metas iniciais.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { val: 2000, label: 'Até R$ 2.000' },
                  { val: 5000, label: 'R$ 2.000 - R$ 5.000' },
                  { val: 10000, label: 'R$ 5.000 - R$ 10.000' },
                  { val: 20000, label: 'Acima de R$ 10.000' },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => {
                        setFormData({...formData, monthlyIncome: opt.val});
                        nextStep();
                    }}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all ${
                      formData.monthlyIncome === opt.val 
                        ? 'border-purple-600 bg-purple-50 text-purple-900' 
                        : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                 <button onClick={prevStep} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
              </div>
            </div>
          )}

          {/* STEP 3: Goal */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Qual seu objetivo principal hoje?</h2>
              
              <div className="grid gap-4">
                {[
                  { id: 'control', label: 'Controlar Gastos', icon: Target, desc: 'Quero saber para onde vai meu dinheiro.' },
                  { id: 'save', label: 'Economizar', icon: Shield, desc: 'Preciso juntar dinheiro para uma meta.' },
                  { id: 'invest', label: 'Começar a Investir', icon: TrendingUp, desc: 'Quero multiplicar meu patrimônio.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                        setFormData({...formData, goal: opt.id as any});
                        nextStep();
                    }}
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
                 <button onClick={prevStep} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
              </div>
            </div>
          )}

          {/* STEP 4: Risk Profile */}
          {step === 4 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Como você lida com seu dinheiro?</h2>
              
              <div className="grid gap-4">
                {[
                  { id: 'conservative', label: 'Conservador', icon: Shield, desc: 'Prefiro segurança, evito riscos.' },
                  { id: 'moderate', label: 'Moderado', icon: Activity, desc: 'Busco equilíbrio entre segurança e retorno.' },
                  { id: 'aggressive', label: 'Arrojado', icon: TrendingUp, desc: 'Aceito riscos para ter maiores retornos.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                        setFormData({...formData, riskProfile: opt.id as any});
                        nextStep();
                    }}
                    className={`p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                      formData.riskProfile === opt.id 
                        ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600' 
                        : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${formData.riskProfile === opt.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg ${formData.riskProfile === opt.id ? 'text-purple-900' : 'text-slate-900'}`}>{opt.label}</h3>
                      <p className="text-slate-500 text-sm">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                 <button onClick={prevStep} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
              </div>
            </div>
          )}

          {/* STEP 5: Top Expenses */}
          {step === 5 && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Quais são seus maiores gastos?</h2>
              <p className="text-slate-500">Selecione até 3 categorias principais.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Educação', 'Compras', 'Viagem'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`p-3 rounded-xl border-2 text-center font-medium transition-all ${
                      formData.topCategories?.includes(cat)
                        ? 'border-purple-600 bg-purple-50 text-purple-900' 
                        : 'border-slate-100 hover:border-purple-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-8 items-center">
                 <button onClick={prevStep} className="text-slate-400 font-medium hover:text-slate-600">Voltar</button>
                 <button 
                  onClick={handleFinish}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 flex items-center gap-2 transition-all"
                >
                  Finalizar Perfil <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
