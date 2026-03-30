import { FormBlock, FormField } from '@/types'
import { FieldRenderer } from '@/components/executor/FieldRenderer'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Eye, ShieldAlert, Search } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  blocks: FormBlock[]
  fields: FormField[]
  templateName: string
  description?: string
}

export function TemplatePreview({
  open,
  onOpenChange,
  blocks,
  fields,
  templateName,
  description,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const { entityDefs } = useAppStore()

  useEffect(() => {
    if (open) setAnswers({})
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-muted/10">
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b shrink-0 bg-card">
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> Preview
            </span>
            <span className="truncate">{templateName || 'Novo Checklist'}</span>
          </DialogTitle>
          {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
          <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded mt-3 border border-amber-100">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <p>
              Modo de visualização. As interações aqui não salvam dados nem validam campos
              obrigatórios.
            </p>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto space-y-8 pb-10">
            {blocks.map((b, idx) => (
              <div key={b.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-2">
                  <span className="bg-muted text-muted-foreground font-bold text-sm w-6 h-6 rounded flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{b.name}</h3>
                </div>
                <div className="space-y-5">
                  {fields
                    .filter((f) => f.blockId === b.id)
                    .map((f) => {
                      if (
                        f.type === 'lookup' &&
                        (!f.dataSourceType || f.dataSourceType === 'master_data')
                      ) {
                        const slug = f.settings?.entitySlug || f.lookupEntitySlug
                        const entityDef = entityDefs.find((e) => e.slug === slug)
                        const entityName = entityDef ? entityDef.name : slug || 'Qualquer'
                        const placeholder = `Buscar em ${entityName}...`

                        return (
                          <div key={f.id} className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                              {f.label} {f.required && <span className="text-destructive">*</span>}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder={placeholder}
                                value={answers[f.id] || ''}
                                onChange={(e) =>
                                  setAnswers((prev) => ({ ...prev, [f.id]: e.target.value }))
                                }
                              />
                              <div className="absolute right-3 top-2.5 text-muted-foreground">
                                <Search className="h-5 w-5" />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              (Modo de visualização - Pesquisa simulada de Dados Mestre)
                            </p>
                          </div>
                        )
                      }
                      return (
                        <FieldRenderer
                          key={f.id}
                          field={f}
                          value={answers[f.id]}
                          onChange={(val) => setAnswers((prev) => ({ ...prev, [f.id]: val }))}
                          allAnswers={answers}
                        />
                      )
                    })}
                  {fields.filter((f) => f.blockId === b.id).length === 0 && (
                    <div className="text-sm text-muted-foreground italic bg-card border border-dashed rounded-lg p-6 text-center shadow-sm">
                      Nenhum campo neste bloco.
                    </div>
                  )}
                </div>
              </div>
            ))}
            {blocks.length === 0 && (
              <div className="text-center p-12 text-muted-foreground bg-card border rounded-xl shadow-sm">
                <p>Nenhum bloco configurado neste checklist.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
