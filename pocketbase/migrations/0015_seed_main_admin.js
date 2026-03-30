migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    let record
    try {
      record = app.findAuthRecordByEmail('_pb_users_auth_', 'luiz@globexmultimodal.com.br')
    } catch (_) {
      record = new Record(users)
    }
    record.setEmail('luiz@globexmultimodal.com.br')
    record.setPassword('securepassword123')
    record.setVerified(true)
    record.set('role', 'admin')
    record.set('name', 'Luiz (Admin)')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'luiz@globexmultimodal.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
