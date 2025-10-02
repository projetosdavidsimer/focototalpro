# 🚀 COMECE AQUI - FocoTotal Pro

**Tempo total**: 30-40 minutos para estar em produção

---

## 📋 VOCÊ ESTÁ USANDO GIT BASH

Use os scripts `.sh` (não `.bat`)

---

## 🎯 PASSO A PASSO

### 1️⃣ Setup Local (10 min)

```bash
cd ~/Desktop/FocoTotal/Plataforma/my-app
./setup-production.sh
```

**O que faz:**
- ✅ Verifica instalações
- ✅ Instala dependências
- ✅ Cria .env.local
- ✅ Testa build

---

### 2️⃣ Configurar Supabase (15 min)

#### A. Criar Projeto

1. Abrir: https://supabase.com/dashboard
2. Clicar em "New Project"
3. Preencher:
   - Name: `focototal-saas`
   - Password: [CRIAR SENHA FORTE]
   - Region: `South America (São Paulo)`
4. Aguardar 2 minutos

#### B. Aplicar Schema

1. Abrir: SQL Editor no Supabase
2. Clicar em "New Query"
3. Copiar conteúdo de: `supabase/schema.sql`
4. Colar e executar (Run)

#### C. Copiar Credenciais

1. Ir em: Settings → API
2. Copiar:
   - Project URL
   - anon public key
   - service_role key

#### D. Atualizar .env.local

```bash
nano .env.local
# ou
code .env.local
```

Colar suas credenciais:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

#### E. Configurar Auth

1. Ir em: Authentication → Providers
2. Verificar Email habilitado
3. Em URL Configuration:
   - Site URL: `http://localhost:3000`
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/reset-password`

---

### 3️⃣ Testar Local (5 min)

```bash
npm run dev
```

Abrir: http://localhost:3000

**Testar:**
- Criar conta
- Fazer login
- Ver dashboard

Se funcionar ✅ → Prossiga!

---

### 4️⃣ Deploy Vercel (15 min)

```bash
./setup-vercel.sh
```

**O script vai:**
1. Conectar projeto
2. Pedir credenciais do Supabase
3. Configurar variáveis de ambiente
4. Fazer deploy

**Copie a URL gerada!**

---

### 5️⃣ Atualizar Supabase (2 min)

1. Voltar em: Authentication → Providers
2. Adicionar URLs de produção:
   - Site URL: `https://focototalpro.vercel.app`
   - Redirect URLs:
     - `https://focototalpro.vercel.app/auth/callback`
     - `https://focototalpro.vercel.app/reset-password`

---

### 6️�� GitHub Secrets (5 min)

1. Abrir: https://github.com/projetosdavidsimer/focototalpro/settings/secrets/actions
2. Adicionar 3 secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## ✅ PRONTO!

Sua aplicação está no ar! 🎉

**URLs:**
- Local: http://localhost:3000
- Produção: https://focototalpro.vercel.app
- GitHub: https://github.com/projetosdavidsimer/focototalpro
- Supabase: https://supabase.com/dashboard

---

## 🆘 PROBLEMAS?

### Script não executa
```bash
chmod +x setup-production.sh setup-vercel.sh
./setup-production.sh
```

### "Invalid API key"
- Verifique se copiou as keys completas
- As keys são MUITO longas

### Build falha
```bash
npm run build
# Ver erros e corrigir
```

### Não consigo fazer login
- Verifique se schema SQL foi aplicado
- Verifique Redirect URLs no Supabase

---

## 📚 DOCUMENTAÇÃO COMPLETA

```bash
# Guia rápido
cat ../../../temp-files/COMO_CONFIGURAR.md

# Guia completo
cat ../../../temp-files/SETUP_COMPLETO.md
```

---

## 🚀 COMANDOS ÚTEIS

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Deploy
vercel --prod

# Logs
vercel logs

# Status
vercel
```

---

**Comece agora:**

```bash
./setup-production.sh
```

🚀
