import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentUser } from "@/app/actions/auth"
import { getStudySessions, getWeeklyStudySummary } from "@/app/actions/study-sessions"
import { getSubjects } from "@/app/actions/subjects"
import { SessionsContent } from "@/components/sessions/sessions-content"
import { PageHeader } from "@/components/page-header"

function SessionsSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Skeleton className="h-32 rounded-xl" />
      <div className="grid gap-4 md:grid-cols-7">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

async function SessionsData({ userId }: { userId: string }) {
  const [sessionsResult, subjectsResult, weeklyResult] = await Promise.all([
    getStudySessions(userId, { limit: 20 }),
    getSubjects(userId),
    getWeeklyStudySummary(userId),
  ])

  const sessions = sessionsResult.data || []
  const subjects = subjectsResult.data || []
  const weekly = weeklyResult.data || []

  return (
    <SessionsContent
      userId={userId}
      initialSessions={sessions}
      subjects={subjects}
      initialWeekly={weekly}
    />
  )
}

export default async function StudySessionsPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Planejamento", href: "/planner" },
          { label: "Sessões de Estudo" },
        ]}
      />
      <Suspense fallback={<SessionsSkeleton />}>
        <SessionsData userId={user!.id} />
      </Suspense>
    </>
  )
}
