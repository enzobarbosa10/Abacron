import { createClient } from '@supabase/supabase-js';

// ✅ Função universal para detectar ambiente (Vite, Next.js, Node.js, SSR)
const getEnv = (key: string): string | undefined => {
  // Node.js / Next.js (process.env)
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key];
  }
  
  // Vite / Browser (import.meta.env)
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // Ignore errors in environments where import.meta is not defined
  }
  
  return undefined;
};

// Carregar variáveis de ambiente de forma universal
const SUPABASE_URL = 
  getEnv('VITE_SUPABASE_URL') || 
  getEnv('NEXT_PUBLIC_SUPABASE_URL') || 
  getEnv('SUPABASE_URL');

const SUPABASE_ANON_KEY = 
  getEnv('VITE_SUPABASE_ANON_KEY') || 
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || 
  getEnv('SUPABASE_ANON_KEY');

// Validação: garantir que as variáveis foram carregadas
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '⚠️ Variáveis de ambiente do Supabase não configuradas!\n' +
    'Crie um arquivo .env com:\n' +
    '- Para Vite: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY\n' +
    '- Para Next.js: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    '- Para Node.js: SUPABASE_URL e SUPABASE_ANON_KEY'
  );
}

// Criar cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
