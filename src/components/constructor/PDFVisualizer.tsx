import { useState } from 'react'
import { FormBlock, FormField, PdfSettings } from '@/types'

interface Props {
  templateName: string
  settings: PdfSettings
  blocks: FormBlock[]
  fields: FormField[]
  onReorderBlocks?: (sourceId: string, targetId: string) => void
  onReorderFields?: (
    sourceId: string,
    targetId: string,
    targetType: 'field' | 'block_content',
  ) => void
}

export function PDFVisualizer({
  templateName,
  settings,
  blocks,
  fields,
  onReorderBlocks,
  onReorderFields,
}: Props) {
  const color = settings.primary_color || '#000000'

  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'block' | 'field' } | null>(
    null,
  )
  const [dragOverItem, setDragOverItem] = useState<{
    id: string
    type: 'block' | 'field' | 'block_content'
  } | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string, type: 'block' | 'field') => {
    e.stopPropagation()
    e.dataTransfer.setData('text/plain', `${type}:${id}`)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedItem({ id, type })
  }

  const handleDragOver = (
    e: React.DragEvent,
    id: string,
    type: 'block' | 'field' | 'block_content',
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (!draggedItem) return
    if (draggedItem.type === 'block' && type !== 'block') return
    if (draggedItem.type === 'field' && type === 'block') return
    if (draggedItem.id === id && type !== 'block_content') return

    setDragOverItem((prev) => {
      if (prev?.id === id && prev?.type === type) return prev
      return { id, type }
    })
  }

  const handleDrop = (
    e: React.DragEvent,
    targetId: string,
    type: 'block' | 'field' | 'block_content',
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverItem(null)
    setDraggedItem(null)

    const data = e.dataTransfer.getData('text/plain')
    if (!data) return

    const [sourceType, sourceId] = data.split(':')
    if (sourceType === 'block' && type === 'block' && onReorderBlocks) {
      onReorderBlocks(sourceId, targetId)
    } else if (
      sourceType === 'field' &&
      (type === 'field' || type === 'block_content') &&
      onReorderFields
    ) {
      onReorderFields(sourceId, targetId, type)
    }
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

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
            <div
              key={b.id}
              className={`mb-6 transition-all ${draggedItem?.id === b.id ? 'opacity-40' : ''} ${
                dragOverItem?.id === b.id && dragOverItem?.type === 'block'
                  ? 'border-t-4 border-dashed pt-2'
                  : ''
              }`}
              style={{
                borderTopColor:
                  dragOverItem?.id === b.id && dragOverItem?.type === 'block'
                    ? color
                    : 'transparent',
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, b.id, 'block')}
              onDragOver={(e) => handleDragOver(e, b.id, 'block')}
              onDrop={(e) => handleDrop(e, b.id, 'block')}
              onDragEnd={handleDragEnd}
            >
              <div
                className="font-bold px-3 py-2 bg-gray-50 text-sm mb-3 flex justify-between items-center group cursor-move"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <span>{b.name}</span>
                <span className="text-gray-400 opacity-0 group-hover:opacity-100 text-[10px] font-normal tracking-wider">
                  ARRASTAR
                </span>
              </div>
              <div
                className={`space-y-3 px-2 min-h-[20px] transition-colors rounded ${
                  dragOverItem?.id === b.id && dragOverItem?.type === 'block_content'
                    ? 'bg-gray-50 border-2 border-dashed border-gray-300 p-2'
                    : ''
                }`}
                onDragOver={(e) => handleDragOver(e, b.id, 'block_content')}
                onDrop={(e) => handleDrop(e, b.id, 'block_content')}
              >
                {bFields.map((f) => (
                  <div
                    key={f.id}
                    className={`flex border-b border-dashed border-gray-200 pb-2 text-sm cursor-move group transition-all ${
                      settings.layout_mode === 'detailed'
                        ? 'flex-col gap-1'
                        : 'justify-between items-center'
                    } ${draggedItem?.id === f.id ? 'opacity-40' : ''} ${
                      dragOverItem?.id === f.id && dragOverItem?.type === 'field'
                        ? 'border-t-2 border-t-gray-400 pt-2'
                        : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, f.id, 'field')}
                    onDragOver={(e) => handleDragOver(e, f.id, 'field')}
                    onDrop={(e) => handleDrop(e, f.id, 'field')}
                    onDragEnd={handleDragEnd}
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
