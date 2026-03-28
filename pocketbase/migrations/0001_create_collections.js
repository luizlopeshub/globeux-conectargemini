migrate(
  (app) => {
    const templates = new Collection({
      name: 'templates',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'blocks', type: 'json' },
        { name: 'fields', type: 'json' },
        { name: 'assignedUsers', type: 'json' },
        { name: 'assignedDepartments', type: 'json' },
        { name: 'exportOptions', type: 'json' },
        { name: 'approvalWorkflow', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(templates)

    const schedules = new Collection({
      name: 'schedules',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'recurrence', type: 'text', required: true },
        {
          name: 'template_id',
          type: 'relation',
          required: true,
          collectionId: templates.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'assigned_to',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(schedules)

    const tasks = new Collection({
      name: 'tasks',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'status', type: 'text', required: true },
        { name: 'due_date', type: 'date', required: true },
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(tasks)

    const actionPlans = new Collection({
      name: 'action_plans',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'field_id', type: 'text', required: true },
        {
          name: 'responsible_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'status', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(actionPlans)
  },
  (app) => {
    try {
      const actionPlans = app.findCollectionByNameOrId('action_plans')
      app.delete(actionPlans)
    } catch (_) {}

    try {
      const tasks = app.findCollectionByNameOrId('tasks')
      app.delete(tasks)
    } catch (_) {}

    try {
      const schedules = app.findCollectionByNameOrId('schedules')
      app.delete(schedules)
    } catch (_) {}

    try {
      const templates = app.findCollectionByNameOrId('templates')
      app.delete(templates)
    } catch (_) {}
  },
)
