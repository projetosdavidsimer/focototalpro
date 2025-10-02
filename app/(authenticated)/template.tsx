import { SidebarInset } from "@/components/ui/sidebar"

export default function AuthenticatedTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarInset className="pt-4">
      {children}
    </SidebarInset>
  )
}
