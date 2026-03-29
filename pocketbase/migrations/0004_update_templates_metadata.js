migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('templates')

    if (!collection.fields.getByName('subject')) {
      collection.fields.add(
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
          maxSelect: 1,
        }),
      )
    }

    if (!collection.fields.getByName('attachments')) {
      collection.fields.add(
        new FileField({
          name: 'attachments',
          maxSelect: 10,
          maxSize: 52428800,
          mimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
        }),
      )
    }

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('templates')
    collection.fields.removeByName('subject')
    collection.fields.removeByName('attachments')
    app.save(collection)
  },
)
