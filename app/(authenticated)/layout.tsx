import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
      {children}
    </SidebarProvider>
  )
}
