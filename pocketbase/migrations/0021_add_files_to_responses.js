migrate(
  (app) => {
    const responses = app.findCollectionByNameOrId('responses')
    if (!responses.fields.getByName('files')) {
      responses.fields.add(
        new FileField({
          name: 'files',
          maxSelect: 99,
          maxSize: 52428800,
          mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        }),
      )
    }
    app.save(responses)

    const actionPlans = app.findCollectionByNameOrId('action_plans')
    if (!actionPlans.fields.getByName('due_date')) {
      actionPlans.fields.add(new DateField({ name: 'due_date' }))
    }
    if (!actionPlans.fields.getByName('task_id')) {
      actionPlans.fields.add(
        new RelationField({
          name: 'task_id',
          collectionId: app.findCollectionByNameOrId('tasks').id,
          maxSelect: 1,
        }),
      )
    }
    app.save(actionPlans)
  },
  (app) => {
    const responses = app.findCollectionByNameOrId('responses')
    responses.fields.removeByName('files')
    app.save(responses)

    const actionPlans = app.findCollectionByNameOrId('action_plans')
    actionPlans.fields.removeByName('due_date')
    actionPlans.fields.removeByName('task_id')
    app.save(actionPlans)
  },
)
