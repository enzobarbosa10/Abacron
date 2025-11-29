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
import { CookieBanner } from './components/CookieBanner';
import { useExitIntent } from './hooks/useExitIntent';
import { ArrowRight } from 'lucide-react';
import { AppView, UserProfile, Transaction } from './types';
import { BRAND } from './constants';
import { supabase } from './services/supabase';
import { buscarPerfil, atualizarMeuPerfil } from './services/profiles';
import { buscarTransacoes, adicionarTransacoesEmLote } from './services/transactions';

export default function App() {
  // State Navigation
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  
  // App Data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modals (Landing)
  const [showExitModal, setShowExitModal] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });

  // Carregar dados do usuário
  const carregarDadosUsuario = async (userId: string) => {
    setIsLoading(true);
    try {
      console.log('Carregando dados para usuário:', userId);

      // Buscar perfil
      const { data: perfil, success: perfilSuccess } = await buscarPerfil(userId);
      
      // Buscar transações (com tratamento de erro isolado)
      try {
        const { data: transacoes } = await buscarTransacoes();
        if (transacoes) {
          setTransactions(transacoes);
        }
      } catch (tError) {
        console.warn('Erro ao buscar transações (pode ser tabela inexistente):', tError);
      }

      if (perfilSuccess && perfil) {
        console.log('Perfil encontrado. Redirecionando para Dashboard.');
        setUserProfile(perfil as unknown as UserProfile); 
        setCurrentView('DASHBOARD');
      } else {
        console.log('Perfil não encontrado ou erro. Redirecionando para Onboarding.');
        // Se não achou perfil, assume que é novo usuário
        setCurrentView('ONBOARDING');
      }

    } catch (error) {
      console.error('Erro crítico ao carregar dados:', error);
      // Em caso de erro crítico, tentar ir para Onboarding para não travar
      setCurrentView('ONBOARDING');
    } finally {
      setIsLoading(false);
    }
  };

  // Monitorar autenticação
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        carregarDadosUsuario(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        carregarDadosUsuario(session.user.id);
        setAuthModal(prev => ({ ...prev, isOpen: false }));
      } else {
        setUserProfile(null);
        setTransactions([]);
        setCurrentView('LANDING');
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Exit Intent logic (only on landing)
  useExitIntent(() => {
    if (currentView === 'LANDING' && !authModal.isOpen && !userProfile) {
      setShowExitModal(true);
    }
  });

  const handleAuthSuccess = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('DASHBOARD');
    await atualizarMeuPerfil(profile);
  };

  const handleUploadSuccess = async (newTransactions: Transaction[]) => {
    // Remover IDs temporários antes de enviar para o Supabase (que gera UUIDs)
    const transacoesParaSalvar = newTransactions.map(({ id, ...rest }) => rest);

    const { success, data } = await adicionarTransacoesEmLote(transacoesParaSalvar);
    
    if (success && data) {
      setTransactions(prev => [...prev, ...data]);
      setShowUploadModal(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Modo Demo - Entrar sem cadastro
  const handleDemoMode = () => {
    // Criar perfil de demonstração
    const demoProfile: UserProfile = {
      name: 'Usuário Demo',
      monthlyIncome: 5000,
      goal: 'control',
      riskProfile: 'moderate',
      topCategories: ['Alimentação', 'Transporte', 'Lazer']
    };

    // Criar transações de exemplo
    const demoTransactions: Transaction[] = [
      { id: 'demo-1', date: '2025-11-25', description: 'Salário', amount: 5000, type: 'income', category: 'Salário', bank: 'Nubank' },
      { id: 'demo-2', date: '2025-11-24', description: 'Mercado Extra', amount: 450, type: 'expense', category: 'Alimentação', bank: 'Nubank' },
      { id: 'demo-3', date: '2025-11-23', description: 'Uber', amount: 35, type: 'expense', category: 'Transporte', bank: 'Nubank' },
      { id: 'demo-4', date: '2025-11-22', description: 'Netflix', amount: 55, type: 'expense', category: 'Streaming', bank: 'Nubank' },
      { id: 'demo-5', date: '2025-11-21', description: 'Aluguel', amount: 1500, type: 'expense', category: 'Moradia', bank: 'Itaú' },
      { id: 'demo-6', date: '2025-11-20', description: 'Freelance Design', amount: 800, type: 'income', category: 'Freelance', bank: 'Nubank' },
      { id: 'demo-7', date: '2025-11-19', description: 'Restaurante', amount: 120, type: 'expense', category: 'Alimentação', bank: 'Nubank' },
      { id: 'demo-8', date: '2025-11-18', description: 'Gasolina', amount: 200, type: 'expense', category: 'Transporte', bank: 'Itaú' },
      { id: 'demo-9', date: '2025-11-17', description: 'Cinema', amount: 60, type: 'expense', category: 'Lazer', bank: 'Nubank' },
      { id: 'demo-10', date: '2025-11-16', description: 'Farmácia', amount: 85, type: 'expense', category: 'Saúde', bank: 'Itaú' },
    ];

    setUserProfile(demoProfile);
    setTransactions(demoTransactions);
    setAuthModal({ isOpen: false, mode: 'login' });
    setCurrentView('DASHBOARD');
  };

  // --- RENDER VIEWS ---

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
        <Hero 
          onSignupClick={() => setAuthModal({ isOpen: true, mode: 'signup' })} 
          onDemoClick={handleDemoMode}
        />
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
        onSuccess={handleAuthSuccess}
        onDemoMode={handleDemoMode}
      />
      
      <CookieBanner />
    </div>
  );
}