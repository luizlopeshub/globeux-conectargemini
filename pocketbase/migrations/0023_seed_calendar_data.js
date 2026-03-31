migrate(
  (app) => {
    try {
      const admins = app.findRecordsByFilter('users', "role = 'admin'", '', 1, 0)
      if (!admins || admins.length === 0) return
      const admin = admins[0]

      const now = new Date()
      // Set to 14:00 tomorrow
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0, 0)
      // Set to 10:00 next week
      const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 10, 0, 0)

      // Format for PB DateField (ISO string)
      const tomorrowStr = tomorrow.toISOString().replace('T', ' ')
      const nextWeekStr = nextWeek.toISOString().replace('T', ' ')

      // Add a pending action plan
      const plans = app.findCollectionByNameOrId('action_plans')
      const p1 = new Record(plans)
      p1.set('field_id', 'demo-field-id')
      p1.set('responsible_id', admin.id)
      p1.set('status', 'open')
      p1.set('description', 'Revisar extintores no galpão principal')
      p1.set('due_date', tomorrowStr)
      app.save(p1)

      // Add a scheduled task
      const tasks = app.findCollectionByNameOrId('tasks')
      const t1 = new Record(tasks)
      t1.set('status', 'pending')
      t1.set('due_date', nextWeekStr)
      t1.set('user_id', admin.id)
      t1.set('title', 'Auditoria de Segurança Semanal')
      app.save(t1)
    } catch (e) {
      console.log('Seed calendar data skipped: ', e.message)
    }
  },
  (app) => {
    // Safe to leave empty for seeds, users can delete them from UI
  },
)
