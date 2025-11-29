import { supabase } from './supabase';
import { Transaction } from '../types';

export async function buscarTransacoes() {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    return { success: true, data: data as Transaction[] };
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return { success: false, error: 'Erro ao buscar transações' };
  }
}

export async function adicionarTransacao(transacao: Omit<Transaction, 'id'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          ...transacao,
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data: data as Transaction };
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    return { success: false, error: 'Erro ao adicionar transação' };
  }
}

export async function adicionarTransacoesEmLote(transacoes: Omit<Transaction, 'id'>[]) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const transacoesComUserId = transacoes.map(t => ({
      ...t,
      user_id: user.id
    }));

    const { data, error } = await supabase
      .from('transactions')
      .insert(transacoesComUserId)
      .select();

    if (error) throw error;

    return { success: true, data: data as Transaction[] };
  } catch (error) {
    console.error('Erro ao adicionar transações:', error);
    return { success: false, error: 'Erro ao adicionar transações' };
  }
}

export async function removerTransacao(id: string) {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Erro ao remover transação:', error);
    return { success: false, error: 'Erro ao remover transação' };
  }
}
