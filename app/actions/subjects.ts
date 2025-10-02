'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSubjects(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching subjects:', error)
    return { error: error.message }
  }
  
  return { data }
}

export async function createSubject(userId: string, subject: {
  name: string
  color: string
  target_hours_per_week: number
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('subjects')
    .insert({
      user_id: userId,
      name: subject.name,
      color: subject.color,
      target_hours_per_week: subject.target_hours_per_week,
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating subject:', error)
    return { error: error.message }
  }
  
  revalidatePath('/planner/subjects')
  revalidatePath('/dashboard')
  
  return { data }
}

export async function updateSubject(subjectId: string, updates: {
  name?: string
  color?: string
  target_hours_per_week?: number
}) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('subjects')
    .update(updates)
    .eq('id', subjectId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating subject:', error)
    return { error: error.message }
  }
  
  revalidatePath('/planner/subjects')
  revalidatePath('/dashboard')
  
  return { data }
}

export async function deleteSubject(subjectId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('subjects')
    .delete()
    .eq('id', subjectId)
  
  if (error) {
    console.error('Error deleting subject:', error)
    return { error: error.message }
  }
  
  revalidatePath('/planner/subjects')
  revalidatePath('/dashboard')
  
  return { success: true }
}
