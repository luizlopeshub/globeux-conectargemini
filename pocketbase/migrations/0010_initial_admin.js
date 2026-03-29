migrate(
  (app) => {
    const usersCollection = app.findCollectionByNameOrId('users')
    try {
      app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
    } catch (_) {
      const record = new Record(usersCollection)
      record.set('name', 'Admin Master')
      record.setEmail('admin@logiaudit.com')
      record.setPassword('admin123456')
      record.setVerified(true)
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
      app.delete(record)
    } catch (_) {}
  },
)
