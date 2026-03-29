migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')

    try {
      const existing = app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
      if (existing) return
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('admin@logiaudit.com')
    record.setPassword('admin123456')
    record.set('name', 'Admin LogiAudit')
    record.set('role', 'admin')
    record.setVerified(true)

    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('users', 'admin@logiaudit.com')
      app.delete(record)
    } catch (_) {}
  },
)
