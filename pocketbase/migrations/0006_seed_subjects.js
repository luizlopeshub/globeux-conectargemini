migrate(
  (app) => {
    const subjectsCol = app.findCollectionByNameOrId('subjects')
    const subjects = [
      'Qualidade',
      'Segurança',
      'Manutenção',
      'Operações',
      'Logística',
      'Recursos Humanos',
    ]

    for (const name of subjects) {
      const record = new Record(subjectsCol)
      record.set('name', name)
      app.save(record)
    }
  },
  (app) => {
    try {
      app.db().newQuery('DELETE FROM subjects').execute()
    } catch (e) {
      console.error(e)
    }
  },
)
