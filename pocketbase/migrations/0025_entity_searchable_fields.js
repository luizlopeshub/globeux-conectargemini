migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('entity_definitions')
    col.fields.add(new JSONField({ name: 'searchableFields' }))
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('entity_definitions')
    col.fields.removeByName('searchableFields')
    app.save(col)
  },
)
