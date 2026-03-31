import pb from '@/lib/pocketbase/client'
import type { Task, ActionPlan } from '@/types'

export async function fetchCalendarEvents(userId: string, role: string) {
  try {
    const isOperator = role !== 'admin' && role !== 'supervisor'

    // Admins and Supervisors can see all events. Operators see only their own.
    const taskFilter = isOperator ? `user_id = '${userId}'` : ''
    const planFilter = isOperator ? `responsible_id = '${userId}'` : ''

    const [tasks, plans] = await Promise.all([
      pb.collection('tasks').getFullList<Task>({ filter: taskFilter, requestKey: null }),
      pb
        .collection('action_plans')
        .getFullList<ActionPlan>({ filter: planFilter, requestKey: null }),
    ])

    return { tasks, plans }
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return { tasks: [], plans: [] }
  }
}
