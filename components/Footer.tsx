import React from 'react';
import { LineChart, Instagram, Twitter, Linkedin, Mail, ShieldCheck, Heart } from 'lucide-react';
import { BRAND } from '../constants';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">{BRAND.name}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Sua liberdade financeira começa com organização. Transformamos extratos bancários em clareza e controle, sem complicações.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-purple-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Produto</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#funcionalidades" className="hover:text-purple-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#preco" className="hover:text-purple-400 transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal & Privacidade</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" /> LGPD Compliance
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <a href="mailto:suporte@abacron.com" className="hover:text-white transition-colors">suporte@abacron.com</a>
              </li>
              <li className="text-slate-500 text-xs mt-4">
                Atendimento de Seg. a Sex.<br />das 9h às 18h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} {BRAND.name} Tecnologia Ltda. CNPJ: 00.000.000/0001-00
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
}