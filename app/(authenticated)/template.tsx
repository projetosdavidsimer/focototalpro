import { SidebarInset } from "@/components/ui/sidebar"

export default function AuthenticatedTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarInset>
      {children}
    </SidebarInset>
  )
}
