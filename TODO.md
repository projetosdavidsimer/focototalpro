# TODO - FocoTotal SaaS

## 🔴 Prioridade Crítica

### Infraestrutura & Segurança
- [ ] Configurar projeto no Supabase (criar conta e projeto) - **PRÓXIMO PASSO**
- [x] Criar schema do banco de dados (profiles, subjects, study_sessions, mock_exams)
- [x] Criar guia de setup do Supabase (SETUP_GUIDE.md)
- [ ] Aplicar schema SQL no Supabase
- [ ] Configurar autenticação no Supabase (email/senha + Google OAuth)
- [x] Implementar Row Level Security (RLS) policies (no schema)
- [x] Configurar variáveis de ambiente (.env.local)
- [ ] Atualizar .env.local com credenciais reais do Supabase
- [ ] Adicionar secrets no GitHub e Vercel
- [ ] Configurar proteção de branch main no GitHub

### Autenticação
- [x] Instalar @supabase/supabase-js e @supabase/ssr
- [x] Criar lib/supabase/client.ts e server.ts
- [x] Criar páginas de login (/login)
- [x] Criar páginas de registro (/register)
- [x] Implementar middleware de proteção de rotas
- [x] Criar callback de autenticação (/auth/callback)
- [x] Criar fluxo de logout
- [x] Buscar dados reais do usuário no dashboard
- [ ] Implementar recuperação de senha

## 🟡 Prioridade Alta

### Dashboard Real
- [x] Criar componentes de métricas (horas estudadas, desempenho, próximos tópicos)
- [x] Implementar cards de estatísticas
- [x] Implementar queries Supabase para buscar dados
- [x] Conectar com dados reais do Supabase
- [x] Implementar loading states (Suspense + Skeleton)
- [x] Criar componente de atividade recente
- [x] Criar componente de próximos tópicos
- [ ] Adicionar gráficos de evolução (recharts)

### Planejamento de Estudos
- [ ] Criar página /planner
- [ ] Implementar CRUD de matérias
- [ ] Criar interface de ciclo de estudos semanal
- [ ] Adicionar cronômetro de estudo (Pomodoro)
- [ ] Implementar registro de sessões de estudo

### Rastreamento de Desempenho
- [ ] Criar página /simulados
- [ ] Implementar formulário de registro de simulado
- [ ] Criar visualização de histórico de simulados
- [ ] Adicionar gráficos de evolução por matéria
- [ ] Implementar análise de pontos fracos

## 🟢 Prioridade Média

### Monetização (Stripe)
- [ ] Instalar @stripe/stripe-js
- [ ] Configurar Stripe no backend
- [ ] Criar página /pricing
- [ ] Implementar Stripe Checkout
- [ ] Criar webhook para eventos de pagamento
- [ ] Implementar verificação de assinatura ativa
- [ ] Criar página de gerenciamento de assinatura

### Customização UI
- [ ] Atualizar sidebar com navegação do FocoTotal
- [ ] Remover dados de exemplo (Acme Inc, etc)
- [ ] Criar componentes específicos (card de matéria, timer, etc)
- [ ] Ajustar paleta de cores para identidade FocoTotal
- [ ] Adicionar logo e favicon personalizados
- [ ] Melhorar responsividade mobile

## 🔵 Prioridade Baixa

### Melhorias & Features Extras
- [ ] Implementar notificações (toast)
- [ ] Adicionar sistema de metas
- [ ] Criar relatórios exportáveis (PDF)
- [ ] Implementar gamificação (badges, streaks)
- [ ] Adicionar modo de revisão espaçada
- [ ] Criar comunidade/fórum (futuro)

## 📝 Documentação
- [ ] Atualizar README.md com informações do FocoTotal
- [ ] Criar QUICK_START.md com instruções de setup
- [ ] Documentar variáveis de ambiente necessárias
- [ ] Criar guia de contribuição (se aplicável)

## 🧪 Testes & Deploy
- [ ] Configurar CI/CD no GitHub Actions
- [ ] Adicionar testes básicos (opcional para MVP)
- [ ] Configurar deploy automático na Vercel
- [ ] Testar fluxo completo em staging
- [ ] Deploy em produção

---

**Última atualização**: 2025-01-21
**Status do Projeto**: Dashboard implementado (55%), aguardando setup do Supabase para testar
**Build Status**: ✅ Compilando sem erros TypeScript
**Próximo Passo**: Criar projeto no Supabase, aplicar schema.sql e testar dashboard
