import { Clock, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Session {
  id: string
  duration_minutes: number
  date: string
  notes: string | null
  subjects: {
    name: string
    color: string
  }[] | null
}

interface Exam {
  id: string
  title: string
  total_questions: number
  correct_answers: number
  date: string
}

interface RecentActivityProps {
  sessions: Session[]
  exams: Exam[]
}

export function RecentActivity({ sessions, exams }: RecentActivityProps) {
  const allActivities = [
    ...sessions.map(s => ({
      type: 'session' as const,
      date: s.date,
      data: s,
    })),
    ...exams.map(e => ({
      type: 'exam' as const,
      date: e.date,
      data: e,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          {allActivities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma atividade registrada ainda.
              <br />
              Comece registrando uma sessão de estudo!
            </p>
          ) : (
            allActivities.slice(0, 8).map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  activity.type === 'session' 
                    ? 'bg-blue-100 dark:bg-blue-900/20' 
                    : 'bg-green-100 dark:bg-green-900/20'
                }`}>
                  {activity.type === 'session' ? (
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  {activity.type === 'session' ? (
                    <>
                      <p className="text-sm font-medium">
                        Sessão de estudo
                        {activity.data.subjects && activity.data.subjects[0] && (
                          <span className="ml-1 text-muted-foreground">
                            - {activity.data.subjects[0].name}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.data.duration_minutes} minutos
                        {' · '}
                        {formatDistanceToNow(new Date(activity.date), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">{activity.data.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.data.correct_answers}/{activity.data.total_questions} acertos
                        {' · '}
                        {formatDistanceToNow(new Date(activity.date), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
