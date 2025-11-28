import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Phone, Calendar } from 'lucide-react';
import { BRAND } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
}

export function AuthModal({ isOpen, initialMode, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de delay de rede
    setTimeout(() => {
      setIsLoading(false);
      alert(mode === 'login' ? 'Login realizado com sucesso! (Demo)' : 'Conta criada com sucesso! (Demo)');
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com Gradiente */}
        <div className="p-6 pb-8 text-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-700 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition z-50 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 text-white mt-2">
            <h2 className="text-2xl font-bold mb-1">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta grátis'}
            </h2>
            <p className="text-purple-100 text-sm">
              {mode === 'login' 
                ? 'Acesse seu dashboard financeiro.' 
                : 'Junte-se a 1.200+ usuários organizados.'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-6 -mt-6 relative z-10 shrink-0">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-sm font-bold rounded-l-xl shadow-sm transition-all ${
              mode === 'login' 
                ? 'bg-white text-purple-700 border-b-2 border-purple-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-50'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-sm font-bold rounded-r-xl shadow-sm transition-all ${
              mode === 'signup' 
                ? 'bg-white text-purple-700 border-b-2 border-purple-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-50'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* Form */}
        <div className="p-8 pt-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campos exclusivos de Cadastro (Topo) */}
            {mode === 'signup' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Seu nome"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      placeholder="(11) 99999-9999"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email (Comum) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Campos exclusivos de Cadastro (Meio) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Data de Nascimento</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-gray-50 focus:bg-white text-gray-600"
                    required
                  />
                </div>
              </div>
            )}

            {/* Senha (Comum) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              {mode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-xs text-purple-600 hover:text-purple-800 font-medium">Esqueceu a senha?</a>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
            >
              {isLoading ? (
                <span className="animate-pulse">Processando...</span>
              ) : (
                <>
                  {mode === 'login' ? 'Acessar Conta' : 'Criar Conta Grátis'} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 20.45c4.6667 0 7.9167-3.25 7.9167-8.1667 0-.75-.0833-1.4166-.25-2.0833H12.0003v3.9167h4.5c-.25 1.4166-1.5 3.9166-4.5 3.9166-2.6667 0-4.9167-1.8333-5.75-4.4166-.25-.75-.3334-1.5-.3334-2.3334 0-.8333.0834-1.5833.3334-2.3333.8333-2.5833 3.0833-4.4166 5.75-4.4166 1.4167 0 2.75.5 3.75 1.5l2.8333-2.8333C16.8336 1.5833 14.5836.5 12.0003.5 7.0836.5 2.8336 3.6667 1.0003 8.0833 0.3336 9.5833 0.0003 11.25 0.0003 12.9167c0 1.6666.3333 3.3333 1 4.8333 1.8333 4.4167 6.0833 7.5833 11 7.5833z" fill="#4285F4" />
                </svg>
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>{' '}
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-bold text-purple-600 hover:text-purple-500"
            >
              {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}