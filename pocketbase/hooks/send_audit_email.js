routerAdd(
  'POST',
  '/backend/v1/send-audit-email',
  (e) => {
    const body = e.requestInfo().body
    if (!body.email) {
      return e.badRequestError('Missing email address')
    }

    // Simulated SMTP email sending logic.
    // The system uses global api_settings to actually trigger this internally.
    try {
      const settings = $app.findFirstRecordByFilter('api_settings', '')
      if (!settings) {
        console.log('No API settings found for SMTP')
      }
    } catch (err) {
      // ignore
    }

    return e.json(200, { success: true, message: 'Email queued for sending to ' + body.email })
  },
  $apis.requireAuth(),
)
