import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BookOpen, Timer, Files } from "lucide-react"

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Planejamento</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Visão Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Planejamento</h1>
              <p className="text-muted-foreground">
                Organize suas matérias, registre sessões e acompanhe seu ritmo de estudos
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Matérias */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Matérias</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cadastre e gerencie as matérias do seu ciclo de estudos.
              </p>
              <div className="mt-auto">
                <Button asChild>
                  <Link href="/planner/subjects">Gerenciar matérias</Link>
                </Button>
              </div>
            </div>

            {/* Card Sessões de Estudo */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Files className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Sessões de Estudo</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Registre suas sessões com duração, matéria e anotações.
              </p>
              <div className="mt-auto">
                <Button asChild variant="outline">
                  <Link href="/planner/sessions">Registrar sessões</Link>
                </Button>
              </div>
            </div>

            {/* Card Pomodoro */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Pomodoro</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Use o timer Pomodoro para manter o foco e registrar sessões.
              </p>
              <div className="mt-auto">
                <Button asChild variant="secondary">
                  <Link href="/planner/pomodoro">Abrir Pomodoro</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
