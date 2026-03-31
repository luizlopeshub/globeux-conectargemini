migrate(
  (app) => {
    const fixRelations = (col) => {
      const toReplace = []
      for (let i = 0; i < col.fields.length; i++) {
        const f = col.fields[i]
        if (f.type === 'relation') {
          try {
            app.findCollectionByNameOrId(f.collectionId)
          } catch (e) {
            toReplace.push(f.name)
          }
        }
      }

      for (const name of toReplace) {
        col.fields.removeByName(name)

        let targetColId = ''
        if (name === 'task_id') targetColId = app.findCollectionByNameOrId('tasks').id
        else if (name === 'user_id' || name === 'responsible_id')
          targetColId = app.findCollectionByNameOrId('_pb_users_auth_').id
        else if (name === 'field_id') targetColId = app.findCollectionByNameOrId('responses').id
        else if (name === 'template_id') targetColId = app.findCollectionByNameOrId('templates').id
        else targetColId = app.findCollectionByNameOrId('_pb_users_auth_').id

        col.fields.add(
          new RelationField({
            name: name,
            collectionId: targetColId,
            maxSelect: 1,
          }),
        )
      }
    }

    const responses = app.findCollectionByNameOrId('responses')
    fixRelations(responses)

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
    fixRelations(actionPlans)

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
