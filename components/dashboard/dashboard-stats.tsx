import { Clock, Target, TrendingUp, BookOpen } from "lucide-react"
import { StatsCard } from "./stats-card"

interface DashboardStatsProps {
  weeklyHours: number
  lastExamScore: number
  totalSubjects: number
  studyStreak: number
}

export function DashboardStats({
  weeklyHours,
  lastExamScore,
  totalSubjects,
  studyStreak,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Horas Estudadas"
        value={`${weeklyHours}h`}
        description="Nesta semana"
        icon={Clock}
        trend={{
          value: 12,
          isPositive: true,
        }}
      />
      <StatsCard
        title="Último Simulado"
        value={`${lastExamScore}%`}
        description="Taxa de acerto"
        icon={Target}
        trend={{
          value: 5,
          isPositive: true,
        }}
      />
      <StatsCard
        title="Matérias Ativas"
        value={totalSubjects}
        description="Em estudo"
        icon={BookOpen}
      />
      <StatsCard
        title="Sequência"
        value={`${studyStreak} dias`}
        description="Estudando consecutivos"
        icon={TrendingUp}
        trend={{
          value: 2,
          isPositive: true,
        }}
      />
    </div>
  )
}
