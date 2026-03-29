migrate(
  (app) => {
    const departments = app.findCollectionByNameOrId('departments')
    const names = ['Recebimento', 'Expedição', 'Químicos', 'Qualidade']
    for (const name of names) {
      const record = new Record(departments)
      record.set('name', name)
      app.save(record)
    }
  },
  (app) => {
    try {
      const records = app.findRecordsByFilter('departments', "name != ''", '', 100, 0)
      for (const record of records) {
        app.delete(record)
      }
    } catch (_) {}
  },
)
