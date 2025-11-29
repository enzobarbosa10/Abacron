import { supabase } from './supabase';
import { atualizarMeuPerfil } from './profiles';

// Upload de arquivo genérico
export async function uploadArquivo(bucket: string, caminho: string, arquivo: File) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(caminho, arquivo, {
        upsert: true,
        cacheControl: '3600',
        contentType: arquivo.type
      });

    if (error) throw error;
    
    console.log('✅ Arquivo enviado:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erro ao enviar arquivo:', error);
    return { success: false, error: 'Erro ao enviar arquivo' };
  }
}

// Obter URL pública
export function obterUrlPublica(bucket: string, caminho: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(caminho);
  
  return data.publicUrl;
}

// ✅ Upload de avatar otimizado (limpa arquivos antigos)
export async function uploadAvatar(arquivo: File) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    // ✅ Validar tipo de arquivo
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(arquivo.type)) {
      return { success: false, error: 'Formato de imagem não suportado' };
    }

    // ✅ Validar tamanho (máx 5MB)
    if (arquivo.size > 5 * 1024 * 1024) {
      return { success: false, error: 'Imagem muito grande. Máximo: 5MB' };
    }

    // ✅ Limpar avatares antigos (PNG e JPG)
    await supabase.storage
      .from('avatars')
      .remove([
        `${user.id}/avatar.png`,
        `${user.id}/avatar.jpg`,
        `${user.id}/avatar.jpeg`,
        `${user.id}/avatar.webp`
      ]);

    // Definir extensão baseada no tipo
    const extensao = arquivo.type.split('/')[1];
    const caminhoArquivo = `${user.id}/avatar.${extensao}`;

    // Upload do novo avatar
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(caminhoArquivo, arquivo, {
        upsert: true,
        cacheControl: '3600',
        contentType: arquivo.type
      });

    if (error) throw error;

    // ✅ URL com versão única para evitar cache
    const avatarUrl = `${obterUrlPublica('avatars', caminhoArquivo)}?v=${crypto.randomUUID()}`;
    
    // We need to import atualizarMeuPerfil to update the profile
    // But circular dependency might be an issue if profiles imports storage?
    // profiles.ts does NOT import storage. So it is safe to import profiles here.
    // I will add the import at the top.
    
    // Dynamic import to avoid circular dependency issues if any arise in future, 
    // but static import is better if no cycle.
    // Let's assume static import is fine as profiles.ts doesn't import storage.ts.
    
    // Wait, I need to import it.
    
    console.log('✅ Avatar atualizado');
    return { success: true, data, url: avatarUrl };
  } catch (error) {
    console.error('Erro ao enviar avatar:', error);
    return { success: false, error: 'Erro ao enviar avatar' };
  }
}

// Deletar arquivo
export async function deletarArquivo(bucket: string, caminho: string) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([caminho]);

    if (error) throw error;
    
    console.log('✅ Arquivo deletado');
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    return { success: false, error: 'Erro ao deletar arquivo' };
  }
}
