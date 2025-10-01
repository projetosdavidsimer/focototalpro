# SECURITY - FocoTotal SaaS

## Checklist de Segurança Enterprise

Este documento segue o padrão estabelecido em `/Rules/checklist.md`

---

## ✅ Status Atual

### 1. Repositório
- [x] Repositório criado localmente
- [ ] Repositório criado como **Privado** na Organização GitHub
- [x] README.md inicial criado
- [x] .gitignore configurado para Next.js/TypeScript

### 2. Branches
- [ ] Branch principal definida como **main**
- [ ] Proteção ativada na branch main:
  - [ ] Push direto bloqueado
  - [ ] Pull Request obrigatório para merge
  - [ ] Pelo menos **1 Code Review** exigido
  - [ ] Status checks (CI/CD) obrigatórios

### 3. Acesso e Permissões
- [ ] Colaboradores adicionados via **Organização**
- [ ] Papéis atribuídos:
  - [ ] Owner/Admin
  - [ ] Maintainer
  - [ ] Developer
  - [ ] Viewer
- [ ] 2FA obrigatório para todos os membros

### 4. Segredos e Credenciais
- [x] .env* adicionado ao .gitignore
- [ ] GitHub Secrets configurados:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Vercel Environment Variables configuradas
- [ ] Nenhum segredo commitado no repositório

### 5. CI/CD
- [ ] GitHub Actions configurado:
  - [ ] Rodar testes automatizados
  - [ ] Rodar build (`npm run build`)
  - [ ] Rodar linter/type check
- [ ] Deploy automatizado para Vercel

### 6. Auditoria e Logs
- [ ] Auditoria de commits ativada
- [ ] Logs do agente em `/logs` (se aplicável)
- [ ] Monitoramento de acessos configurado

---

## 🔒 Regras de Ouro

1. ✅ **Nunca compartilhar tokens pessoais**
2. ✅ **Nunca commitar arquivos com segredos**
3. ⚠️ **Sempre revisar PRs antes do merge** (pendente configuração)
4. ⚠️ **Sempre rodar CI/CD antes do deploy** (pendente configuração)
5. ⚠️ **Remover acessos de colaboradores que saírem imediatamente** (pendente configuração)

---

## 🛡️ Segurança do Supabase

### Row Level Security (RLS)
Todas as tabelas devem ter RLS habilitado:

```sql
-- Exemplo: Tabela profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### Políticas Necessárias

#### Tabela: profiles
- [x] RLS habilitado
- [ ] Policy: SELECT próprio perfil
- [ ] Policy: UPDATE próprio perfil
- [ ] Policy: INSERT próprio perfil

#### Tabela: subjects
- [ ] RLS habilitado
- [ ] Policy: SELECT próprias matérias
- [ ] Policy: INSERT próprias matérias
- [ ] Policy: UPDATE próprias matérias
- [ ] Policy: DELETE próprias matérias

#### Tabela: study_sessions
- [ ] RLS habilitado
- [ ] Policy: SELECT próprias sessões
- [ ] Policy: INSERT próprias sessões
- [ ] Policy: UPDATE próprias sessões
- [ ] Policy: DELETE próprias sessões

#### Tabela: mock_exams
- [ ] RLS habilitado
- [ ] Policy: SELECT próprios simulados
- [ ] Policy: INSERT próprios simulados
- [ ] Policy: UPDATE próprios simulados
- [ ] Policy: DELETE próprios simulados

---

## 🔐 Variáveis de Ambiente

### Arquivo: `.env.local` (NÃO COMMITAR)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚨 Vulnerabilidades Conhecidas

Nenhuma vulnerabilidade conhecida no momento.

---

## 📋 Próximas Ações de Segurança

1. Criar repositório privado na Organização GitHub
2. Configurar proteção de branch main
3. Adicionar todos os secrets necessários
4. Configurar Supabase com RLS em todas as tabelas
5. Implementar middleware de autenticação
6. Configurar CI/CD com checks de segurança
7. Ativar 2FA para todos os colaboradores

---

**Última atualização**: 2025-01-XX
**Responsável**: Equipe FocoTotal
