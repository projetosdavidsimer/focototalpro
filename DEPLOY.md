# 🚀 Guia de Deploy - FocoTotal SaaS

## 📋 Pré-requisitos

- [x] Código no GitHub: https://github.com/projetosdavidsimer/my-app
- [ ] Conta Supabase: https://supabase.com
- [ ] Conta Vercel: https://vercel.com
- [ ] Node.js 18+ instalado
- [ ] Git instalado

---

## 🔴 PASSO 1: Configurar Supabase (15 min)

### Opção A: Via Dashboard (Recomendado)

1. **Criar Projeto**
   - Acesse: https://supabase.com/dashboard
   - Clique em "New Project"
   - Nome: `focototal-saas`
   - Database Password: [CRIE UMA SENHA FORTE E SALVE]
   - Region: `South America (São Paulo)`
   - Clique em "Create new project"
   - Aguarde ~2 minutos

2. **Aplicar Schema SQL**
   - Menu lateral → **SQL Editor**
   - Clique em **"New Query"**
   - Abra: `supabase/schema.sql`
   - Copie TODO o conteúdo (Ctrl+A, Ctrl+C)
   - Cole no SQL Editor (Ctrl+V)
   - Clique em **"Run"** (ou F5)
   - Aguarde mensagem: "Success"

3. **Obter Credenciais**
   - Menu lateral → **Settings** → **API**
   - Copie e salve:
     - **Project URL**: `https://[seu-id].supabase.co`
     - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     - **service_role**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. **Configurar Authentication**
   - Menu lateral → **Authentication** → **Providers**
   - **Email**: Verificar se está habilitado (deve estar)
   - **Google OAuth** (opcional):
     - Se quiser, configure agora
     - Se não, pode deixar para depois

5. **Configurar Redirect URLs**
   - Menu lateral → **Authentication** → **URL Configuration**
   - Adicione:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/reset-password`
   - (URLs de produção serão adicionadas depois)

### Opção B: Via CLI

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Criar projeto
supabase projects create focototal-saas --org-id <seu-org-id> --region sa-east-1

# Link local
supabase link --project-ref <project-id>

# Aplicar schema
supabase db push

# Ver credenciais
supabase status
```

---

## 🔴 PASSO 2: Atualizar .env.local (2 min)

1. Abra: `.env.local`
2. Substitua com suas credenciais do Supabase:

```bash
# Supabase - SUAS CREDENCIAIS REAIS
NEXT_PUBLIC_SUPABASE_URL=https://[seu-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[sua-anon-key-completa]
SUPABASE_SERVICE_ROLE_KEY=[sua-service-role-key-completa]

# Stripe - Deixe como está por enquanto
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Salve o arquivo (Ctrl+S)

---

## 🔴 PASSO 3: Testar Localmente (10 min)

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Rodar em desenvolvimento
npm run dev
```

### Checklist de Testes:

1. **Autenticação**
   - [ ] Acessar http://localhost:3000
   - [ ] Criar conta nova
   - [ ] Fazer logout
   - [ ] Fazer login novamente
   - [ ] Testar "Esqueceu a senha?"

2. **Dashboard**
   - [ ] Dashboard carrega sem erros
   - [ ] Métricas aparecem (zeradas é normal)
   - [ ] Gráfico renderiza
   - [ ] Tema claro/escuro funciona

3. **Funcionalidades**
   - [ ] Criar uma matéria em /planner/subjects
   - [ ] Registrar sessão em /planner/sessions
   - [ ] Testar Pomodoro em /planner/pomodoro
   - [ ] Registrar simulado em /simulados
   - [ ] Navegar por todas as páginas

4. **Verificar no Supabase**
   - [ ] Table Editor → profiles (seu usuário deve estar lá)
   - [ ] Table Editor → subjects (matérias criadas)
   - [ ] Table Editor → study_sessions (sessões registradas)
   - [ ] Table Editor → mock_exams (simulados registrados)

**Se tudo funcionar**: Prossiga para o deploy! 🎉  
**Se algo falhar**: Verifique os logs no console (F12)

---

## 🔴 PASSO 4: Deploy na Vercel (15 min)

### 4.1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 4.2. Login na Vercel

```bash
vercel login
```

Escolha o método de login (GitHub, Email, etc)

### 4.3. Conectar Projeto

```bash
# Certifique-se de estar na pasta do projeto
cd "c:\Users\David\Desktop\FocoTotal\Plataforma\my-app"

# Conectar ao Vercel
vercel link
```

Responda as perguntas:
- Set up and deploy? **Y**
- Which scope? **[Sua conta/organização]**
- Link to existing project? **N**
- What's your project's name? **focototal-saas**
- In which directory is your code located? **./** (Enter)

### 4.4. Adicionar Variáveis de Ambiente

```bash
# Supabase URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Cole: https://[seu-project-id].supabase.co

# Supabase Anon Key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Cole: sua anon key completa

# Supabase Service Role Key
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Cole: sua service role key completa

# App URL (será atualizada depois)
vercel env add NEXT_PUBLIC_APP_URL production
# Cole: https://focototal-saas.vercel.app (ou seu domínio)
```

### 4.5. Deploy para Produção

```bash
vercel --prod
```

Aguarde o build e deploy (~2-3 minutos)

### 4.6. Obter URL de Produção

Após o deploy, você receberá uma URL como:
```
https://focototal-saas.vercel.app
```

ou

```
https://focototal-saas-[hash].vercel.app
```

---

## 🔴 PASSO 5: Configurar URLs no Supabase (5 min)

1. Volte ao Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Adicione as URLs de produção:
   - `https://[sua-url].vercel.app/auth/callback`
   - `https://[sua-url].vercel.app/reset-password`

4. **Site URL**: `https://[sua-url].vercel.app`

5. Salve as alterações

---

## 🔴 PASSO 6: Testar em Produção (10 min)

1. Acesse sua URL de produção
2. Crie uma conta nova
3. Teste todas as funcionalidades
4. Verifique se os dados aparecem no Supabase

**Se tudo funcionar**: Parabéns! Está em produção! 🎉

---

## 🟡 PASSO 7: Configurar GitHub Actions (10 min)

### 7.1. Adicionar Secrets no GitHub

1. Acesse: https://github.com/projetosdavidsimer/my-app/settings/secrets/actions
2. Clique em "New repository secret"
3. Adicione cada secret:

**NEXT_PUBLIC_SUPABASE_URL**
```
https://[seu-project-id].supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
[sua-anon-key-completa]
```

**SUPABASE_SERVICE_ROLE_KEY**
```
[sua-service-role-key-completa]
```

### 7.2. Testar GitHub Actions

```bash
# Fazer um commit qualquer
git add .
git commit -m "test: configurar CI/CD"
git push origin main
```

Acesse: https://github.com/projetosdavidsimer/my-app/actions  
Verifique se o workflow passou ✅

---

## 🟡 PASSO 8: Configurar Domínio Próprio (Opcional)

### Se você tiver um domínio:

```bash
vercel domains add focototal.com.br
```

Siga as instruções para configurar DNS

### Ou use o domínio da Vercel:

O domínio `focototal-saas.vercel.app` já funciona!

---

## 🟢 PASSO 9: Monitoramento (Opcional)

### 9.1. Vercel Analytics

```bash
npm install @vercel/analytics
```

Adicione em `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

// No return do layout:
<Analytics />
```

### 9.2. Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

Adicione em `app/layout.tsx`:
```typescript
import { SpeedInsights } from '@vercel/speed-insights/next'

// No return do layout:
<SpeedInsights />
```

---

## 📊 CHECKLIST FINAL

### Antes do Deploy:
- [x] Código no GitHub
- [ ] Supabase configurado
- [ ] Schema SQL aplicado
- [ ] Credenciais obtidas
- [ ] .env.local atualizado
- [ ] Testado localmente
- [ ] Build passa sem erros

### Deploy:
- [ ] Vercel CLI instalado
- [ ] Projeto conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado
- [ ] URL de produção funcionando

### Pós-Deploy:
- [ ] Redirect URLs configurados no Supabase
- [ ] Testado em produção
- [ ] GitHub Actions configurado
- [ ] Secrets adicionados no GitHub
- [ ] Domínio configurado (opcional)
- [ ] Monitoramento ativo (opcional)

---

## 🆘 PROBLEMAS COMUNS

### Build falha na Vercel
**Solução**: Verificar se todas as variáveis de ambiente estão configuradas

### "Invalid API key"
**Solução**: Verificar se as keys do Supabase estão corretas

### Redirect não funciona
**Solução**: Verificar se as URLs estão configuradas no Supabase

### Dados não aparecem
**Solução**: Verificar se RLS está configurado corretamente

---

## 📞 COMANDOS ÚTEIS

```bash
# Ver status do deploy
vercel

# Ver logs
vercel logs

# Remover deploy
vercel remove [deployment-url]

# Ver domínios
vercel domains ls

# Ver variáveis de ambiente
vercel env ls
```

---

## 🎉 PRONTO!

Sua aplicação está em produção! 🚀

**URLs Importantes:**
- Produção: https://[sua-url].vercel.app
- GitHub: https://github.com/projetosdavidsimer/my-app
- Supabase: https://supabase.com/dashboard
- Vercel: https://vercel.com/dashboard

---

**Última atualização**: 2025-01-21  
**Tempo total estimado**: 45-60 minutos
