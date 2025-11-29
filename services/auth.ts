import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

// Função auxiliar para tratar erros de forma segura
function tratarErroAuth(error: AuthError | Error): string {
  console.error('Erro de autenticação:', error);
  
  // ✅ Mensagens amigáveis baseadas no erro
  const mensagens: Record<string, string> = {
    'User already registered': 'E-mail já cadastrado',
    'Password should be at least': 'Senha deve ter no mínimo 6 caracteres',
    'Invalid email': 'E-mail inválido',
    'Invalid login credentials': 'E-mail ou senha incorretos',
    'Email not confirmed': 'Confirme seu e-mail antes de fazer login',
    'For security purposes': 'Aguarde alguns minutos antes de tentar novamente',
    'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos',
    'Invalid Refresh Token': 'Sessão expirada. Faça login novamente',
  };
  
  for (const [chave, mensagem] of Object.entries(mensagens)) {
    if (error.message.includes(chave)) {
      return mensagem;
    }
  }
  
  // ✅ Nunca expor erro técnico completo ao usuário
  return 'Ocorreu um erro. Tente novamente.';
}

// Cadastrar novo usuário
export async function cadastrarUsuario(email: string, senha: string, nome?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          name: nome || 'Usuário' // ✅ Fallback se não enviar nome
        }
      }
    });

    if (error) {
      return { success: false, error: tratarErroAuth(error) };
    }
    
    console.log('✅ Usuário cadastrado:', data);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}

// Login simples
export async function fazerLogin(email: string, senha: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) {
      return { success: false, error: tratarErroAuth(error) };
    }
    
    console.log('✅ Login realizado:', data);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}

// ✅ Login que já traz o perfil junto (otimizado)
export async function loginComPerfil(email: string, senha: string) {
  try {
    const loginResult = await fazerLogin(email, senha);
    if (!loginResult.success || !loginResult.data?.user) return loginResult;

    const userId = loginResult.data.user.id;
    
    // Buscar perfil em paralelo
    const { data: perfil, error: perfilError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (perfilError) {
      console.error('Erro ao buscar perfil:', perfilError);
    }

    return { 
      success: true, 
      user: loginResult.data.user, 
      perfil: perfil || null 
    };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}

// Logout
export async function fazerLogout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: tratarErroAuth(error) };
    }
    
    console.log('✅ Logout realizado');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}

// Verificar usuário logado
export async function obterUsuarioLogado() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      return { success: false, error: tratarErroAuth(error) };
    }
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}

// Escutar mudanças de autenticação
export function escutarMudancasAuth(callback: (event: string, session: any) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );
  
  return () => subscription.unsubscribe();
}

// Resetar senha (com rate limit natural do Supabase)
export async function resetarSenha(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      return { success: false, error: tratarErroAuth(error) };
    }
    
    console.log('✅ Email de recuperação enviado');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: tratarErroAuth(error) };
  }
}
