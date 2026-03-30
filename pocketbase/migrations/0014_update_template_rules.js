migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('templates')
    col.createRule = "@request.auth.role = 'admin'"
    col.updateRule = "@request.auth.role = 'admin'"
    col.deleteRule = "@request.auth.role = 'admin'"
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('templates')
    col.createRule = "@request.auth.id != ''"
    col.updateRule = "@request.auth.id != ''"
    col.deleteRule = "@request.auth.id != ''"
    app.save(col)
  },
)
