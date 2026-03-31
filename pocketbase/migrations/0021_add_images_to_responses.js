migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('responses')
    if (!col.fields.getByName('images')) {
      col.fields.add(
        new FileField({
          name: 'images',
          maxSelect: 100,
          maxSize: 10485760,
          mimeTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'],
        }),
      )
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('responses')
    if (col.fields.getByName('images')) {
      col.fields.removeByName('images')
      app.save(col)
    }
  },
)
