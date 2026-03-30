migrate(
  (app) => {
    const tasksCol = app.findCollectionByNameOrId('tasks')
    if (!tasksCol.fields.getByName('template_id')) {
      tasksCol.fields.add(
        new RelationField({
          name: 'template_id',
          collectionId: app.findCollectionByNameOrId('templates').id,
          maxSelect: 1,
          required: false,
        }),
      )
      app.save(tasksCol)
    }

    const schedulesCol = app.findCollectionByNameOrId('schedules')
    if (!schedulesCol.fields.getByName('time')) {
      schedulesCol.fields.add(
        new TextField({
          name: 'time',
          max: 10,
        }),
      )
      app.save(schedulesCol)
    }
  },
  (app) => {
    const tasksCol = app.findCollectionByNameOrId('tasks')
    tasksCol.fields.removeByName('template_id')
    app.save(tasksCol)

    const schedulesCol = app.findCollectionByNameOrId('schedules')
    schedulesCol.fields.removeByName('time')
    app.save(schedulesCol)
  },
)
