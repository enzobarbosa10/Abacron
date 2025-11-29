import * as Papa from 'papaparse';
import { Transaction } from '../types';

// Simula uma "IA" de categorização baseada em palavras-chave
const CATEGORY_RULES: Record<string, string[]> = {
  'Alimentação': ['ifood', 'uber eats', 'restaurante', 'padaria', 'mc donalds', 'burger', 'pizza', 'supermercado', 'mercado', 'carrefour'],
  'Transporte': ['uber', '99', 'posto', 'gasolina', 'combustivel', 'estacionamento', 'sem parar'],
  'Serviços': ['netflix', 'spotify', 'amazon prime', 'internet', 'vivo', 'claro', 'tim', 'luz', 'agua'],
  'Saúde': ['farmacia', 'drogaria', 'hospital', 'medico', 'dentista', 'laboratorio'],
  'Compras': ['amazon', 'mercadolivre', 'shopee', 'shein', 'magalu', 'loja'],
  'Receita': ['salario', 'pix recebido', 'transferencia recebida', 'pagamento'],
};

export function categorizeTransaction(description: string, amount: number): { category: string, type: 'income' | 'expense' } {
  const desc = description.toLowerCase();
  
  // Detectar entrada/saída
  const type = amount > 0 ? 'income' : 'expense';

  if (type === 'income') {
    return { category: 'Receita', type };
  }

  // Tentar categorizar por keyword
  for (const [cat, keywords] of Object.entries(CATEGORY_RULES)) {
    if (keywords.some(k => desc.includes(k))) {
      return { category: cat, type };
    }
  }

  return { category: 'Outros', type };
}

export function parseCSV(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    // Robust check for PapaParse default export vs named export in ESM
    // @ts-ignore
    const parse = Papa.parse || (Papa.default && Papa.default.parse);

    if (!parse) {
        reject(new Error("CSV Parser failed to load. Please try again."));
        return;
    }

    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        try {
          // Normalização básica de CSV (assume colunas comuns como Data, Descrição, Valor)
          const transactions: Transaction[] = results.data.map((row: any, index: number) => {
            // Tenta encontrar colunas com nomes variados
            const date = row['Data'] || row['date'] || row['dt'] || new Date().toISOString().split('T')[0];
            const description = row['Descrição'] || row['description'] || row['Historico'] || 'Sem descrição';
            
            // Limpeza de valor (R$ 1.000,00 -> 1000.00)
            let rawAmount = row['Valor'] || row['amount'] || row['Value'] || '0';
            if (typeof rawAmount === 'string') {
              rawAmount = rawAmount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
            }
            const amount = parseFloat(rawAmount);

            const { category, type } = categorizeTransaction(description, amount);

            return {
              id: `trans_${Date.now()}_${index}`,
              date,
              description,
              amount,
              type,
              category,
              bank: 'Importado'
            };
          }).filter((t: Transaction) => !isNaN(t.amount));

          resolve(transactions);
        } catch (e) {
          reject(e);
        }
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function exportToCSV(transactions: Transaction[], filename = 'transacoes.csv') {
  // Converter dados para formato CSV
  const headers = ['Data', 'Descrição', 'Valor', 'Tipo', 'Categoria', 'Banco', 'Notas'];
  const csvContent = [
    headers.join(','),
    ...transactions.map(t => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`, // Escapar aspas
      t.amount.toFixed(2),
      t.type === 'income' ? 'Entrada' : 'Saída',
      t.category,
      t.bank || '',
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  // Criar Blob e Link de Download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}