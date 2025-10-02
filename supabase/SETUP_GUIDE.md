# Guia de Setup do Supabase - FocoTotal

Este guia detalha o processo completo de configuração do Supabase para o projeto FocoTotal.

---

## 1. Criar Projeto no Supabase

### Passo 1.1: Acessar Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"

### Passo 1.2: Configurar Projeto
- **Organization**: Selecione ou crie uma organização
- **Name**: `focototal-saas` (ou nome de sua preferência)
- **Database Password**: Crie uma senha forte e **SALVE EM LOCAL SEGURO**
- **Region**: Escolha a região mais próxima (ex: South America - São Paulo)
- **Pricing Plan**: Free (para desenvolvimento)

### Passo 1.3: Aguardar Criação
- O projeto levará ~2 minutos para ser criado
- Aguarde até ver o dashboard do projeto

---

## 2. Aplicar Schema do Banco de Dados

### Passo 2.1: Acessar SQL Editor
1. No dashboard do Supabase, clique em "SQL Editor" no menu lateral
2. Clique em "New Query"

### Passo 2.2: Executar Schema
1. Abra o arquivo `supabase/schema.sql` deste projeto
2. Copie **TODO** o conteúdo do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em "Run" (ou pressione Ctrl+Enter)

### Passo 2.3: Verificar Sucesso
Você deve ver mensagens de sucesso:
```
Schema FocoTotal criado com sucesso!
Tabelas: profiles, subjects, study_sessions, mock_exams
RLS habilitado em todas as tabelas
Triggers configurados
Funções úteis criadas
```

### Passo 2.4: Verificar Tabelas
1. Clique em "Table Editor" no menu lateral
2. Você deve ver as tabelas:
   - profiles
   - subjects
   - study_sessions
   - mock_exams

---

## 3. Configurar Autenticação

### Passo 3.1: Habilitar Email/Password
1. Clique em "Authentication" no menu lateral
2. Clique em "Providers"
3. Localize "Email" e certifique-se que está **habilitado**
4. Configurações recomendadas:
   - ✅ Enable email confirmations (desabilitar para dev, habilitar para prod)
   - ✅ Enable email change confirmations
   - ✅ Secure email change

### Passo 3.2: Configurar Google OAuth (Opcional)
1. Ainda em "Providers", localize "Google"
2. Clique em "Enable"
3. Você precisará:
   - **Client ID** do Google Cloud Console
   - **Client Secret** do Google Cloud Console
4. Para obter as credenciais:
   - Acesse [Google Cloud Console](https://console.cloud.google.com)
   - Crie um novo projeto ou use existente
   - Habilite "Google+ API"
   - Crie credenciais OAuth 2.0
   - Configure redirect URI: `https://seu-projeto.supabase.co/auth/v1/callback`

### Passo 3.3: Configurar URLs de Redirecionamento
1. Clique em "URL Configuration"
2. Adicione as URLs:
   - **Site URL**: `http://localhost:3000` (dev) ou `https://seu-dominio.com` (prod)
   - **Redirect URLs**: 
     - `http://localhost:3000/auth/callback`
     - `https://seu-dominio.com/auth/callback` (quando tiver)

---

## 4. Copiar Credenciais

### Passo 4.1: Acessar API Settings
1. Clique em "Settings" no menu lateral
2. Clique em "API"

### Passo 4.2: Copiar Credenciais
Você verá três informações importantes:

**Project URL**
```
https://seu-projeto-id.supabase.co
```

**anon public (API Key)**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role (Secret Key)**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**: 
- A `anon public` key é segura para usar no frontend
- A `service_role` key é **SECRETA** e deve ser usada apenas no backend
- **NUNCA** commite essas chaves no Git

---

## 5. Configurar Variáveis de Ambiente

### Passo 5.1: Editar .env.local
1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os placeholders pelas credenciais reais:

```bash
# Supabase - SUBSTITUA COM SUAS CREDENCIAIS REAIS
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Stripe - Configure depois
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Passo 5.2: Verificar .gitignore
Certifique-se que `.env.local` está no `.gitignore`:
```
.env.local
.env*.local
```

---

## 6. Testar Conexão

### Passo 6.1: Instalar Dependências
```bash
cd Plataforma/my-app
npm install
```

### Passo 6.2: Testar Build
```bash
npm run build
```

Deve compilar sem erros.

### Passo 6.3: Iniciar Servidor
```bash
npm run dev
```

### Passo 6.4: Testar Autenticação
1. Acesse http://localhost:3000
2. Clique em "Registrar" ou vá para http://localhost:3000/register
3. Crie uma conta de teste:
   - Email: seu-email@teste.com
   - Senha: senha-forte-123
4. Clique em "Criar Conta"
5. Você deve ser redirecionado para `/dashboard`

### Passo 6.5: Verificar no Supabase
1. Volte ao Supabase Dashboard
2. Clique em "Authentication" > "Users"
3. Você deve ver o usuário criado
4. Clique em "Table Editor" > "profiles"
5. Você deve ver o perfil criado automaticamente (graças ao trigger)

---

## 7. Testar Funcionalidades

### Teste 7.1: Logout
1. No dashboard, clique no menu do usuário
2. Clique em "Logout" (quando implementado)
3. Você deve ser redirecionado para `/login`

### Teste 7.2: Login
1. Faça login com as credenciais criadas
2. Você deve ser redirecionado para `/dashboard`

### Teste 7.3: Proteção de Rotas
1. Faça logout
2. Tente acessar http://localhost:3000/dashboard diretamente
3. Você deve ser redirecionado para `/login`

---

## 8. Configurar Secrets (GitHub e Vercel)

### Passo 8.1: GitHub Secrets (Quando criar repositório)
1. Acesse seu repositório no GitHub
2. Vá em Settings > Secrets and variables > Actions
3. Adicione os secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Passo 8.2: Vercel Environment Variables (Quando fazer deploy)
1. Acesse seu projeto na Vercel
2. Vá em Settings > Environment Variables
3. Adicione as mesmas variáveis do .env.local
4. Selecione os ambientes: Production, Preview, Development

---

## 9. Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou as chaves corretamente
- Certifique-se que não há espaços extras
- Verifique se o projeto Supabase está ativo

### Erro: "Failed to fetch"
- Verifique se a URL do Supabase está correta
- Verifique sua conexão com internet
- Verifique se o projeto Supabase não foi pausado

### Erro: "Row Level Security policy violation"
- Verifique se as políticas RLS foram criadas corretamente
- Execute o schema.sql novamente
- Verifique se o usuário está autenticado

### Usuário não é criado em profiles
- Verifique se o trigger `on_auth_user_created` foi criado
- Execute o schema.sql novamente
- Verifique os logs no Supabase Dashboard

### Não consigo fazer login
- Verifique se o email está confirmado (se confirmação estiver habilitada)
- Verifique se a senha está correta
- Verifique os logs de autenticação no Supabase

---

## 10. Próximos Passos

Após configurar o Supabase com sucesso:

1. ✅ Testar autenticação completa
2. ✅ Implementar logout
3. ✅ Implementar recuperação de senha
4. ✅ Criar dashboard com dados reais
5. ✅ Implementar CRUD de matérias
6. ✅ Implementar registro de sessões de estudo
7. ✅ Implementar registro de simulados

---

## 11. Recursos Úteis

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

---

## 12. Checklist de Configuração

- [ ] Projeto criado no Supabase
- [ ] Schema SQL aplicado com sucesso
- [ ] Tabelas criadas (profiles, subjects, study_sessions, mock_exams)
- [ ] RLS habilitado em todas as tabelas
- [ ] Triggers configurados
- [ ] Autenticação Email/Password habilitada
- [ ] Google OAuth configurado (opcional)
- [ ] URLs de redirecionamento configuradas
- [ ] Credenciais copiadas
- [ ] .env.local atualizado com credenciais reais
- [ ] Build testado e funcionando
- [ ] Registro de usuário testado
- [ ] Login testado
- [ ] Perfil criado automaticamente
- [ ] Proteção de rotas funcionando

---

**Última atualização**: 2025-01-21  
**Status**: Pronto para uso
