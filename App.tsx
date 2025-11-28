import React, { useState, useEffect } from 'react';
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
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { UploadArea } from './components/UploadArea';
import { useExitIntent } from './hooks/useExitIntent';
import { ArrowRight } from 'lucide-react';
import { AppView, UserProfile, Transaction } from './types';
import { BRAND } from './constants';

export default function App() {
  // State Navigation
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  
  // App Data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Modals (Landing)
  const [showExitModal, setShowExitModal] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  // Persistência Mockada
  useEffect(() => {
    const savedUser = localStorage.getItem('abacron_user');
    const savedTrans = localStorage.getItem('abacron_trans');
    if (savedUser) setUserProfile(JSON.parse(savedUser));
    if (savedTrans) setTransactions(JSON.parse(savedTrans));
  }, []);

  // Exit Intent logic (only on landing)
  useExitIntent(() => {
    if (currentView === 'LANDING' && !authModal.isOpen) {
      setShowExitModal(true);
    }
  });

  const handleAuthSuccess = () => {
    setAuthModal({ ...authModal, isOpen: false });
    // Se já tem perfil, vai pro Dashboard, senão Onboarding
    if (userProfile) {
      setCurrentView('DASHBOARD');
    } else {
      setCurrentView('ONBOARDING');
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('abacron_user', JSON.stringify(profile));
    setCurrentView('DASHBOARD');
  };

  const handleUploadSuccess = (newTransactions: Transaction[]) => {
    const updated = [...transactions, ...newTransactions];
    setTransactions(updated);
    localStorage.setItem('abacron_trans', JSON.stringify(updated));
    setShowUploadModal(false);
  };

  const handleLogout = () => {
    // Para demo, apenas volta para landing, não limpa dados
    setCurrentView('LANDING');
  };

  // --- RENDER VIEWS ---

  if (currentView === 'ONBOARDING') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentView === 'DASHBOARD' && userProfile) {
    return (
      <>
        <Dashboard 
          user={userProfile} 
          transactions={transactions} 
          onUploadRequest={() => setShowUploadModal(true)}
          onLogout={handleLogout}
        />
        {showUploadModal && (
          <UploadArea 
            onUploadSuccess={handleUploadSuccess} 
            onCancel={() => setShowUploadModal(false)} 
          />
        )}
      </>
    );
  }

  // DEFAULT: LANDING PAGE
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-purple-200 selection:text-purple-900">
      <UrgencyBanner />
      <Navbar 
        onLoginClick={() => setAuthModal({ isOpen: true, mode: 'login' })} 
        onSignupClick={() => setAuthModal({ isOpen: true, mode: 'signup' })} 
      />
      
      <main>
        <Hero onSignupClick={() => setAuthModal({ isOpen: true, mode: 'signup' })} />
        <ProblemAgitation />
        <AboutUs />
        <DeepDiveFeatures />
        <MagicEditor />
        <Pricing onSignupClick={() => setAuthModal({ isOpen: true, mode: 'signup' })} />
        <ComparisonTable />
        <FAQ />

        <section className="py-24 bg-gradient-to-br from-violet-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-noise"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Pare de adiar sua organização financeira.
            </h2>
            <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
              Junte-se a 1.200+ usuários que já saíram do caos das planilhas.
            </p>
            <button 
              onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
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
        onSignupClick={() => {
           setShowExitModal(false);
           setAuthModal({ isOpen: true, mode: 'signup' });
        }}
      />
      
      <AuthModal 
        isOpen={authModal.isOpen} 
        initialMode={authModal.mode} 
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onSuccess={handleAuthSuccess} // Novo prop para disparar login
      />
    </div>
  );
}