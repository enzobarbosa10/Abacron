export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; // Valor em centavos ou float, dependendo da implementação. Usaremos float para simplificar demo.
  type: 'income' | 'expense';
  category: string;
  bank?: string;
}

export interface UserProfile {
  name: string;
  monthlyIncome: number;
  goal: 'save' | 'invest' | 'control';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  topCategories: string[];
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  type: 'saving' | 'expense_reduction';
}

export type AppView = 'LANDING' | 'ONBOARDING' | 'DASHBOARD';