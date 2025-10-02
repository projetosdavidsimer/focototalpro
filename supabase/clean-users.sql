-- =====================================================
-- Limpar TODOS os Usuários (DEV ONLY)
-- =====================================================
-- ⚠️ CUIDADO: Este script deleta TODOS os usuários!
-- Use apenas em ambiente de desenvolvimento

-- 1. Deletar todos os dados das tabelas (em ordem por causa das foreign keys)
DELETE FROM mock_exams;
DELETE FROM study_sessions;
DELETE FROM subjects;
DELETE FROM profiles;

-- 2. Deletar usuários da tabela de autenticação
-- NOTA: Isso requer privilégios de service_role
DELETE FROM auth.users;

-- Verificação
DO $$
DECLARE
  profile_count INTEGER;
  user_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO profile_count FROM profiles;
  SELECT COUNT(*) INTO user_count FROM auth.users;
  
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Limpeza concluída!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Perfis restantes: %', profile_count;
  RAISE NOTICE 'Usuários restantes: %', user_count;
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Banco de dados limpo e pronto para novos testes!';
  RAISE NOTICE '==============================================';
END $$;
