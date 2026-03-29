migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    try {
      let admin = null
      try {
        admin = app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
      } catch (_) {
        admin = new Record(users)
        admin.setEmail('admin@logiaudit.com')
        admin.setPassword('securepassword123')
        admin.setVerified(true)
        admin.set('name', 'System Admin')
      }
      admin.set('role', 'admin')
      app.save(admin)
    } catch (e) {
      console.log('Failed to seed admin@logiaudit.com', e)
    }

    try {
      const luiz = app.findAuthRecordByEmail('users', 'luiz@globexmultimodal.com.br')
      luiz.set('role', 'admin')
      app.save(luiz)
    } catch (_) {}

    try {
      const allUsers = app.findRecordsByFilter('users', "role = ''", '', 100, 0)
      for (const u of allUsers) {
        u.set('role', 'operator')
        app.saveNoValidate(u)
      }
    } catch (_) {}
  },
  (app) => {
    try {
      const admin = app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
      admin.set('role', '')
      app.saveNoValidate(admin)
    } catch (_) {}
  },
)
