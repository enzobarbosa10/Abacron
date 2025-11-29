import { supabase } from './supabase';

// Buscar perfil por ID
export async function buscarPerfil(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return { success: false, error: 'Erro ao buscar perfil' };
  }
}

// Buscar todos os perfis (com paginação)
export async function buscarTodosPerfis(pagina = 1, porPagina = 10) {
  try {
    const inicio = (pagina - 1) * porPagina;
    const fim = inicio + porPagina - 1;

    const { data, error, count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .range(inicio, fim)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { 
      success: true, 
      data, 
      total: count,
      pagina,
      totalPaginas: count ? Math.ceil(count / porPagina) : 0
    };
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    return { success: false, error: 'Erro ao buscar perfis' };
  }
}

// Atualizar perfil do usuário logado
export async function atualizarMeuPerfil(dadosNovos: any) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        ...dadosNovos,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    
    console.log('✅ Perfil atualizado:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { success: false, error: 'Erro ao atualizar perfil' };
  }
}

// ✅ Buscar perfis com debounce natural (limite de resultados)
export async function buscarPerfisPorNome(nome: string, limite = 20) {
  try {
    if (!nome || nome.length < 2) {
      return { success: true, data: [] };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('name', `%${nome}%`)
      .limit(limite);

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    return { success: false, error: 'Erro ao buscar perfis' };
  }
}

// ✅ Função auxiliar para usar com debounce no frontend
// Exemplo: const debouncedSearch = debounce(buscarPerfisPorNome, 300);
export function debounce(func: Function, wait: number) {
  let timeout: any;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
