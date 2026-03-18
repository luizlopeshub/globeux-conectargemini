import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import useAppStore from '@/stores/useAppStore'
import { EntityRecord } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { generateId } from '@/lib/utils'

export default function DynamicEntityCrud() {
  const { slug } = useParams()
  const { entityDefs, entityRecords, saveEntityRecord, deleteEntityRecord } = useAppStore()

  const def = useMemo(() => entityDefs.find((d) => d.slug === slug), [entityDefs, slug])
  const records = useMemo(
    () => entityRecords.filter((r) => r.entityId === def?.id),
    [entityRecords, def],
  )

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Partial<EntityRecord>>({})

  if (!def)
    return <div className="p-8 text-center text-muted-foreground">Entidade não encontrada.</div>

  const handleSave = () => {
    const isNew = !form.id
    const record: EntityRecord = {
      id: isNew ? `rec_${generateId().substring(0, 8)}` : form.id!,
      entityId: def.id,
      ...form,
    }
    saveEntityRecord(record)
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">{def.name}</h1>
          <p className="text-muted-foreground">Gerenciamento dinâmico de registros.</p>
        </div>
        <Button
          onClick={() => {
            setForm({})
            setOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Registro
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {def.fields.map((f) => (
                <TableHead key={f.id}>{f.name}</TableHead>
              ))}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.id}>
                {def.fields.map((f) => (
                  <TableCell key={f.id}>{row[f.id] || '-'}</TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setForm(row)
                      setOpen(true)
                    }}
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteEntityRecord(row.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {records.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={def.fields.length + 1}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {form.id ? 'Editar' : 'Novo'} {def.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            {def.fields.map((f) => (
              <div key={f.id} className="space-y-2">
                <Label>{f.name}</Label>
                <Input
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                  value={form[f.id] || ''}
                  onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
