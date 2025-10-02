-- =====================================================
-- Fix Trigger - Usar UPSERT ao invés de INSERT
-- =====================================================

-- Recriar função com UPSERT (INSERT ... ON CONFLICT)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verificação
DO $$
BEGIN
  RAISE NOTICE 'Trigger corrigido com UPSERT!';
  RAISE NOTICE 'Agora não haverá mais erro de duplicate key.';
END $$;
