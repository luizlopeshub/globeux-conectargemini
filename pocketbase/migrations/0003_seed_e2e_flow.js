migrate(
  (app) => {
    // 1. Create Responses Collection if it doesn't exist
    if (!app.hasTable('responses')) {
      const responsesCollection = new Collection({
        name: 'responses',
        type: 'base',
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
        fields: [
          {
            name: 'task_id',
            type: 'relation',
            required: true,
            collectionId: app.findCollectionByNameOrId('tasks').id,
            cascadeDelete: true,
            maxSelect: 1,
          },
          {
            name: 'user_id',
            type: 'relation',
            required: true,
            collectionId: '_pb_users_auth_',
            cascadeDelete: true,
            maxSelect: 1,
          },
          { name: 'status', type: 'text', required: true },
          { name: 'data', type: 'json', required: false },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(responsesCollection)
    }

    // 2. Seed Users
    const usersCol = app.findCollectionByNameOrId('users')

    let carlos
    try {
      carlos = app.findAuthRecordByEmail('users', 'carlos@globexmultimodal.com.br')
    } catch (_) {
      carlos = new Record(usersCol)
      carlos.setEmail('carlos@globexmultimodal.com.br')
      carlos.setPassword('securepassword123')
      carlos.setVerified(true)
      carlos.set('name', 'Carlos (Operador)')
      app.save(carlos)
    }

    let beatriz
    try {
      beatriz = app.findAuthRecordByEmail('users', 'beatriz@globexmultimodal.com.br')
    } catch (_) {
      beatriz = new Record(usersCol)
      beatriz.setEmail('beatriz@globexmultimodal.com.br')
      beatriz.setPassword('securepassword123')
      beatriz.setVerified(true)
      beatriz.set('name', 'Beatriz (Supervisora)')
      app.save(beatriz)
    }

    // 3. Seed Templates
    const templatesCol = app.findCollectionByNameOrId('templates')

    const template1 = new Record(templatesCol)
    template1.set('name', 'Inspeção Diária de Empilhadeira')
    template1.set('description', 'Checklist diário de segurança da empilhadeira.')
    template1.set('fields', [])
    app.save(template1)

    const template2 = new Record(templatesCol)
    template2.set('name', 'Recebimento de Carga Química')
    template2.set('description', 'Checklist para recebimento seguro de produtos químicos.')
    template2.set('fields', [
      {
        id: 'temp_carga',
        name: 'Temperatura da Carga',
        type: 'number',
        triggers: {
          condition: 'outside_range',
          min: 15,
          max: 25,
          actions: [
            { type: 'require_photo' },
            { type: 'create_action_plan', assignTo: beatriz.id },
          ],
        },
      },
    ])
    template2.set('exportOptions', ['PDF', 'CSV'])
    template2.set('approvalWorkflow', { active: true, slaDays: 2 })
    app.save(template2)

    // 4. Seed Schedules
    const schedulesCol = app.findCollectionByNameOrId('schedules')
    const schedule = new Record(schedulesCol)
    schedule.set('recurrence', 'daily')
    schedule.set('template_id', template1.id)
    schedule.set('assigned_to', carlos.id)
    app.save(schedule)

    // 5. Seed Tasks
    const tasksCol = app.findCollectionByNameOrId('tasks')
    const todayStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + '.000Z'

    const task1 = new Record(tasksCol)
    task1.set('title', 'Inspeção Diária de Empilhadeira')
    task1.set('status', 'Pending')
    task1.set('user_id', carlos.id)
    task1.set('due_date', todayStr)
    task1.set('description', 'Tarefa gerada via agendamento diário.')
    app.save(task1)

    const task2 = new Record(tasksCol)
    task2.set('title', 'Recebimento de Carga Química - NF 1234')
    task2.set('status', 'Pending')
    task2.set('user_id', carlos.id)
    task2.set('due_date', todayStr)
    task2.set('description', 'Inspeção de recebimento para a NF 1234.')
    app.save(task2)

    // 6. Seed Responses (Draft)
    const responsesCol = app.findCollectionByNameOrId('responses')
    const draftResponse = new Record(responsesCol)
    draftResponse.set('task_id', task2.id)
    draftResponse.set('user_id', carlos.id)
    draftResponse.set('status', 'Rascunho')
    draftResponse.set('data', {
      'Bloco 1 (Cadastro)': {
        completed: true,
        data: { motorista: 'João Silva', placa: 'ABC-1234' },
      },
      'Bloco 2': null,
    })
    app.save(draftResponse)

    // 7. Seed Action Plans
    const actionPlansCol = app.findCollectionByNameOrId('action_plans')
    const actionPlan = new Record(actionPlansCol)
    actionPlan.set('field_id', 'lampada_corredor_b')
    actionPlan.set('description', 'Lâmpada Queimada no Corredor B. Origem: Checklist de Manutenção')
    actionPlan.set('status', 'Aberto')
    actionPlan.set('responsible_id', beatriz.id)
    app.save(actionPlan)
  },
  (app) => {
    // Revert changes

    // Delete action plans
    try {
      const actionPlans = app.findRecordsByFilter('action_plans', "field_id = 'lampada_corredor_b'")
      actionPlans.forEach((r) => app.delete(r))
    } catch (_) {}

    // Delete responses collection completely
    try {
      const responsesCol = app.findCollectionByNameOrId('responses')
      app.delete(responsesCol)
    } catch (_) {}

    // Delete tasks
    try {
      const tasks = app.findRecordsByFilter(
        'tasks',
        "title = 'Inspeção Diária de Empilhadeira' || title = 'Recebimento de Carga Química - NF 1234'",
      )
      tasks.forEach((r) => app.delete(r))
    } catch (_) {}

    // Delete schedules
    try {
      const schedules = app.findRecordsByFilter('schedules', "recurrence = 'daily'")
      schedules.forEach((r) => app.delete(r))
    } catch (_) {}

    // Delete templates
    try {
      const templates = app.findRecordsByFilter(
        'templates',
        "name = 'Inspeção Diária de Empilhadeira' || name = 'Recebimento de Carga Química'",
      )
      templates.forEach((r) => app.delete(r))
    } catch (_) {}

    // Delete users
    try {
      const carlos = app.findAuthRecordByEmail('users', 'carlos@globexmultimodal.com.br')
      app.delete(carlos)
    } catch (_) {}

    try {
      const beatriz = app.findAuthRecordByEmail('users', 'beatriz@globexmultimodal.com.br')
      app.delete(beatriz)
    } catch (_) {}
  },
)
