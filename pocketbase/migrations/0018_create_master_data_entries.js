migrate(
  (app) => {
    const collection = new Collection({
      name: 'master_data_entries',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'entity_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('entity_definitions').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'data', type: 'json', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX `idx_master_data_entries_entity` ON `master_data_entries` (`entity_id`)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('master_data_entries')
    app.delete(collection)
  },
)
