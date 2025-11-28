import React, { useState } from 'react';
import { UrgencyBanner } from './components/UrgencyBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemAgitation } from './components/ProblemAgitation';
import { ComparisonTable } from './components/ComparisonTable';
import { DeepDiveFeatures } from './components/DeepDiveFeatures';
import { MagicEditor } from './components/MagicEditor';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ExitIntentModal } from './components/ExitIntentModal';
import { AuthModal } from './components/AuthModal';
import { AboutUs } from './components/AboutUs';
import { useExitIntent } from './hooks/useExitIntent';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  // Trigger modal on mouse leave (desktop)
  useExitIntent(() => {
    // Only show exit intent if auth modal is not open
    if (!authModal.isOpen) {
      setShowExitModal(true);
    }
  });

  const openAuth = (mode: 'login' | 'signup') => {
    setShowExitModal(false); // Close exit modal if open
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuth = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-200 selection:text-purple-900">
      <UrgencyBanner />
      <Navbar 
        onLoginClick={() => openAuth('login')} 
        onSignupClick={() => openAuth('signup')} 
      />
      
      <main>
        <Hero onSignupClick={() => openAuth('signup')} />
        <ProblemAgitation />
        <AboutUs />
        <DeepDiveFeatures />
        
        {/* Nova Funcionalidade de Edição de Imagem */}
        <MagicEditor />

        <Pricing onSignupClick={() => openAuth('signup')} />
        <ComparisonTable />
        <FAQ />

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-violet-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-noise"></div> 
          {/* Note: bg-noise assumes a plugin or custom class, simulating with standard opacity if needed, 
              but relying on background color here for standard tailwind */}
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Pare de adiar sua organização financeira.
            </h2>
            <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
              Junte-se a 1.200+ usuários que já saíram do caos das planilhas.
            </p>
            <button 
              onClick={() => openAuth('signup')}
              className="px-10 py-5 bg-white text-purple-900 rounded-full font-bold text-xl shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              Começar Grátis Agora <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-sm text-purple-300 opacity-80">
              Sem cartão de crédito • 100% Gratuito
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <ExitIntentModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)}
        onSignupClick={() => openAuth('signup')}
      />
      
      <AuthModal 
        isOpen={authModal.isOpen} 
        initialMode={authModal.mode} 
        onClose={closeAuth} 
      />
    </div>
  );
}