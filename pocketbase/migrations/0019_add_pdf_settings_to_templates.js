migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('templates')
    collection.fields.add(new JSONField({ name: 'pdf_settings' }))
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('templates')
    collection.fields.removeByName('pdf_settings')
    app.save(collection)
  },
)
