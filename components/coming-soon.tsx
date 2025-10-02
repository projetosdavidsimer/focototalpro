import { Fragment } from "react"
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
import { Construction, ArrowLeft } from "lucide-react"

interface ComingSoonProps {
  title: string
  description: string
  breadcrumbs: {
    label: string
    href?: string
  }[]
}

export async function ComingSoon({ title, description, breadcrumbs }: ComingSoonProps) {
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <Fragment key={index}>
                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center text-center max-w-md space-y-6">
            <div className="rounded-full bg-primary/10 p-6">
              <Construction className="h-16 w-16 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Dashboard
                </Link>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Esta funcionalidade está em desenvolvimento e será lançada em breve.
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
