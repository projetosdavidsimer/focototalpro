'use server'

import { createClient } from '@/lib/supabase/server'
import { withCache, CACHE_TIMES, CACHE_TAGS } from '@/lib/cache'

export async function getDashboardStats(userId: string) {
  return withCache(
    ['dashboard-stats', userId],
    async () => getDashboardStatsUncached(userId),
    CACHE_TIMES.DASHBOARD_STATS,
    [CACHE_TAGS.dashboard(userId)]
  )
}

async function getDashboardStatsUncached(userId: string) {
  const supabase = await createClient()

  // Buscar horas estudadas na semana
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)

  const { data: sessions } = await supabase
    .from('study_sessions')
    .select('duration_minutes')
    .eq('user_id', userId)
    .gte('date', weekStart.toISOString().split('T')[0])

  const weeklyHours = sessions
    ? Math.round(sessions.reduce((acc, s) => acc + s.duration_minutes, 0) / 60)
    : 0

  // Buscar último simulado
  const { data: lastExam } = await supabase
    .from('mock_exams')
    .select('total_questions, correct_answers')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(1)
    .single()

  const lastExamScore = lastExam
    ? Math.round((lastExam.correct_answers / lastExam.total_questions) * 100)
    : 0

  // Buscar total de matérias
  const { count: totalSubjects } = await supabase
    .from('subjects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  // Calcular sequência de estudos
  const { data: recentSessions } = await supabase
    .from('study_sessions')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(30)

  let studyStreak = 0
  if (recentSessions && recentSessions.length > 0) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const dates = recentSessions.map(s => new Date(s.date))
    dates.sort((a, b) => b.getTime() - a.getTime())

    let currentDate = today
    for (const date of dates) {
      date.setHours(0, 0, 0, 0)
      const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0 || diffDays === 1) {
        studyStreak++
        currentDate = date
      } else {
        break
      }
    }
  }

  return {
    weeklyHours,
    lastExamScore,
    totalSubjects: totalSubjects || 0,
    studyStreak,
  }
}

export async function getRecentActivity(userId: string) {
  return withCache(
    ['recent-activity', userId],
    async () => getRecentActivityUncached(userId),
    CACHE_TIMES.SESSIONS,
    [CACHE_TAGS.sessions(userId), CACHE_TAGS.exams(userId)]
  )
}

async function getRecentActivityUncached(userId: string) {
  const supabase = await createClient()

  // Buscar últimas 5 sessões de estudo
  const { data: sessions } = await supabase
    .from('study_sessions')
    .select(`
      id,
      duration_minutes,
      date,
      notes,
      subjects (name, color)
    `)
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(5)

  // Buscar últimos 3 simulados
  const { data: exams } = await supabase
    .from('mock_exams')
    .select('id, title, total_questions, correct_answers, date')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(3)

  return {
    sessions: sessions || [],
    exams: exams || [],
  }
}

export async function getUpcomingTopics(userId: string) {
  return withCache(
    ['upcoming-topics', userId],
    async () => getUpcomingTopicsUncached(userId),
    CACHE_TIMES.SUBJECTS,
    [CACHE_TAGS.subjects(userId)]
  )
}

async function getUpcomingTopicsUncached(userId: string) {
  const supabase = await createClient()

  // Buscar matérias com menos horas estudadas recentemente
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)

  const { data: subjects } = await supabase
    .from('subjects')
    .select(`
      id,
      name,
      color,
      target_hours_per_week,
      study_sessions (duration_minutes)
    `)
    .eq('user_id', userId)

  if (!subjects) return []

  // Calcular horas estudadas por matéria e ordenar por prioridade
  const subjectsWithHours = subjects.map(subject => {
    const sessions = subject.study_sessions as Array<{ duration_minutes: number }> | undefined
    const totalMinutes = sessions?.reduce(
      (acc: number, s) => acc + s.duration_minutes,
      0
    ) || 0
    const hoursStudied = totalMinutes / 60
    const targetHours = subject.target_hours_per_week || 0
    const deficit = targetHours - hoursStudied

    return {
      id: subject.id,
      name: subject.name,
      color: subject.color,
      hoursStudied: Math.round(hoursStudied * 10) / 10,
      targetHours,
      deficit: Math.round(deficit * 10) / 10,
    }
  })

  // Ordenar por maior déficit (prioridade)
  return subjectsWithHours
    .sort((a, b) => b.deficit - a.deficit)
    .slice(0, 5)
}
