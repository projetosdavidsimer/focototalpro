import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/app/actions/auth"
import { getMockExams } from "@/app/actions/mock-exams"
import { SimuladosContent } from "@/components/mock-exams/simulados-content"
import { PageHeader } from "@/components/page-header"

function SimuladosSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

async function SimuladosData({ userId }: { userId: string }) {
  const result = await getMockExams(userId)
  const exams = result.data || []

  return <SimuladosContent userId={userId} initialExams={exams} />
}

export default async function SimuladosPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Simulados" }]} />
      <Suspense fallback={<SimuladosSkeleton />}>
        <SimuladosData userId={user!.id} />
      </Suspense>
    </>
  )
}
