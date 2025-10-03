'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type TopicInput = {
  subject_id: string
  name: string
  description?: string
  mastery_level?: number
}

export type TopicUpdate = Partial<Omit<TopicInput, 'subject_id'>>

export async function getTopics(userId: string, subjectId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('topics')
    .select('*')
    .eq('user_id', userId)
    .order('name', { ascending: true })

  if (subjectId) {
    query = query.eq('subject_id', subjectId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching topics:', error)
    return { error: error.message }
  }

  return { data }
}

export async function createTopic(userId: string, topic: TopicInput) {
  const supabase = await createClient()

  const payload = {
    user_id: userId,
    subject_id: topic.subject_id,
    name: topic.name,
    description: topic.description || null,
    mastery_level: topic.mastery_level ?? 0,
  }

  const { data, error } = await supabase
    .from('topics')
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('Error creating topic:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/subjects')
  return { data }
}

export async function updateTopic(topicId: string, updates: TopicUpdate) {
  const supabase = await createClient()

  const payload: Record<string, unknown> = {}
  if (typeof updates.name !== 'undefined') payload.name = updates.name
  if (typeof updates.description !== 'undefined') payload.description = updates.description
  if (typeof updates.mastery_level !== 'undefined') payload.mastery_level = updates.mastery_level

  const { data, error } = await supabase
    .from('topics')
    .update(payload)
    .eq('id', topicId)
    .select()
    .single()

  if (error) {
    console.error('Error updating topic:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/subjects')
  return { data }
}

export async function deleteTopic(topicId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('topics')
    .delete()
    .eq('id', topicId)

  if (error) {
    console.error('Error deleting topic:', error)
    return { error: error.message }
  }

  revalidatePath('/planner/subjects')
  return { success: true }
}

export async function getTopicsBySubject(userId: string, subjectId: string) {
  return getTopics(userId, subjectId)
}
