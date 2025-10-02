# Correção de Conflito de Sidebar

## Problema Identificado

Várias páginas da aplicação estavam gerando conflitos de contexto do React devido à **duplicação do `SidebarProvider`**. 

### Causa Raiz

A estrutura de layout autenticado (`(authenticated)/layout.tsx`) já envolve todas as páginas com:
- `<SidebarProvider>` - Provedor de contexto da sidebar
- `<AppSidebar>` - Componente da sidebar

Porém, algumas páginas individuais estavam **duplicando** esses componentes, criando:
1. **Conflito de contexto React** - Múltiplos provedores do mesmo contexto
2. **Renderização duplicada** - Sidebar sendo renderizada duas vezes
3. **Erros de estado** - Estado da sidebar inconsistente
4. **Problemas de navegação** - Comportamento inesperado ao navegar

### Páginas Afetadas

As seguintes páginas tinham o problema:

1. ✅ `/dashboard/stats` - `app/(authenticated)/dashboard/stats/page.tsx`
2. ✅ `/planner/subjects` - `app/(authenticated)/planner/subjects/page.tsx`
3. ✅ `/planner/sessions` - `app/(authenticated)/planner/sessions/page.tsx`
4. ✅ `/planner/pomodoro` - `app/(authenticated)/planner/pomodoro/page.tsx`

## Solução Implementada

### Estrutura Correta

**Layout Autenticado** (`(authenticated)/layout.tsx`):
```tsx
export default async function AuthenticatedLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      {children}  {/* Páginas são renderizadas aqui */}
    </SidebarProvider>
  )
}
```

**Páginas Individuais** (ex: `dashboard/stats/page.tsx`):
```tsx
export default async function Page() {
  return (
    <SidebarInset>  {/* Apenas SidebarInset, sem Provider */}
      <header>...</header>
      <div>...</div>
    </SidebarInset>
  )
}
```

### Mudanças Realizadas

Para cada página afetada:

1. **Removido**:
   - `import { SidebarProvider } from "@/components/ui/sidebar"`
   - `import { AppSidebar } from "@/components/app-sidebar"`
   - Wrapper `<SidebarProvider>` ao redor do conteúdo
   - Componente `<AppSidebar user={userData} />`
   - Lógica de obtenção e verificação de usuário (já feita no layout)

2. **Mantido**:
   - `<SidebarInset>` - Container do conteúdo da página
   - `<SidebarTrigger>` - Botão para abrir/fechar sidebar
   - Todo o conteúdo interno da página

### Exemplo de Correção

**ANTES** (❌ Incorreto):
```tsx
export default async function DashboardStatsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  
  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  return (
    <SidebarProvider>           {/* ❌ Duplicado */}
      <AppSidebar user={userData} />  {/* ❌ Duplicado */}
      <SidebarInset>
        {/* conteúdo */}
      </SidebarInset>
    </SidebarProvider>
  )
}
```

**DEPOIS** (✅ Correto):
```tsx
export default async function DashboardStatsPage() {
  return (
    <SidebarInset>              {/* ✅ Apenas o container */}
      {/* conteúdo */}
    </SidebarInset>
  )
}
```

## Benefícios da Correção

1. ✅ **Sem conflitos de contexto** - Apenas um `SidebarProvider` na árvore
2. ✅ **Performance melhorada** - Menos componentes renderizados
3. ✅ **Código mais limpo** - Menos duplicação
4. ✅ **Manutenção facilitada** - Lógica centralizada no layout
5. ✅ **Navegação consistente** - Estado da sidebar mantido entre páginas

## Padrão para Novas Páginas

Ao criar novas páginas dentro de `(authenticated)`, siga este padrão:

```tsx
// ✅ CORRETO - Página simples
export default async function MinhaPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            {/* breadcrumb */}
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Conteúdo da página */}
      </div>
    </SidebarInset>
  )
}
```

## Verificação

Para verificar se não há mais conflitos:

```bash
# Buscar por SidebarProvider em páginas (não deve retornar nada)
grep -r "SidebarProvider" app/(authenticated)/**/page.tsx

# Buscar por AppSidebar em páginas (não deve retornar nada)
grep -r "AppSidebar" app/(authenticated)/**/page.tsx
```

## Páginas Client Component

Para páginas que usam `"use client"`, o padrão é o mesmo:

```tsx
"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
// ... outros imports

export default function MinhaClientPage() {
  // ... lógica do componente
  
  return (
    <SidebarInset>
      {/* conteúdo */}
    </SidebarInset>
  )
}
```

## Notas Importantes

1. **Autenticação**: A verificação de autenticação é feita no layout `(authenticated)/layout.tsx`, não é necessário repetir nas páginas individuais.

2. **Dados do Usuário**: Se precisar dos dados do usuário em uma página, use o hook `useAuth()` ou chame `getCurrentUser()` diretamente na página.

3. **Sidebar State**: O estado da sidebar (aberta/fechada) é gerenciado pelo `SidebarProvider` no layout e é compartilhado entre todas as páginas.

4. **Navegação**: Ao navegar entre páginas, a sidebar mantém seu estado, proporcionando uma experiência de usuário mais fluida.

## Teste

Após as correções, teste:

1. ✅ Navegue para `/dashboard/stats` - deve carregar sem erros
2. ✅ Navegue para `/planner/subjects` - deve carregar sem erros
3. ✅ Navegue para `/planner/sessions` - deve carregar sem erros
4. ✅ Navegue para `/planner/pomodoro` - deve carregar sem erros
5. ✅ Abra/feche a sidebar - deve funcionar em todas as páginas
6. ✅ Verifique o console - não deve haver erros de contexto React

## Conclusão

O problema foi causado pela duplicação do `SidebarProvider` e `AppSidebar` em páginas individuais, quando esses componentes já estavam presentes no layout pai. A solução foi remover essas duplicações, mantendo apenas o `SidebarInset` nas páginas.

Esta é uma boa prática de arquitetura React: **componentes de layout e provedores de contexto devem estar nos layouts, não nas páginas individuais**.
