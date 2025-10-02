-- =====================================================
-- FocoTotal SaaS - Database Schema (CORRIGIDO)
-- =====================================================
-- Descrição: Schema completo para o MVP do FocoTotal
-- Versão: 2.0.0 (com RLS corrigido para triggers)
-- Data: 2025-01-21
-- =====================================================

-- =====================================================
-- 1. LIMPEZA (Remover políticas antigas se existirem)
-- =====================================================

-- Remover políticas antigas de profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users and service role" ON profiles;

-- =====================================================
-- 2. EXTENSÕES
-- =====================================================

-- Habilitar extensão UUID (caso não esteja habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 3. TABELAS
-- =====================================================

-- -----------------------------------------------------
-- Tabela: profiles
-- Descrição: Perfis de usuários (estende auth.users)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'cancelled')),
  subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);

-- Comentários
COMMENT ON TABLE profiles IS 'Perfis de usuários do FocoTotal';
COMMENT ON COLUMN profiles.subscription_status IS 'Status da assinatura: free, premium, cancelled';

-- -----------------------------------------------------
-- Tabela: subjects
-- Descrição: Matérias de estudo do usuário
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3b82f6',
  target_hours_per_week INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_subjects_user_id ON subjects(user_id);

-- Comentários
COMMENT ON TABLE subjects IS 'Matérias de estudo cadastradas pelo usuário';
COMMENT ON COLUMN subjects.color IS 'Cor hexadecimal para identificação visual';
COMMENT ON COLUMN subjects.target_hours_per_week IS 'Meta de horas semanais para a matéria';

-- -----------------------------------------------------
-- Tabela: study_sessions
-- Descrição: Sessões de estudo registradas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_subject_id ON study_sessions(subject_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON study_sessions(date);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_date ON study_sessions(user_id, date);

-- Comentários
COMMENT ON TABLE study_sessions IS 'Sessões de estudo registradas pelo usuário';
COMMENT ON COLUMN study_sessions.duration_minutes IS 'Duração da sessão em minutos';

-- -----------------------------------------------------
-- Tabela: mock_exams
-- Descrição: Simulados realizados pelo usuário
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS mock_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  correct_answers INTEGER NOT NULL CHECK (correct_answers >= 0),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  subject_breakdown JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_correct_answers CHECK (correct_answers <= total_questions)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_mock_exams_user_id ON mock_exams(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_exams_date ON mock_exams(date);
CREATE INDEX IF NOT EXISTS idx_mock_exams_user_date ON mock_exams(user_id, date);

-- Comentários
COMMENT ON TABLE mock_exams IS 'Simulados realizados e registrados pelo usuário';
COMMENT ON COLUMN mock_exams.subject_breakdown IS 'Detalhamento de acertos por matéria em formato JSON';

-- =====================================================
-- 4. ROW LEVEL SECURITY (RLS) - CORRIGIDO
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_exams ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------
-- Políticas RLS: profiles (CORRIGIDAS PARA TRIGGER)
-- -----------------------------------------------------

-- SELECT: Usuário pode ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  TO authenticated
  USING (auth.uid() = id);

-- INSERT: Permitir que o trigger crie perfis automaticamente
-- O trigger roda com SECURITY DEFINER, então precisa de uma política permissiva
CREATE POLICY "Enable insert for authenticated users and service role"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: Usuário pode atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: Usuário pode deletar apenas seu próprio perfil
CREATE POLICY "Users can delete own profile" 
  ON profiles FOR DELETE 
  TO authenticated
  USING (auth.uid() = id);

-- -----------------------------------------------------
-- Políticas RLS: subjects
-- -----------------------------------------------------

-- SELECT: Usuário pode ver apenas suas próprias matérias
CREATE POLICY "Users can view own subjects" 
  ON subjects FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Usuário pode criar apenas suas próprias matérias
CREATE POLICY "Users can insert own subjects" 
  ON subjects FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Usuário pode atualizar apenas suas próprias matérias
CREATE POLICY "Users can update own subjects" 
  ON subjects FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Usuário pode deletar apenas suas próprias matérias
CREATE POLICY "Users can delete own subjects" 
  ON subjects FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------
-- Políticas RLS: study_sessions
-- -----------------------------------------------------

-- SELECT: Usuário pode ver apenas suas próprias sessões
CREATE POLICY "Users can view own study sessions" 
  ON study_sessions FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Usuário pode criar apenas suas próprias sessões
CREATE POLICY "Users can insert own study sessions" 
  ON study_sessions FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Usuário pode atualizar apenas suas próprias sessões
CREATE POLICY "Users can update own study sessions" 
  ON study_sessions FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Usuário pode deletar apenas suas próprias sessões
CREATE POLICY "Users can delete own study sessions" 
  ON study_sessions FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------
-- Políticas RLS: mock_exams
-- -----------------------------------------------------

-- SELECT: Usuário pode ver apenas seus próprios simulados
CREATE POLICY "Users can view own mock exams" 
  ON mock_exams FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Usuário pode criar apenas seus próprios simulados
CREATE POLICY "Users can insert own mock exams" 
  ON mock_exams FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Usuário pode atualizar apenas seus próprios simulados
CREATE POLICY "Users can update own mock exams" 
  ON mock_exams FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Usuário pode deletar apenas seus próprios simulados
CREATE POLICY "Users can delete own mock exams" 
  ON mock_exams FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

-- -----------------------------------------------------
-- Função: update_updated_at_column
-- Descrição: Atualiza automaticamente o campo updated_at
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas com updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subjects_updated_at ON subjects;
CREATE TRIGGER update_subjects_updated_at
  BEFORE UPDATE ON subjects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_study_sessions_updated_at ON study_sessions;
CREATE TRIGGER update_study_sessions_updated_at
  BEFORE UPDATE ON study_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mock_exams_updated_at ON mock_exams;
CREATE TRIGGER update_mock_exams_updated_at
  BEFORE UPDATE ON mock_exams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Função: handle_new_user
-- Descrição: Cria perfil automaticamente quando novo usuário se registra
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- 6. FUNÇÕES ÚTEIS
-- =====================================================

-- -----------------------------------------------------
-- Função: get_weekly_study_hours
-- Descrição: Retorna total de horas estudadas na semana
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION get_weekly_study_hours(user_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(duration_minutes), 0)::INTEGER
  FROM study_sessions
  WHERE user_id = user_uuid
    AND date >= CURRENT_DATE - INTERVAL '7 days'
    AND date <= CURRENT_DATE;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- -----------------------------------------------------
-- Função: get_subject_performance
-- Descrição: Retorna desempenho por matéria nos simulados
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION get_subject_performance(user_uuid UUID)
RETURNS TABLE (
  subject_name TEXT,
  total_questions INTEGER,
  correct_answers INTEGER,
  accuracy NUMERIC
) AS $$
  SELECT 
    s.name as subject_name,
    SUM((me.subject_breakdown->>s.name)::INTEGER) as total_questions,
    SUM((me.subject_breakdown->>(s.name || '_correct'))::INTEGER) as correct_answers,
    ROUND(
      (SUM((me.subject_breakdown->>(s.name || '_correct'))::INTEGER)::NUMERIC / 
       NULLIF(SUM((me.subject_breakdown->>s.name)::INTEGER), 0)) * 100, 
      2
    ) as accuracy
  FROM subjects s
  LEFT JOIN mock_exams me ON me.user_id = s.user_id
  WHERE s.user_id = user_uuid
  GROUP BY s.name;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- =====================================================
-- 7. VERIFICAÇÃO FINAL
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Schema FocoTotal v2.0 criado com sucesso!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Tabelas: profiles, subjects, study_sessions, mock_exams';
  RAISE NOTICE 'RLS habilitado em todas as tabelas';
  RAISE NOTICE 'RLS corrigido para funcionar com triggers';
  RAISE NOTICE 'Triggers configurados';
  RAISE NOTICE 'Funções úteis criadas';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'Pronto para registrar usuários!';
  RAISE NOTICE '==============================================';
END $$;
