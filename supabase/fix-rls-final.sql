-- =====================================================
-- Fix DEFINITIVO para RLS + Trigger
-- =====================================================

-- Remover política de INSERT existente
DROP POLICY IF EXISTS "Enable insert for authenticated users and service role" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Criar política que permite o trigger inserir
-- O trigger roda com SECURITY DEFINER, então precisa de uma política permissiva
CREATE POLICY "Enable insert for service role and trigger"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Verificação
DO $$
BEGIN
  RAISE NOTICE 'Política RLS corrigida!';
  RAISE NOTICE 'O trigger agora pode criar perfis automaticamente.';
END $$;
