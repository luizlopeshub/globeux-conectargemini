migrate(
  (app) => {
    const templates = app.findRecordsByFilter('templates', '1=1', '', 1000, 0)
    for (const tpl of templates) {
      let changed = false
      let fields = tpl.get('fields')

      if (typeof fields === 'string') {
        try {
          fields = JSON.parse(fields)
        } catch (e) {}
      }

      if (Array.isArray(fields)) {
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].logicRules && fields[i].logicRules.length > 0) {
            if (fields[i].alwaysVisible !== false) {
              fields[i].alwaysVisible = false
              changed = true
            }
          }
        }
      }

      if (changed) {
        tpl.set('fields', fields)
        app.save(tpl)
      }
    }
  },
  (app) => {},
)
