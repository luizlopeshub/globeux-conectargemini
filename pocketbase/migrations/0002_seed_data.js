migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let user
    try {
      user = app.findAuthRecordByEmail('_pb_users_auth_', 'luiz@globexmultimodal.com.br')
    } catch (_) {
      user = new Record(users)
      user.setEmail('luiz@globexmultimodal.com.br')
      user.setPassword('securepassword123')
      user.setVerified(true)
      user.set('name', 'Luiz')
      app.save(user)
    }

    const templates = app.findCollectionByNameOrId('templates')
    const template = new Record(templates)
    template.set('name', 'Template de Expedição')
    template.set('description', 'Verificação padrão de expedição')
    template.set('exportOptions', ['PDF', 'CSV'])
    template.set('approvalWorkflow', { enabled: true, sla_days: 2 })
    app.save(template)

    const schedules = app.findCollectionByNameOrId('schedules')
    const schedule = new Record(schedules)
    schedule.set('recurrence', 'weekly')
    schedule.set('template_id', template.id)
    schedule.set('assigned_to', user.id)
    app.save(schedule)

    const tasks = app.findCollectionByNameOrId('tasks')
    const task = new Record(tasks)
    task.set('status', 'pending')

    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7)
    task.set('due_date', dueDate.toISOString())
    task.set('user_id', user.id)
    task.set('title', 'Revisão Semanal de Relatórios')
    task.set('description', 'Realizar a revisão semanal dos relatórios de auditoria.')
    app.save(task)

    const actionPlans = app.findCollectionByNameOrId('action_plans')
    const actionPlan = new Record(actionPlans)
    actionPlan.set('field_id', 'f3')
    actionPlan.set('responsible_id', user.id)
    actionPlan.set('status', 'open')
    actionPlan.set('description', 'Ação preventiva para correção de não-conformidade')
    app.save(actionPlan)
  },
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'luiz@globexmultimodal.com.br')

      const tasks = app.findRecordsByFilter('tasks', `user_id = '${user.id}'`, '', 100, 0)
      tasks.forEach((t) => app.delete(t))

      const schedules = app.findRecordsByFilter(
        'schedules',
        `assigned_to = '${user.id}'`,
        '',
        100,
        0,
      )
      schedules.forEach((s) => app.delete(s))

      const aps = app.findRecordsByFilter(
        'action_plans',
        `responsible_id = '${user.id}'`,
        '',
        100,
        0,
      )
      aps.forEach((ap) => app.delete(ap))
    } catch (_) {}
  },
)
