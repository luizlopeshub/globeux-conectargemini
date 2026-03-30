migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('templates')
    col.addIndex('idx_templates_unique_name', true, 'name', '')
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('templates')
    col.removeIndex('idx_templates_unique_name')
    app.save(col)
  },
)
