# FocoTotal SaaS

Micro-SaaS MVP para concurseiros focado em gerenciamento de estudos, simulados e acompanhamento de desempenho.

## Sobre o Projeto

FocoTotal é uma plataforma desenvolvida para candidatos de concursos públicos no Brasil que precisam de uma ferramenta profissional para organizar e otimizar sua rotina de estudos.

### Público-Alvo
Candidatos de concursos públicos que buscam:
- Organização eficiente dos estudos
- Acompanhamento de desempenho em simulados
- Planejamento de ciclos de estudo
- Análise de evolução por matéria

## Stack Tecnológica

- **Frontend**: Next.js 15.5.3 + React 19 + TypeScript
- **Estilização**: Tailwind CSS v4 + Shadcn/UI
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Pagamentos**: Stripe
- **Deploy**: Vercel
- **Ícones**: Lucide React

## Features MVP

### Autenticação
- Login com email/senha
- Login social com Google
- Recuperação de senha
- Proteção de rotas

### Dashboard Principal
- Resumo de horas estudadas na semana
- Desempenho no último simulado
- Próximos tópicos a revisar
- Gráficos de evolução

### Planejamento de Estudos
- Cadastro de matérias
- Montagem de ciclo de estudos semanal
- Cronômetro Pomodoro
- Registro de sessões de estudo

### Rastreamento de Desempenho
- Registro de simulados (acertos, erros, matéria)
- Gráficos de evolução
- Análise de pontos fracos
- Histórico completo

### Assinatura Premium
- Integração com Stripe
- Plano único mensal
- Acesso a todas as funcionalidades
- Gerenciamento de assinatura

## Início Rápido

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Executar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse [http://localhost:3000](http://localhost:3000)

Para instruções detalhadas, consulte [QUICK_START.md](./QUICK_START.md)

## Documentação

- [TODO.md](./TODO.md) - Lista de tarefas e prioridades
- [PROGRESS.md](./PROGRESS.md) - Status atual do projeto
- [SECURITY.md](./SECURITY.md) - Checklist de segurança
- [QUICK_START.md](./QUICK_START.md) - Guia de setup completo

## Design Guidelines

- Design profissional, minimalista e funcional
- Suporte a temas claro e escuro
- Paleta de cores sóbria (azul, cinza, branco)
- Ícones profissionais e consistentes
- Totalmente responsivo (mobile-first)
- Interfaces limpas sem sobrecarga de informações

## Estrutura do Projeto

```
my-app/
├── app/                 # App Router (Next.js)
├── components/          # Componentes React
│   ├── ui/             # Componentes Shadcn/UI
│   └── ...             # Componentes customizados
├── lib/                # Utilitários e helpers
├── hooks/              # Custom hooks
├── public/             # Arquivos estáticos
└── ...
```

## Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linter
```

## Segurança

Este projeto segue práticas de segurança nível Enterprise:
- Row Level Security (RLS) em todas as tabelas
- Autenticação segura via Supabase
- Variáveis de ambiente protegidas
- Proteção de rotas implementada
- Nenhum segredo commitado no repositório

Consulte [SECURITY.md](./SECURITY.md) para o checklist completo.

## Status do Projeto

**Versão**: 0.1.0 (MVP em desenvolvimento)  
**Progresso**: ~40% concluído  
**Build Status**: ✅ Compilando sem erros  
**Próxima milestone**: Setup do Supabase e criação do banco de dados

### O que está funcionando
- ✅ Estrutura completa do frontend
- ✅ Sistema de design profissional
- ✅ Navegação e sidebar customizadas
- ✅ Sistema de temas (claro/escuro)
- ✅ Integração Supabase (código pronto)

### O que falta
- ⚠️ Criar projeto no Supabase
- ⚠️ Aplicar schema do banco de dados
- ⚠️ Configurar credenciais reais
- ⚠️ Implementar features do MVP

Consulte [PROGRESS.md](./PROGRESS.md) para detalhes completos.

## Licença

Privado - Todos os direitos reservados

---

**FocoTotal** - Foco total nos seus estudos, resultados totais nos concursos.
