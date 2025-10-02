import { ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Topic {
  id: string
  name: string
  color: string
  hoursStudied: number
  targetHours: number
  deficit: number
}

interface UpcomingTopicsProps {
  topics: Topic[]
}

export function UpcomingTopics({ topics }: UpcomingTopicsProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Próximos Tópicos</h3>
          <Link
            href="/planner"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Ver planejamento
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-4">
          {topics.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Nenhuma matéria cadastrada ainda.
              </p>
              <Link
                href="/planner/subjects"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Cadastrar matérias
              </Link>
            </div>
          ) : (
            topics.map((topic) => (
              <div key={topic.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: topic.color }}
                    />
                    <span className="text-sm font-medium">{topic.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {topic.hoursStudied}h / {topic.targetHours}h
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((topic.hoursStudied / topic.targetHours) * 100, 100)}%`,
                      backgroundColor: topic.color,
                    }}
                  />
                </div>
                {topic.deficit > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Faltam {topic.deficit}h para atingir a meta semanal
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
