import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-2"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Sua privacidade importa</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Utilizamos cookies para melhorar sua experiência e analisar o tráfego. 
              Seus dados financeiros são processados localmente ou criptografados.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleAccept}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 transition shadow-md"
              >
                Aceitar Tudo
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition"
              >
                Recusar
              </button>
            </div>
            <a href="#" className="block mt-3 text-xs text-slate-400 hover:text-purple-600 underline">
              Ler Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
