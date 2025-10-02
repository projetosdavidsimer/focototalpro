import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/app/actions/auth"
import { getSubjects } from "@/app/actions/subjects"
import { SubjectsContent } from "@/components/subjects/subjects-content"
import { PageHeader } from "@/components/page-header"

function SubjectsSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

async function SubjectsData({ userId }: { userId: string }) {
  const result = await getSubjects(userId)
  const subjects = result.data || []

  return <SubjectsContent userId={userId} initialSubjects={subjects} />
}

export default async function SubjectsPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Planejamento", href: "/planner" },
          { label: "Minhas Matérias" },
        ]}
      />
      <Suspense fallback={<SubjectsSkeleton />}>
        <SubjectsData userId={user!.id} />
      </Suspense>
    </>
  )
}
