export type CalendarEvent = {
  id: string
  title: string
  date: Date
  type: 'task' | 'action_plan'
  status: string
  original: any
}
