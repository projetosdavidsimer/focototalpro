-- =====================================================
-- Limpar TODAS as Políticas RLS
-- =====================================================
-- Execute este script PRIMEIRO para limpar tudo

-- Remover políticas de profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users and service role" ON profiles;

-- Remover políticas de subjects
DROP POLICY IF EXISTS "Users can view own subjects" ON subjects;
DROP POLICY IF EXISTS "Users can insert own subjects" ON subjects;
DROP POLICY IF EXISTS "Users can update own subjects" ON subjects;
DROP POLICY IF EXISTS "Users can delete own subjects" ON subjects;

-- Remover políticas de study_sessions
DROP POLICY IF EXISTS "Users can view own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can insert own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can update own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can delete own study sessions" ON study_sessions;

-- Remover políticas de mock_exams
DROP POLICY IF EXISTS "Users can view own mock exams" ON mock_exams;
DROP POLICY IF EXISTS "Users can insert own mock exams" ON mock_exams;
DROP POLICY IF EXISTS "Users can update own mock exams" ON mock_exams;
DROP POLICY IF EXISTS "Users can delete own mock exams" ON mock_exams;

-- Verificação
DO $$
BEGIN
  RAISE NOTICE 'Todas as políticas RLS foram removidas!';
  RAISE NOTICE 'Agora execute o schema-v2.sql';
END $$;
