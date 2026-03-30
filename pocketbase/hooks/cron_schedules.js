cronAdd('generate_scheduled_tasks', '0 0 * * *', () => {
  const schedules = $app.findRecordsByFilter('schedules', '1=1', '-created', 1000, 0)

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0] + ' 00:00:00.000Z'

  schedules.forEach((schedule) => {
    const templateId = schedule.get('template_id')
    const userId = schedule.get('assigned_to')
    const time = schedule.get('time') || '08:00'

    try {
      const existing = $app.findFirstRecordByFilter(
        'tasks',
        'template_id = {:tid} && user_id = {:uid} && due_date >= {:today}',
        { tid: templateId, uid: userId, today: todayStr },
      )
      if (existing) return
    } catch (_) {
      // not found, proceed
    }

    let templateName = 'Checklist'
    try {
      const template = $app.findRecordById('templates', templateId)
      templateName = template.get('name')
    } catch (_) {}

    const dueDateTime = today.toISOString().split('T')[0] + ' ' + time + ':00.000Z'

    const taskCol = $app.findCollectionByNameOrId('tasks')
    const newTask = new Record(taskCol)
    newTask.set('status', 'pending')
    newTask.set('due_date', dueDateTime)
    newTask.set('user_id', userId)
    newTask.set('template_id', templateId)
    newTask.set('title', `Auditoria Agendada: ${templateName}`)
    newTask.set(
      'description',
      `Tarefa gerada automaticamente pelo agendamento ${schedule.get('recurrence')}`,
    )

    $app.save(newTask)
  })
})
