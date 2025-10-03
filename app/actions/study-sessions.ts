'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type StudySessionInput = {
  subject_id?: string | null
  topic_id?: string | null
  duration_minutes: number
  date: string // ISO date (YYYY-MM-DD)
  notes?: string
}

export type StudySessionUpdate = Partial<StudySessionInput>

export async function getStudySessions(
  userId: string,
  options?: {
    limit?: number
    fromDate?: string // inclusive YYYY-MM-DD
    toDate?: string // inclusive YYYY-MM-DD
    subjectId?: string
  }
) {
  const supabase = await createClient()

  let query = supabase
    .from('study_sessions')
    .select(
      `
      id,
      user_id,
      subject_id,
      duration_minutes,
      date,
      notes,
      created_at,
      updated_at,
      subjects (name, color)
    `
    )
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (options?.fromDate) {
    query = query.gte('date', options.fromDate)
  }
  if (options?.toDate) {
    query = query.lte('date', options.toDate)
  }
  if (options?.subjectId) {
    query = query.eq('subject_id', options.subjectId)
  }
  if (options?.limit && Number.isFinite(options.limit)) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching study sessions:', error)
    return { error: error.message }
  }

  return { data }
}

export async function createStudySession(userId: string, session: StudySessionInput) {
  const supabase = await createClient()

  const payload = {
    user_id: userId,
    subject_id: session.subject_id ?? null,
    topic_id: session.topic_id ?? null,
    duration_minutes: session.duration_minutes,
    date: session.date,
    notes: session.notes ?? null,
  }

  const { data, error } = await supabase
    .from('study_sessions')
    .insert(payload)
    .select(
      `
      id,
      user_id,
      subject_id,
      duration_minutes,
      date,
      notes,
      created_at,
      updated_at,
      subjects (name, color)
    `
    )
    .single()

  if (error) {
    console.error('Error creating study session:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/sessions')
  revalidatePath('/dashboard')

  return { data }
}

export async function updateStudySession(sessionId: string, updates: StudySessionUpdate) {
  const supabase = await createClient()

  const payload: Record<string, unknown> = {}
  if (typeof updates.subject_id !== 'undefined') payload.subject_id = updates.subject_id
  if (typeof updates.duration_minutes !== 'undefined') payload.duration_minutes = updates.duration_minutes
  if (typeof updates.date !== 'undefined') payload.date = updates.date
  if (typeof updates.notes !== 'undefined') payload.notes = updates.notes

  const { data, error } = await supabase
    .from('study_sessions')
    .update(payload)
    .eq('id', sessionId)
    .select(
      `
      id,
      user_id,
      subject_id,
      duration_minutes,
      date,
      notes,
      created_at,
      updated_at,
      subjects (name, color)
    `
    )
    .single()

  if (error) {
    console.error('Error updating study session:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/sessions')
  revalidatePath('/dashboard')

  return { data }
}

export async function deleteStudySession(sessionId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('study_sessions')
    .delete()
    .eq('id', sessionId)

  if (error) {
    console.error('Error deleting study session:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/sessions')
  revalidatePath('/dashboard')

  return { success: true }
}

export async function getWeeklyStudySummary(userId: string) {
  const supabase = await createClient()

  // Últimos 7 dias incluindo hoje
  const to = new Date()
  const from = new Date()
  from.setDate(to.getDate() - 6)

  const fromStr = from.toISOString().split('T')[0]
  const toStr = to.toISOString().split('T')[0]

  // Buscar sessões no intervalo
  const { data, error } = await supabase
    .from('study_sessions')
    .select('date, duration_minutes')
    .eq('user_id', userId)
    .gte('date', fromStr)
    .lte('date', toStr)

  if (error) {
    console.error('Error fetching weekly summary:', error)
    return { error: error.message }
  }

  // Agregar por dia
  const map = new Map<string, number>()
  if (data) {
    for (const row of data) {
      const key = row.date
      const prev = map.get(key) ?? 0
      map.set(key, prev + (row.duration_minutes ?? 0))
    }
  }

  // Produzir vetor de 7 dias ordenados
  const result: { date: string; minutes: number; hours: number }[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(from)
    d.setDate(from.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const minutes = map.get(key) ?? 0
    result.push({ date: key, minutes, hours: Math.round((minutes / 60) * 10) / 10 })
  }

  return { data: result }
}
