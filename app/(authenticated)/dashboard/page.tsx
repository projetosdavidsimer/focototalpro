import { getCurrentUser } from "@/app/actions/auth"
import { getDashboardStats, getRecentActivity, getUpcomingTopics } from "@/app/actions/dashboard"
import { getWeeklyStudySummary } from "@/app/actions/study-sessions"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingTopics } from "@/components/dashboard/upcoming-topics"
import { WeeklyChart } from "@/components/dashboard/weekly-chart"
import { PageHeader } from "@/components/page-header"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-96 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    </div>
  )
}

async function DashboardContent({ userId }: { userId: string }) {
  const [stats, activity, topics, weeklyData] = await Promise.all([
    getDashboardStats(userId),
    getRecentActivity(userId),
    getUpcomingTopics(userId),
    getWeeklyStudySummary(userId),
  ])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
      <DashboardStats
        weeklyHours={stats.weeklyHours}
        lastExamScore={stats.lastExamScore}
        totalSubjects={stats.totalSubjects}
        studyStreak={stats.studyStreak}
      />
      {weeklyData.data && weeklyData.data.length > 0 && (
        <WeeklyChart data={weeklyData.data} />
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity sessions={activity.sessions} exams={activity.exams} />
        <UpcomingTopics topics={topics} />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "#" },
          { label: "Visão Geral" },
        ]}
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent userId={user!.id} />
      </Suspense>
    </>
  )
}
