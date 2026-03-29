migrate(
  (app) => {
    const collection = new Collection({
      name: 'api_settings',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'webhook_url', type: 'url', required: false },
        { name: 'smtp_host', type: 'text', required: false },
        { name: 'smtp_port', type: 'text', required: false },
        { name: 'smtp_user', type: 'text', required: false },
        { name: 'smtp_pass', type: 'text', required: false },
        { name: 'smtp_encryption', type: 'text', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('api_settings')
    app.delete(collection)
  },
)
