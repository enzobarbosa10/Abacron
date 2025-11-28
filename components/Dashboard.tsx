import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Upload, ArrowUpCircle, ArrowDownCircle, DollarSign, Filter, Download, Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { Transaction, UserProfile } from '../types';
import { formatCurrency } from '../utils/finance';
import { BRAND } from '../constants';

interface DashboardProps {
  user: UserProfile;
  transactions: Transaction[];
  onUploadRequest: () => void;
  onLogout: () => void;
}

export function Dashboard({ user, transactions, onUploadRequest, onLogout }: DashboardProps) {
  const [filter, setFilter] = useState('all');

  // Cálculos
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Math.abs(t.amount), 0); // Ensure positive
  const balance = totalIncome - totalExpense;

  // Dados para Gráficos
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3A0CA3', '#F72585', '#4CC9F0', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-lg">{BRAND.name}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-slate-600">Sincronizado</span>
            </div>
            <button onClick={onLogout} className="text-sm font-medium text-slate-500 hover:text-red-500">Sair</button>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold border border-purple-200">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Olá, {user.name} 👋</h1>
            <p className="text-slate-500">Aqui está o resumo financeiro do seu mês.</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => alert('Exportação em breve!')} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 shadow-sm transition">
               <Download className="w-4 h-4" /> Exportar
             </button>
             <button onClick={onUploadRequest} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 shadow-md transition">
               <Upload className="w-4 h-4" /> Novo Upload
             </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <ArrowUpCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Entradas</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalIncome)}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <ArrowDownCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-500">Saídas</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalExpense)}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Expenses Pie Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Gastos por Categoria</h3>
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
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">Sem dados de despesa</div>
              )}
            </div>
          </div>

          {/* Insights Panel */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-lg text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> Insights do Abacron
            </h3>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                <h4 className="font-bold text-purple-300 text-sm mb-1 uppercase tracking-wide">Alerta de Perfil</h4>
                <p className="text-sm leading-relaxed">
                  Seu perfil é <strong>{user.riskProfile === 'conservative' ? 'Conservador' : user.riskProfile === 'moderate' ? 'Moderado' : 'Arrojado'}</strong>, 
                  mas você gastou {((totalExpense / (totalIncome || 1)) * 100).toFixed(0)}% da sua renda. 
                  {balance < 0 ? ' Atenção! Você está gastando mais do que ganha.' : ' Ótimo trabalho mantendo o saldo positivo.'}
                </p>
              </div>
              
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                <h4 className="font-bold text-pink-300 text-sm mb-1 uppercase tracking-wide">Maior Gasto</h4>
                <p className="text-sm leading-relaxed">
                  A categoria <strong>{pieData.sort((a,b) => b.value - a.value)[0]?.name || 'N/A'}</strong> representa a maior parte das suas saídas.
                  Considere definir um limite de gastos aqui.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition">
              Ver Análise Completa
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-slate-800">Últimas Transações</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-purple-500 w-full sm:w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Descrição</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {transactions.slice(0, 10).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{t.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
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
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-purple-600"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                   <tr>
                     <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        Nenhuma transação encontrada. Faça upload do seu extrato.
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
          {transactions.length > 0 && (
             <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
               Mostrando as últimas 10 transações de {transactions.length}
             </div>
          )}
        </div>
      </main>
    </div>
  );
}