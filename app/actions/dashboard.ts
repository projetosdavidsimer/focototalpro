'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

export const getDashboardStats = unstable_cache(
  async (userId: string) => {
    const supabase = await createClient()
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)

    // Buscar dados em paralelo de forma otimizada
    const [sessionsResult, lastExamResult, subjectsCount] = await Promise.all([
      supabase
        .from('study_sessions')
        .select('duration_minutes, date')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(30),
      supabase
        .from('mock_exams')
        .select('total_questions, correct_answers')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('subjects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
    ])

    const sessions = sessionsResult.data || []
    const lastExam = lastExamResult.data

    // Calcular horas semanais
    const weekStartStr = weekStart.toISOString().split('T')[0]
    const weeklyHours = Math.round(
      sessions
        .filter(s => s.date >= weekStartStr)
        .reduce((acc, s) => acc + s.duration_minutes, 0) / 60
    )

    // Calcular score do último exame
    const lastExamScore = lastExam
      ? Math.round((lastExam.correct_answers / lastExam.total_questions) * 100)
      : 0

    // Calcular sequência de estudos
    let studyStreak = 0
    if (sessions.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const uniqueDates = [...new Set(sessions.map(s => s.date))].sort().reverse()
      let currentDate = today

      for (const dateStr of uniqueDates) {
        const date = new Date(dateStr)
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
      totalSubjects: subjectsCount.count || 0,
      studyStreak,
    }
  },
  ['dashboard-stats'],
  { revalidate: 60, tags: ['dashboard-stats'] }
)

export const getRecentActivity = unstable_cache(
  async (userId: string) => {
    const supabase = await createClient()

    // Buscar sessões e exames em paralelo
    const [sessionsResult, examsResult] = await Promise.all([
      supabase
        .from('study_sessions')
        .select('id, duration_minutes, date, notes, subjects (name, color)')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(5),
      supabase
        .from('mock_exams')
        .select('id, title, total_questions, correct_answers, date')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(3)
    ])

    return {
      sessions: sessionsResult.data || [],
      exams: examsResult.data || [],
    }
  },
  ['recent-activity'],
  { revalidate: 60, tags: ['recent-activity'] }
)

export const getUpcomingTopics = unstable_cache(
  async (userId: string) => {
    const supabase = await createClient()

    const { data: subjects } = await supabase
      .from('subjects')
      .select('id, name, color, target_hours_per_week, study_sessions (duration_minutes)')
      .eq('user_id', userId)
      .limit(10)

    if (!subjects || subjects.length === 0) return []

    // Calcular horas estudadas por matéria e ordenar por prioridade
    const subjectsWithHours = subjects.map(subject => {
      const sessions = subject.study_sessions as Array<{ duration_minutes: number }> | undefined
      const totalMinutes = sessions?.reduce((acc: number, s) => acc + s.duration_minutes, 0) || 0
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
  },
  ['upcoming-topics'],
  { revalidate: 60, tags: ['upcoming-topics'] }
)
