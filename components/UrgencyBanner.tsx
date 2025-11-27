import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function UrgencyBanner() {
  const [spots, setSpots] = useState(47);

  useEffect(() => {
    // Simula queda de vagas aleatoriamente para efeito psicológico
    const interval = setInterval(() => {
      setSpots(prev => (prev > 12 ? prev - 1 : prev));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-slate-900 text-white py-2 px-4 text-center text-sm font-medium animate-pulse">
      <div className="flex items-center justify-center space-x-2">
        <Clock className="w-4 h-4 text-pink-400" />
        <span>
          Oferta de Lançamento: Restam apenas <span className="text-pink-400 font-bold">{spots} vagas</span> com acesso vitalício gratuito.
        </span>
      </div>
    </div>
  );
}