migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    if (!users.fields.getByName('active')) {
      users.fields.add(
        new BoolField({
          name: 'active',
          required: false,
        }),
      )
    }

    // Admin-Only Management: Ensure only admins can perform deletion
    users.deleteRule = "@request.auth.role = 'admin'"

    app.save(users)

    // Set default true for existing records to prevent lockouts
    app.db().newQuery('UPDATE users SET active = 1').execute()
  },
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    if (users.fields.getByName('active')) {
      users.fields.removeByName('active')
    }

    // Restore original delete rule
    users.deleteRule = "id = @request.auth.id || @request.auth.role = 'admin'"

    app.save(users)
  },
)
