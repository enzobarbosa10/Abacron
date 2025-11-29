# Configuração do Banco de Dados Supabase

Para que o sistema funcione corretamente (Login, Dashboard, Transações), você precisa criar as tabelas no seu projeto Supabase.

1. Acesse o painel do seu projeto no [Supabase](https://supabase.com/dashboard).
2. Vá até a seção **SQL Editor** (ícone de terminal na barra lateral esquerda).
3. Clique em **New Query**.
4. Copie e cole o código abaixo e clique em **Run**.

```sql
-- 1. Criar tabela de perfis
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT DEFAULT 'Usuário',
  avatar_url TEXT,
  bio TEXT,
  monthlyIncome NUMERIC,
  goal TEXT,
  riskProfile TEXT,
  topCategories JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS (Segurança)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Acesso para Perfis
CREATE POLICY "Perfis são públicos para leitura" ON profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem criar seu perfil" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seu perfil" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 4. Trigger para criar perfil automaticamente ao cadastrar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'Usuário'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Criar tabela de transações
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  bank TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Habilitar RLS para Transações
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 7. Políticas de Acesso para Transações
CREATE POLICY "Usuários podem ver suas transações" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar transações" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar suas transações" ON transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar suas transações" ON transactions FOR DELETE USING (auth.uid() = user_id);

-- 8. Bucket de Storage para Avatares
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatares são públicos" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Usuários podem fazer upload de avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
```
