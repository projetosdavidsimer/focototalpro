-- =====================================================
-- Fix RLS Policy for Trigger
-- =====================================================
-- O trigger precisa de uma política especial para inserir
-- Este script é idempotente (pode ser executado múltiplas vezes)

-- Remover todas as políticas existentes de profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users and service role" ON profiles;

-- Recriar políticas corrigidas

-- SELECT: Usuário pode ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- INSERT: Permitir que o trigger crie perfis (SECURITY DEFINER)
-- Esta política permite que qualquer usuário autenticado insira seu próprio perfil
-- O trigger handle_new_user roda com SECURITY DEFINER, então funciona
CREATE POLICY "Enable insert for authenticated users and service role"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: Usuário pode atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: Usuário pode deletar apenas seu próprio perfil
CREATE POLICY "Users can delete own profile" 
  ON profiles FOR DELETE 
  USING (auth.uid() = id);

-- Verificar se as políticas foram criadas
DO $$
BEGIN
  RAISE NOTICE 'Políticas RLS corrigidas com sucesso!';
  RAISE NOTICE 'O trigger agora pode criar perfis automaticamente.';
END $$;
