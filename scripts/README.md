# Scripts de Setup Automático

## 🚀 Opção 1: Setup Completo Automático (RECOMENDADO)

Este script cria o projeto no Supabase automaticamente.

### Pré-requisitos
1. Conta no Supabase
2. Personal Access Token

### Como obter o token
1. Acesse: https://supabase.com/dashboard/account/tokens
2. Clique em "Generate new token"
3. Dê um nome: "FocoTotal CLI"
4. Copie o token (começa com `sbp_`)

### Executar
```bash
cd Plataforma/my-app
node scripts/create-project.js
```

O script vai:
- ✅ Criar o projeto no Supabase
- ✅ Aguardar o projeto ficar pronto
- ✅ Buscar as credenciais automaticamente
- ✅ Atualizar o .env.local
- ⚠️ Você ainda precisa aplicar o schema SQL manualmente

---

## 🔧 Opção 2: Setup com Credenciais Existentes

Se você já criou o projeto manualmente, use este script.

### Executar
```bash
cd Plataforma/my-app
node scripts/auto-setup.js
```

O script vai pedir:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

E vai:
- ✅ Atualizar o .env.local
- ✅ Tentar aplicar o schema SQL automaticamente
- ✅ Testar a conexão

---

## 📋 Opção 3: Manual (Mais Simples)

Se preferir fazer manualmente:

### 1. Criar Projeto
- Acesse: https://supabase.com/dashboard/projects
- Clique em "New Project"
- Preencha os dados

### 2. Aplicar Schema
- Vá em SQL Editor
- Copie o conteúdo de `supabase/schema.sql`
- Cole e execute

### 3. Copiar Credenciais
- Vá em Settings > API
- Copie URL, anon key e service_role key

### 4. Atualizar .env.local
- Edite `Plataforma/my-app/.env.local`
- Cole as credenciais

---

## 🐛 Troubleshooting

### "Token inválido"
- Certifique-se que o token começa com `sbp_`
- Gere um novo token se necessário

### "Erro ao criar projeto"
- Verifique se você tem permissão na organização
- Tente criar manualmente no dashboard

### "Projeto não fica pronto"
- Aguarde mais alguns minutos
- Verifique o status no dashboard

### "Erro ao aplicar schema"
- Aplique manualmente no SQL Editor
- Copie o conteúdo de `supabase/schema.sql`

---

## 📝 Arquivos

- `create-project.js` - Cria projeto automaticamente
- `auto-setup.js` - Configura com credenciais existentes
- `setup-supabase-cli.md` - Documentação da CLI
- `project-info.json` - Informações do projeto (gerado automaticamente)

---

## 🎯 Após o Setup

1. Execute: `npm run dev`
2. Acesse: http://localhost:3000
3. Registre um usuário
4. Teste o dashboard

---

**Dúvidas?** Consulte `INSTRUCOES_PARA_VOCE.md` na raiz do projeto.
