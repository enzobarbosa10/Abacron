import React from 'react';
import { X, Sparkles, CheckCircle } from 'lucide-react';
import { BRAND } from '../constants';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupClick: () => void;
}

export function ExitIntentModal({ isOpen, onClose, onSignupClick }: ExitIntentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border-2 border-purple-100 transform transition-all scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Não vá embora de mãos vazias!</h3>
          <p className="text-gray-600 mb-6">
            Você está prestes a perder a chance de organizar sua vida financeira <strong>de graça</strong>.
          </p>

          <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left space-y-3">
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Categorização Automática (IA)
            </div>
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Relatórios Ilimitados
            </div>
            <div className="flex items-center text-sm text-gray-700 font-medium">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Suporte Prioritário
            </div>
          </div>

          <button 
            onClick={() => {
              onSignupClick();
            }} 
            className="w-full py-3.5 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
          >
            Quero Minha Conta Grátis
          </button>
          
          <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline">
            Não, prefiro continuar usando planilhas
          </button>
        </div>
      </div>
    </div>
  );
}