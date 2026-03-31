migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('action_plans')
    if (!col.fields.getByName('due_date')) {
      col.fields.add(new DateField({ name: 'due_date', required: false }))
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('action_plans')
    const field = col.fields.getByName('due_date')
    if (field) {
      col.fields.removeById(field.id)
      app.save(col)
    }
  },
)
