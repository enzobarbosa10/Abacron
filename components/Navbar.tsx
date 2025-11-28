import React, { useState, useEffect } from 'react';
import { ChartLine, Menu, X, ArrowRight } from 'lucide-react';
import { BRAND } from '../constants';

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Preço', href: '#preco' },
    { label: 'Sobre', href: '#sobre' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Se for o link de entrar, aciona o modal e continua para o scroll
    if (href === '#entrar') {
      onLoginClick();
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Compensate for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-2 group">
            <div className="bg-purple-600 p-1.5 rounded-lg group-hover:bg-purple-700 transition-colors">
              <ChartLine className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-purple-900 transition-colors">{BRAND.name}</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition hover:-translate-y-0.5 duration-200"
              >
                {item.label}
              </a>
            ))}
            
            {/* Divider */}
            <div className="h-6 w-px bg-slate-200"></div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <a 
                href="#entrar"
                onClick={(e) => handleScroll(e, '#entrar')}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
              >
                Entrar
              </a>
              <button 
                onClick={onSignupClick} 
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
              >
                Criar Conta <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button className="text-slate-600 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-full left-0 w-full animate-fade-in max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="block text-lg font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-xl transition cursor-pointer"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            
            <div className="h-px w-full bg-slate-100 my-2"></div>
            
            <div className="flex flex-col gap-3 pt-2">
              <a 
                href="#entrar"
                onClick={(e) => handleScroll(e, '#entrar')}
                className="w-full py-3 rounded-xl font-bold text-slate-700 border border-slate-200 text-center hover:bg-purple-50 hover:border-purple-200 transition cursor-pointer"
              >
                Entrar
              </a>
              <button 
                onClick={() => {
                  onSignupClick();
                  setMobileMenuOpen(false);
                }} 
                className="w-full py-3 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(90deg, ${BRAND.colors.primary}, ${BRAND.colors.secondary})` }}
              >
                Criar Conta Grátis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}