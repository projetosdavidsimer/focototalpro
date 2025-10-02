-- =====================================================
-- AUDITORIA COMPLETA DO BANCO
-- =====================================================

-- 1. Verificar usuários na tabela auth.users
SELECT 
  'AUTH USERS' as tabela,
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. Verificar perfis na tabela profiles
SELECT 
  'PROFILES' as tabela,
  id,
  email,
  full_name,
  created_at
FROM profiles
ORDER BY created_at DESC;

-- 3. Verificar se há usuários sem perfil
SELECT 
  'USUARIOS SEM PERFIL' as status,
  u.id,
  u.email,
  u.created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- 4. Verificar se há perfis sem usuário (órfãos)
SELECT 
  'PERFIS ORFAOS' as status,
  p.id,
  p.email,
  p.created_at
FROM profiles p
LEFT JOIN auth.users u ON p.id = u.id
WHERE u.id IS NULL;

-- 5. Verificar trigger
SELECT 
  'TRIGGER' as tipo,
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 6. Verificar políticas RLS de profiles
SELECT 
  'RLS POLICIES' as tipo,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- 7. Contar registros
SELECT 
  'CONTAGEM' as tipo,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM profiles) as total_profiles,
  (SELECT COUNT(*) FROM subjects) as total_subjects,
  (SELECT COUNT(*) FROM study_sessions) as total_sessions,
  (SELECT COUNT(*) FROM mock_exams) as total_exams;
