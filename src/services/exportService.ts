import { Audit, Template } from '@/types'
import { getGlobalState } from '@/stores/useAppStore'

export const resolveLookup = (val: any) => {
  if (typeof val === 'string' && val.length > 0) {
    const state = getGlobalState()
    const record = state.entityRecords.find((r) => r.id === val)
    if (record) {
      const def = state.entityDefs.find((d) => d.id === record.entityId)
      return record[def?.fields[0]?.id || 'id'] || record.id
    }
  }
  return String(val)
}

export const generateAuditHTML = (audit: Audit, template: Template) => {
  const settings = template.pdf_settings || {}
  const color = settings.primary_color || '#000000'
  const logo = settings.logo_url || ''
  const header = settings.header_text || ''
  const footer = settings.footer_text || ''

  const photos: { label: string; url: string }[] = []

  const blocksContent = template.blocks
    .map((b) => {
      const bFields = template.fields.filter((f) => f.blockId === b.id)
      if (!bFields.some((f) => audit.answers[f.id] !== undefined)) return ''

      return `
      <div style="margin-bottom: 20px;">
        <div style="background: #f8f9fa; padding: 8px 12px; border-left: 4px solid ${color}; font-weight: bold; margin-bottom: 10px; font-size: 14px;">
          ${b.name}
        </div>
        ${bFields
          .map((f) => {
            const val = audit.answers[f.id]
            if (val === undefined || val === 'signed') return ''
            let displayVal = resolveLookup(val)
            const isImg = typeof val === 'string' && val.startsWith('http')

            if (isImg) {
              if (settings.show_photos !== false) {
                photos.push({ label: f.label, url: val })
                displayVal = `<span style="color: #666; font-style: italic;">Ver anexo fotográfico ao final do documento</span>`
              } else {
                displayVal = '<span style="color: #888; font-style: italic;">Foto omitida</span>'
              }
            }

            return `
            <div style="display: flex; flex-direction: ${settings.layout_mode === 'detailed' ? 'column' : 'row'}; justify-content: ${settings.layout_mode === 'detailed' ? 'flex-start' : 'space-between'}; padding: 8px 0; border-bottom: 1px dashed #eee; font-size: 13px;">
              <div style="font-weight: bold; width: ${settings.layout_mode === 'detailed' ? '100%' : '40%'}; margin-bottom: ${settings.layout_mode === 'detailed' ? '4px' : '0'};">${f.label}</div>
              <div style="width: ${settings.layout_mode === 'detailed' ? '100%' : '60%'}; text-align: ${settings.layout_mode === 'detailed' ? 'left' : 'right'}; word-break: break-word;">${displayVal}</div>
            </div>
          `
          })
          .join('')}
      </div>
    `
    })
    .join('')

  const photosSection =
    photos.length > 0
      ? `
    <div style="margin-top: 40px; page-break-before: always;">
      <h2 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 8px; font-size: 18px; text-transform: uppercase; letter-spacing: 0.5px;">Evidências Fotográficas</h2>
      <div style="display: flex; flex-wrap: wrap; margin: -10px; margin-top: 20px;">
        ${photos
          .map(
            (p) => `
          <div style="width: 50%; box-sizing: border-box; padding: 10px; break-inside: avoid;">
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #fff;">
              <div style="padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: bold; color: #334155;">
                ${p.label}
              </div>
              <div style="padding: 10px; text-align: center; background: #f1f5f9; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <img src="${p.url}" style="max-width: 100%; max-height: 260px; object-fit: contain; border-radius: 4px;" />
              </div>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `
      : ''

  return `
    <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-bottom: 20px;">
        <div>
          ${logo ? `<img src="${logo}" alt="Logo" style="max-height: 50px; margin-bottom: 10px;" />` : ''}
          <h1 style="color: ${color}; margin: 0 0 5px 0; font-size: 24px;">${template.name}</h1>
          <p style="margin: 0; font-size: 12px; color: #666;">REF: ${audit.id}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">Data: ${new Date(audit.timestamp).toLocaleString()}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">Auditor: ${audit.operatorName}</p>
        </div>
        <div style="text-align: right; max-width: 250px; font-size: 12px; color: #555; white-space: pre-wrap;">
          ${header}
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        ${blocksContent}
      </div>

      ${photosSection}

      <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 11px; text-align: center; color: #777; white-space: pre-wrap;">
        ${footer}
      </div>
    </div>
  `
}

export const printHTML = (htmls: string[]) => {
  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.width = '0px'
  iframe.style.height = '0px'
  iframe.style.border = 'none'
  document.body.appendChild(iframe)

  const doc = iframe.contentWindow?.document
  if (doc) {
    doc.open()
    doc.write(`
      <html>
        <head>
          <title>Export PDF</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .page-break { page-break-after: always; }
            }
          </style>
        </head>
        <body>
          ${htmls.join('<div class="page-break"></div>')}
        </body>
      </html>
    `)
    doc.close()
    iframe.contentWindow?.focus()
    setTimeout(() => {
      iframe.contentWindow?.print()
      setTimeout(() => document.body.removeChild(iframe), 1000)
    }, 500)
  }
}

export const generatePDF = (audits: Audit[], templates: Template[]) => {
  const htmls = audits.map((a) => {
    const t = templates.find((t) => t.id === a.templateId)
    if (!t) return ''
    return generateAuditHTML(a, t)
  })
  printHTML(htmls.filter(Boolean))
}

export const generateCSV = (audits: Audit[], templates: Template[]) => {
  if (audits.length === 0) return

  const allFields = new Map<string, string>()
  templates.forEach((t) => {
    t.fields.forEach((f) => {
      if (!allFields.has(f.id)) allFields.set(f.id, f.label)
    })
  })

  const fieldKeys = Array.from(allFields.keys())
  const header = [
    '"ID"',
    '"Data"',
    '"Auditor"',
    '"Checklist"',
    '"Status"',
    ...fieldKeys.map((k) => `"${String(allFields.get(k)).replace(/"/g, '""')}"`),
  ]

  const rows = audits.map((a) => {
    const row = [
      `"${a.id}"`,
      `"${new Date(a.timestamp).toLocaleString()}"`,
      `"${String(a.operatorName).replace(/"/g, '""')}"`,
      `"${String(a.templateName).replace(/"/g, '""')}"`,
      `"${a.status}"`,
    ]
    fieldKeys.forEach((fk) => {
      const val = a.answers[fk]
      if (val === undefined || val === 'signed') {
        row.push('""')
      } else {
        const resolved = resolveLookup(val)
        row.push('"' + String(resolved).replace(/"/g, '""') + '"')
      }
    })
    return row
  })

  const csvContent = [header.join(','), ...rows.map((r) => r.join(','))].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `export_auditorias_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
