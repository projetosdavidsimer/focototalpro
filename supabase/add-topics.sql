-- =====================================================
-- Adicionar tabela de Topics (Assuntos)
-- =====================================================

-- -----------------------------------------------------
-- Tabela: topics
-- Descrição: Assuntos dentro de cada matéria
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_topics_subject_id ON topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_user_id ON topics(user_id);

-- Comentários
COMMENT ON TABLE topics IS 'Assuntos/tópicos dentro de cada matéria';
COMMENT ON COLUMN topics.mastery_level IS 'Nível de domínio do assunto (0-100)';

-- -----------------------------------------------------
-- RLS para topics
-- -----------------------------------------------------
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- SELECT: Usuário pode ver apenas seus próprios assuntos
CREATE POLICY "Users can view own topics" 
  ON topics FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Usuário pode criar apenas seus próprios assuntos
CREATE POLICY "Users can insert own topics" 
  ON topics FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Usuário pode atualizar apenas seus próprios assuntos
CREATE POLICY "Users can update own topics" 
  ON topics FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Usuário pode deletar apenas seus próprios assuntos
CREATE POLICY "Users can delete own topics" 
  ON topics FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------
-- Trigger para updated_at
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS update_topics_updated_at ON topics;
CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON topics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Adicionar topic_id em study_sessions (opcional)
-- -----------------------------------------------------
ALTER TABLE study_sessions 
ADD COLUMN IF NOT EXISTS topic_id UUID REFERENCES topics(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_study_sessions_topic_id ON study_sessions(topic_id);

COMMENT ON COLUMN study_sessions.topic_id IS 'Assunto específico estudado na sessão (opcional)';
