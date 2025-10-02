# Setup Supabase via CLI

## Opção 1: Você Faz Login e Me Fornece o Token

### Passo 1: Fazer Login no Supabase
```bash
npx supabase login
```

Isso abrirá o navegador para você fazer login. Após o login, você receberá um token de acesso.

### Passo 2: Fornecer o Token
Cole o token aqui para eu continuar:
```
SUPABASE_ACCESS_TOKEN=sbp_...
```

---

## Opção 2: Criar Projeto Manualmente (Mais Rápido)

Como a CLI requer autenticação interativa, é mais rápido você criar o projeto manualmente:

### 1. Acesse: https://supabase.com/dashboard/projects

### 2. Clique em "New Project"

### 3. Preencha:
- **Name**: `focototal-saas`
- **Database Password**: [CRIE UMA SENHA FORTE]
- **Region**: `South America (São Paulo)`
- **Plan**: `Free`

### 4. Após criar, copie as credenciais:

Vá em Settings > API e copie:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Cole as credenciais aqui:

Depois eu aplico o schema SQL automaticamente via API.

---

## Opção 3: Usar Supabase Management API

Se você me fornecer um Personal Access Token do Supabase, posso criar o projeto completamente via API.

### Como obter o token:
1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em "Generate new token"
3. Dê um nome: "FocoTotal CLI"
4. Copie o token
5. Cole aqui:

```
SUPABASE_ACCESS_TOKEN=sbp_...
```

Com esse token, posso:
- ✅ Criar o projeto
- ✅ Aplicar o schema SQL
- ✅ Configurar autenticação
- ✅ Copiar as credenciais automaticamente

---

## Qual opção você prefere?

**Opção 1**: Você faz login e me dá o token (mais seguro)
**Opção 2**: Você cria manualmente e me dá as credenciais (mais rápido)
**Opção 3**: Você gera um token de acesso e eu faço tudo (mais automatizado)

Escolha a opção que preferir e me forneça as informações necessárias.
