import { Template, Subject } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState, useMemo } from 'react'
import { Search, FileText, Layers } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: Template[]
  subjects: Subject[]
  onSelect: (t: Template | 'new') => void
}

export function TemplateSearchDialog({ open, onOpenChange, templates, subjects, onSelect }: Props) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return templates
    return templates.filter((t) => {
      const subj = subjects.find((s) => s.id === t.subject)?.name || ''
      return t.name.toLowerCase().includes(q) || subj.toLowerCase().includes(q)
    })
  }, [templates, subjects, search])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-card">
        <DialogHeader className="p-4 border-b shrink-0 bg-muted/10">
          <DialogTitle>Abrir Checklist</DialogTitle>
        </DialogHeader>
        <div className="p-4 border-b shrink-0 bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do checklist ou assunto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10"
              autoFocus
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[50vh] p-3 bg-muted/5">
          <div
            className="p-3 hover:bg-background rounded-xl cursor-pointer flex items-center gap-4 transition-all mb-3 border hover:border-primary/30 hover:shadow-sm bg-transparent"
            onClick={() => onSelect('new')}
          >
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-primary">Novo Template Em Branco</div>
              <div className="text-xs text-muted-foreground">Comece um checklist do zero</div>
            </div>
          </div>

          <div className="space-y-1.5">
            {filtered.length > 0 ? (
              filtered.map((t) => {
                const subj = subjects.find((s) => s.id === t.subject)
                const d = t.updatedAt || t.createdAt || (t as any).updated || (t as any).created
                const dateStr = d ? new Date(d).toLocaleDateString('pt-BR') : ''

                return (
                  <div
                    key={t.id}
                    onClick={() => onSelect(t)}
                    className="p-3 hover:bg-background rounded-xl cursor-pointer flex items-center gap-4 transition-all border border-transparent hover:border-border hover:shadow-sm"
                  >
                    <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {subj?.name || 'Sem assunto'} {dateStr ? `• Atualizado em ${dateStr}` : ''}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center p-12 text-muted-foreground border border-dashed rounded-xl bg-background/50">
                <p>Nenhum checklist encontrado com a busca "{search}".</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
