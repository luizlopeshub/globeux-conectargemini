migrate(
  (app) => {
    const subjectsCol = new Collection({
      name: 'subjects',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(subjectsCol)

    const templatesCol = app.findCollectionByNameOrId('templates')

    if (templatesCol.fields.getByName('subject')) {
      templatesCol.fields.removeByName('subject')
    }

    templatesCol.fields.add(
      new RelationField({
        name: 'subject',
        collectionId: subjectsCol.id,
        maxSelect: 1,
        required: true,
        cascadeDelete: false,
      }),
    )

    templatesCol.addIndex('idx_templates_subject', false, 'subject', '')
    app.save(templatesCol)
  },
  (app) => {
    const templatesCol = app.findCollectionByNameOrId('templates')
    templatesCol.removeIndex('idx_templates_subject')

    if (templatesCol.fields.getByName('subject')) {
      templatesCol.fields.removeByName('subject')
    }

    templatesCol.fields.add(
      new SelectField({
        name: 'subject',
        values: [
          'Qualidade',
          'Segurança',
          'Manutenção',
          'Operações',
          'Logística',
          'Recursos Humanos',
        ],
      }),
    )
    app.save(templatesCol)

    const subjectsCol = app.findCollectionByNameOrId('subjects')
    app.delete(subjectsCol)
  },
)
