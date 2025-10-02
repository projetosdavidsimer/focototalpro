import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/app/actions/auth"
import { getSubjects } from "@/app/actions/subjects"
import { PomodoroTimer } from "@/components/pomodoro/pomodoro-timer"
import { PageHeader } from "@/components/page-header"

function PomodoroSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="flex gap-2 mb-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>
      <Skeleton className="w-80 h-80 rounded-full mb-8" />
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="h-14 w-40" />
        <Skeleton className="h-14 w-14" />
      </div>
      <div className="flex items-center gap-8">
        <Skeleton className="h-16 w-24" />
        <Skeleton className="h-12 w-px" />
        <Skeleton className="h-16 w-48" />
      </div>
    </div>
  )
}

async function PomodoroData({ userId }: { userId: string }) {
  const subjectsResult = await getSubjects(userId)
  const subjects = subjectsResult.data || []

  return <PomodoroTimer userId={userId} subjects={subjects} />
}

export default async function PomodoroPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Planejamento", href: "/planner" },
          { label: "Pomodoro" },
        ]}
      />
      <Suspense fallback={<PomodoroSkeleton />}>
        <PomodoroData userId={user!.id} />
      </Suspense>
    </>
  )
}
