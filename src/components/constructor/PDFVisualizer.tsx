import { FormBlock, FormField, PdfSettings } from '@/types'

interface Props {
  templateName: string
  settings: PdfSettings
  blocks: FormBlock[]
  fields: FormField[]
}

export function PDFVisualizer({ templateName, settings, blocks, fields }: Props) {
  const color = settings.primary_color || '#000000'

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-2xl border border-gray-200 text-black p-8 box-border flex flex-col scale-[0.55] sm:scale-[0.65] md:scale-75 lg:scale-90 xl:scale-100 origin-top mb-12 transition-transform">
      {/* Header */}
      <div
        className="flex justify-between items-start border-b-2 pb-4 mb-6"
        style={{ borderColor: color }}
      >
        <div className="flex-1">
          {settings.logo_url && (
            <img src={settings.logo_url} alt="Logo" className="max-h-12 mb-3 object-contain" />
          )}
          <h1 className="text-2xl font-bold m-0" style={{ color }}>
            {templateName || 'Nome do Checklist'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">REF: EX-12345 | Data: 01/01/2026 14:00</p>
          <p className="text-xs text-gray-500">Auditor: Auditor de Exemplo</p>
        </div>
        <div className="text-right text-xs text-gray-600 max-w-[200px] whitespace-pre-wrap">
          {settings.header_text || 'Insira o texto do cabeçalho aqui'}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        {blocks.map((b) => {
          const bFields = fields.filter((f) => f.blockId === b.id)
          if (bFields.length === 0) return null

          return (
            <div key={b.id} className="mb-6">
              <div
                className="font-bold px-3 py-2 bg-gray-50 text-sm mb-3"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                {b.name}
              </div>
              <div className="space-y-3 px-2">
                {bFields.map((f) => (
                  <div
                    key={f.id}
                    className={`flex border-b border-dashed border-gray-200 pb-2 text-sm ${
                      settings.layout_mode === 'detailed'
                        ? 'flex-col gap-1'
                        : 'justify-between items-center'
                    }`}
                  >
                    <span
                      className={`font-semibold ${settings.layout_mode === 'detailed' ? 'w-full' : 'w-[40%]'}`}
                    >
                      {f.label}
                    </span>
                    <span
                      className={`text-gray-600 ${settings.layout_mode === 'detailed' ? 'w-full text-left' : 'w-[60%] text-right'}`}
                    >
                      {f.type === 'camera' && settings.show_photos !== false ? (
                        <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded ml-auto flex items-center justify-center text-[10px] text-gray-400">
                          Foto Simulada
                        </div>
                      ) : f.type === 'camera' ? (
                        <span className="italic text-gray-400">Foto omitida</span>
                      ) : (
                        'Valor Exemplo'
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        {blocks.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">
            Adicione blocos e campos no Editor para visualizar o conteúdo.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 mt-8 text-center text-xs text-gray-500 whitespace-pre-wrap">
        {settings.footer_text || 'Rodapé do Relatório - Exemplo LTDA'}
      </div>
    </div>
  )
}
