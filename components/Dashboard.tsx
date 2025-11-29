import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Upload, ArrowUpCircle, ArrowDownCircle, DollarSign, Filter, Download, Plus, Search, Trash2, Edit2, Menu, Bell, Settings, HelpCircle } from 'lucide-react';
import { Transaction, UserProfile, FinancialGoal } from '../types';
import { formatCurrency, exportToCSV } from '../utils/finance';
import { BRAND } from '../constants';
import { GoalsPanel } from './GoalsPanel';
import { InsightsPanel } from './InsightsPanel';
import { ActivationBanner } from './ActivationBanner';
import { TransactionModal } from './TransactionModal';

interface DashboardProps {
  user: UserProfile;
  transactions: Transaction[];
  onUploadRequest: () => void;
  onLogout: () => void;
}

export function Dashboard({ user, transactions, onUploadRequest, onLogout }: DashboardProps) {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>(transactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const [activationSteps, setActivationSteps] = useState([
    { id: 'upload', label: 'Fazer primeiro upload', completed: transactions.length > 0, action: onUploadRequest },
    { id: 'profile', label: 'Completar perfil', completed: !!user.riskProfile, action: () => {} },
    { id: 'goal', label: 'Criar uma meta', completed: goals.length > 0, action: () => document.getElementById('goals-panel')?.scrollIntoView({ behavior: 'smooth' }) },
  ]);

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    setActivationSteps(prev => prev.map(step => {
      if (step.id === 'upload') return { ...step, completed: localTransactions.length > 0 };
      if (step.id === 'goal') return { ...step, completed: goals.length > 0 };
      return step;
    }));
  }, [localTransactions, goals]);

  // Cálculos
  const totalIncome = localTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = localTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // Dados para Gráficos
  const expensesByCategory = localTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const barData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#3A0CA3', '#F72585', '#4CC9F0', '#10B981', '#F59E0B', '#EF4444'];

  const handleAddGoal = (goal: FinancialGoal) => {
    setGoals([...goals, goal]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleEditTransaction = (t: Transaction) => {
    setSelectedTransaction(t);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (updated: Transaction) => {
    setLocalTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      setLocalTransactions(prev => prev.filter(t => t.id !== id));
      setIsModalOpen(false);
    }
  };

  const filteredTransactions = localTransactions.filter(t => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">{BRAND.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-slate-600">Sincronizado</span>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-purple-600 transition"><Bell className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:text-purple-600 transition"><Settings className="w-5 h-5" /></button>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <button onClick={onLogout} className="text-sm font-medium text-slate-500 hover:text-red-500">Sair</button>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Olá, {user.name} 👋</h1>
            <p className="text-slate-500">Aqui está o resumo financeiro do seu mês.</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => exportToCSV(localTransactions, `extrato-${user.name}.csv`)} 
               className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 shadow-sm transition"
             >
               <Download className="w-4 h-4" /> Exportar CSV
             </button>
             <button onClick={onUploadRequest} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
               <Upload className="w-4 h-4" /> Novo Upload
             </button>
          </div>
        </div>

        {/* Activation Banner */}
        <ActivationBanner steps={activationSteps} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <ArrowUpCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Entradas</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalIncome)}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <ArrowDownCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Saídas</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalExpense)}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Saldo Atual</span>
            </div>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column (Charts) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Charts Container */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Expenses Pie Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Gastos por Categoria</h3>
                <div className="h-64 w-full">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <PieChart className="w-12 h-12 mb-2 opacity-20" />
                      <p>Sem dados</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Top 5 Despesas</h3>
                <div className="h-64 w-full">
                  {barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical" margin={{ left: 40 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 10}} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <BarChart className="w-12 h-12 mb-2 opacity-20" />
                      <p>Sem dados</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-lg font-bold text-slate-800">Últimas Transações</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar..." 
                      className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 w-full sm:w-48 transition"
                    />
                  </div>
                  <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Descrição</th>
                      <th className="px-6 py-4">Categoria</th>
                      <th className="px-6 py-4 text-right">Valor</th>
                      <th className="px-6 py-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredTransactions.slice(0, 8).map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50 transition group cursor-pointer" onClick={() => handleEditTransaction(t)}>
                        <td className="px-6 py-4 whitespace-nowrap text-slate-500">{t.date}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{t.description}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            t.category === 'Receita' ? 'bg-green-100 text-green-700' : 
                            t.category === 'Alimentação' ? 'bg-orange-100 text-orange-700' :
                            t.category === 'Transporte' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {t.category}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-green-600' : 'text-slate-900'}`}>
                          {t.type === 'expense' ? '- ' : '+ '}{formatCurrency(Math.abs(t.amount))}
                        </td>
                        <td className="px-6 py-4 text-center flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEditTransaction(t); }}
                            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-purple-600 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(t.id); }}
                            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                       <tr>
                         <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                            <div className="flex flex-col items-center">
                              <Upload className="w-12 h-12 mb-3 opacity-20" />
                              <p className="font-medium">Nenhuma transação encontrada.</p>
                              <button onClick={onUploadRequest} className="text-purple-600 text-sm font-bold mt-2 hover:underline">Fazer Upload Agora</button>
                            </div>
                         </td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (Insights & Goals) */}
          <div className="space-y-8">
            <InsightsPanel user={user} transactions={localTransactions} />
            
            <div id="goals-panel">
              <GoalsPanel 
                goals={goals} 
                onAddGoal={handleAddGoal} 
                onDeleteGoal={handleDeleteGoal} 
              />
            </div>

            {/* Premium Teaser */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-2">Seja Premium 👑</h3>
              <p className="text-sm text-amber-800 mb-4">Desbloqueie gráficos ilimitados, exportação em PDF e suporte prioritário.</p>
              <button className="w-full py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition shadow-sm">
                Ver Planos
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Modals */}
      <TransactionModal 
        isOpen={isModalOpen}
        transaction={selectedTransaction}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}
