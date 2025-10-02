'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMockExams(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('mock_exams')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching mock exams:', error)
    return { error: error.message }
  }
  
  return { data }
}

export async function createMockExam(userId: string, exam: {
  title: string
  total_questions: number
  correct_answers: number
  date: string
  subject_breakdown?: Record<string, number>
  notes?: string
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('mock_exams')
    .insert({
      user_id: userId,
      title: exam.title,
      total_questions: exam.total_questions,
      correct_answers: exam.correct_answers,
      date: exam.date,
      subject_breakdown: exam.subject_breakdown || {},
      notes: exam.notes,
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating mock exam:', error)
    return { error: error.message }
  }
  
  revalidatePath('/simulados')
  revalidatePath('/dashboard')
  
  return { data }
}

export async function updateMockExam(examId: string, updates: {
  title?: string
  total_questions?: number
  correct_answers?: number
  date?: string
  subject_breakdown?: Record<string, number>
  notes?: string
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('mock_exams')
    .update(updates)
    .eq('id', examId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating mock exam:', error)
    return { error: error.message }
  }
  
  revalidatePath('/simulados')
  revalidatePath('/dashboard')
  
  return { data }
}

export async function deleteMockExam(examId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('mock_exams')
    .delete()
    .eq('id', examId)
  
  if (error) {
    console.error('Error deleting mock exam:', error)
    return { error: error.message }
  }
  
  revalidatePath('/simulados')
  revalidatePath('/dashboard')
  
  return { success: true }
}
