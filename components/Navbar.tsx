import React, { useState, useEffect } from 'react';
import { ChartLine, Menu, X } from 'lucide-react';
import { BRAND } from '../constants';

interface NavbarProps {
  onCTAClick: () => void;
}

export function Navbar({ onCTAClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = ['Problema', 'Recursos', 'Comparação', 'FAQ'];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <ChartLine className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">{BRAND.name}</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCTAClick} 
              className="hidden md:block px-5 py-2 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              Acessar Agora
            </button>
            <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="block text-base font-medium text-slate-600 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              onCTAClick();
              setMobileMenuOpen(false);
            }} 
            className="w-full py-3 rounded-xl font-bold text-white mt-2"
            style={{ backgroundColor: BRAND.colors.primary }}
          >
            Acessar Agora
          </button>
        </div>
      )}
    </nav>
  );
}