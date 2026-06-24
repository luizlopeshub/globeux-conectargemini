migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    if (!users.fields.getByName('active')) {
      users.fields.add(new BoolField({ name: 'active' }))
    }
    app.save(users)

    // Set default to true for existing users
    app.db().newQuery('UPDATE users SET active = 1').execute()
  },
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    if (users.fields.getByName('active')) {
      users.fields.removeByName('active')
      app.save(users)
    }
  },
)
