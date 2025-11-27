import React from 'react';
import { ChartLine } from 'lucide-react';
import { BRAND } from '../constants';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ChartLine className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold text-white">{BRAND.name}</span>
        </div>
        <p className="text-sm mb-8">Organize suas finanças sem vender sua privacidade.</p>
        <div className="text-xs text-slate-600">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}