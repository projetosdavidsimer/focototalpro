# Script de Setup Automatizado do Supabase

## Passo 1: Criar Projeto no Supabase

Acesse: https://supabase.com/dashboard/projects

Execute os seguintes passos:

1. Clique em "New Project"
2. Preencha:
   - Organization: Selecione ou crie
   - Name: `focototal-saas`
   - Database Password: [GERE UMA SENHA FORTE]
   - Region: `South America (São Paulo)`
   - Pricing Plan: `Free`
3. Clique em "Create new project"
4. Aguarde ~2 minutos

## Passo 2: Copiar Credenciais

Após o projeto ser criado:

1. Vá em Settings > API
2. Copie as seguintes informações:

```
Project URL: https://[seu-projeto-id].supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Passo 3: Fornecer Credenciais

Cole as credenciais aqui para eu configurar automaticamente:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Após fornecer, continuarei automaticamente com:
- ✅ Aplicar schema SQL
- ✅ Configurar autenticação
- ✅ Atualizar .env.local
- ✅ Testar conexão
- ✅ Implementar dashboard com dados reais
